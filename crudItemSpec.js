//crud items
var frisby = require('frisby');

frisby.globalSetup({
	request: {
		headers: {
			'Authorization': 'Basic amltZW5hLnRlcmNlcm9zLnRlc3RAZ21haWwuY29tOkNvbnRyb2wxMjM='
		}
		//proxy: 'http://172.20.240.5:8080',
		//json: true
	}
});

console.log("THIS TEST IS TO VERIFY CRUD OF PROYECT, HAVING ACCOUNT THAT THERE IS NOT ANY ITEM");

var itemCounter = 0;
var totalItems = 5;
for(var i = 0; i < totalItems; i++){
	var now = new Date();
	var item = {
		"Content": "Item YYY " + i + '- '+ now.getTime(),
		"Priority": 2
	};
	frisby.create()
		.post('https://todo.ly/api/items.json', item, {json: true})
		.inspectJSON()
		.expectJSON(item)
		.afterJSON(function(responseData){
			itemCounter++;
			console.log("Created projects " + itemCounter);
			if(itemCounter == totalItems){
				frisby.create()
					.get('https://todo.ly/api/items.json')
					.expectStatus(200)
					.afterJSON(function(responseData1){
						console.log("Retrieved " + responseData1.length + " items");
						for(var i = 0; i < responseData1.length; i++){
							var updatedItem = 0;
							totalItems = responseData1.length;
							if(responseData1[i].Priority === 2){
								console.log("Updated project with id: " + responseData1[i].Id);
								frisby.create('Update Item')
									.put('https://todo.ly/api/items/' + responseData1[i].Id + '.json', {'Priority': 1}, {json: true})
									.expectStatus(200)
									.inspectJSON()
									.expectJSONTypes({
										Id : Number,
										Priority : 1
									})
									.afterJSON(function(responseData2){
										updatedItem++;
										if(updatedItem == totalItems){
											console.log("Deleting items");
											var totalDeleted = 0;
											for(var i = 0; i < responseData1.length; i++){
												console.log("Delete item with id: " + responseData1[i].Id);
												frisby.create('Delete items')
													.delete('https://todo.ly/api/items/' + responseData1[i].Id + '.json')
													.expectStatus(200)
													.inspectJSON()
													.expectJSON({
														Deleted: true
													})
													.afterJSON(function(data){
														if(data.Deleted === true){
															totalDeleted++;
														}
														if(totalDeleted === totalItems){
															console.log('the items created were deleted');
														}

													})
												.toss();
											}
										}
									})
								.toss();
						   	 }
					    }
					})
				.toss();
			}
		})
	.toss();
}
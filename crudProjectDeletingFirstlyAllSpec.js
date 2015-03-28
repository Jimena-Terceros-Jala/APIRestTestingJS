//crud project
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

console.log("THIS TEST IS TO VERIFY CRUD OF PROYECT, FIRSTLY DELETEING ALL PROJECTS");

var projectCounter = 0;
var totalProjects = 5;

var now = new Date();
var project = {
	"Content": "Project YYY - " + now.getTime()
};
frisby.create('Create project')
	.post('https://todo.ly/api/projects.json', project, {json: true})
	.inspectJSON()
	.expectJSON(project)
	.afterJSON(function(responseData){
		frisby.create('Get All projects')
			.get('https://todo.ly/api/projects.json')
			.expectStatus(200)
			.afterJSON(function(responseData){
				totalProjects = responseData.length;
				var totalDeleted = 0;
				for(var i = 0; i < responseData.length; i++){
					frisby.create('Delete all projects')
						.delete('https://todo.ly/api/projects/' + responseData[i].Id + '.json')
						.expectStatus(200)
						.expectJSON({
							Deleted: true
						})
						.afterJSON(function(data){
							totalDeleted++;
							if(totalDeleted == totalProjects){
								totalProjects = 5;
								console.log("Creating " + totalProjects + " projects.");
								for (var i = 0; i < totalProjects; i++) {
									var now = new Date();
									var project = {
										"Content": "Project YYY " + i + '- '+ now.getTime(), 
										"Icon": 4
									};
									frisby.create('Create project')
										.post('https://todo.ly/api/projects.json', project, {json: true})
										.inspectJSON()
										.expectJSON(project)
										.afterJSON(function(responseData){
											projectCounter++;
											console.log("Created project " + projectCounter);
											if(projectCounter == totalProjects){
												console.log("Get projects");
												frisby.create('Get All projects')
													.get('https://todo.ly/api/projects.json')
													.expectStatus(200)
													.afterJSON(function(responseData1){
														console.log("Retrieved " + responseData1.length + "projects");
														for(var i = 0; i < responseData1.length; i++){
															var updatedCounter = 0;
															totalProjects = responseData1.length;
															if(responseData1[i].Icon === 4){
																console.log("Updated project with id: " + responseData1[i].Id);
																frisby.create('Update icon of project')
																	.put('https://todo.ly/api/projects/' + responseData1[i].Id + '.json', {'Icon': 5}, {json: true})
																	.expectStatus(200)
																	.inspectJSON()
																	.expectJSONTypes({
																		Id: Number,
																		Icon: 5
																	})
																	.afterJSON(function(responseData2){
																		updatedCounter++;
																		if(updatedCounter == totalProjects){
																			console.log("Delete projects");
																			totalDeleted = 0;
																			for(var i = 0; i < responseData1.length; i++){
																				console.log("Delete project with id: " + responseData1[i].Id);
																				frisby.create('Delete all projects')
																					.delete('https://todo.ly/api/projects/' + responseData1[i].Id + '.json')
																					.expectStatus(200)
																					.expectJSON({
																						Deleted: true
																					})
																					.afterJSON(function(data){
																						if(data.Deleted === true){
																							totalDeleted++;
																						}
																						if(totalDeleted === totalProjects){
																							console.log('The projects created were deleted');
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
							}
						})
					.toss();
				}
			})
		.toss();
	})
.toss();

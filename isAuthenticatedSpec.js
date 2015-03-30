//Is authenticated
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

frisby.create('Get authenticated')
	.get('https://todo.ly/api/authentication/isauthenticated.json')
	.expectStatus(200)
	.inspectJSON()
	.afterJSON(function(responseData){
		expect(responseData).toBeTruthy();
	})
	.toss();
//Is authenticated without authentication
var frisby = require('frisby');


frisby.create('Get authenticated')
	.get('https://todo.ly/api/authentication/isauthenticated.json')
	.expectStatus(200)
	.inspectJSON()
	.afterJSON(function(responseData){
		expect(responseData).toBeFalsy();
	})
	.toss();
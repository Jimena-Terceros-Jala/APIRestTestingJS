//Get Token without authentication
var frisby = require('frisby');

frisby.create('Get Token')
	.get('https://todo.ly/api/authentication/token.json')
	.expectStatus(200)
	.inspectJSON()
	.expectJSON({
		"ErrorMessage": "Not Authenticated",
		"ErrorCode":102
	})
	.expectJSONTypes({
		ErrorMessage : String,
		ErrorCode: Number
	})
	.toss();
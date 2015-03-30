//Get Token
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

frisby.create('Get Token')
	.get('https://todo.ly/api/authentication/token.json')
	.expectStatus(200)
	.inspectJSON()
	.afterJSON(function(responseData){
		expect(responseData.TokenString).toBeDefined();
		expect(responseData.UserEmail).toEqual("jimena.terceros.test@gmail.com");
	})
	.toss();
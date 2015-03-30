//Get Icons
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

var urlArray = [
	"http://todo.ly/Images/icons/page2.png",
	"http://todo.ly/Images/icons/Home.png",
	"http://todo.ly/Images/icons/other.png",
	"http://todo.ly/Images/icons/alert.png",
	"http://todo.ly/Images/icons/ball.png",
	"http://todo.ly/Images/icons/bug.png",
	"http://todo.ly/Images/icons/favorite.png",
	"http://todo.ly/Images/icons/film.png",
	"http://todo.ly/Images/icons/life.png",
	"http://todo.ly/Images/icons/mail.png",
	"http://todo.ly/Images/icons/note.png",
	"http://todo.ly/Images/icons/television.png",
	"http://todo.ly/Images/icons/twitter.png",
	"http://todo.ly/Images/icons/warning.png",
	"http://todo.ly/Images/icons/cart2.png"
];

for(var i = 0; i <= 14; i++ ){	
	var counter = 0;	

	console.log(urlArray[i]);

	frisby.create('Get Icons')
		.get('https://todo.ly/api/icons/' + i + '.json')
		.expectStatus(200)
		.inspectJSON()
		.afterJSON(function(responseData){
			expect(responseData.Id).toEqual(counter);
			expect(responseData.URL).toEqual(urlArray[counter]);
			counter++;
		})
		.toss();
}
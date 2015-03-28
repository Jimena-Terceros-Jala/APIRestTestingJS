
var frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic anVhbi5tYW1hbmkudGVzdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
    }
  }
});


//display all items from Inbox
var allProyect= []
frisby.create('Get all non-deleted projects with Authen') //get all proyects no devuelve los borrados 
  .get('https://todo.ly/api/items.json')
  .inspectJSON()
  .expectJSON('*', {
    Deleted: false //get all project not deleted
  })
  .afterJSON(function(responseData){
    for (var i=0; i< responseData.length; i++) {
      if (responseData[i].DateString == null) {
        console.log("name: " + responseData[i].Content)
      };
    }
 })
.toss();
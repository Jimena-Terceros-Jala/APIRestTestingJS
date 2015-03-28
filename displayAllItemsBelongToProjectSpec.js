
var frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic anVhbi5tYW1hbmkudGVzdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
    }
  }
});

//display all items belong to project
var allProyect= []
frisby.create('Get all non-deleted items with Authen') //get all items
  .get('https://todo.ly/api/items.json')
  .inspectJSON()
  .expectJSON('*', {
    Deleted: false //get all items not deleted
  })
  .afterJSON(function(responseData){
    for (var i=0; i< responseData.length; i++) {
      if (responseData[i].ProjectId != null) {
        console.log("name: " + responseData[i].ProjectId);
      }
    }
 })
.toss();
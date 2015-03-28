
var frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic anVhbi5tYW1hbmkudGVzdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
    }
  }
});


var allProyect= []
frisby.create('Get all non-deleted items with Authen') //get all items
  .get('https://todo.ly/api/items.json')
  .inspectJSON()
  .expectJSON('*', {
    Deleted: false //get all items not deleted
  })
  .afterJSON(function(responseData){
    for (var i=0; i< responseData.length; i++) {
      var todayName = responseData[i].DateString;
      if (todayName != null) {
        if (todayName.indexOf("day") > -1){
          console.log("name: " + responseData[i].DateString)
        }
      }
    }
 })
.toss();
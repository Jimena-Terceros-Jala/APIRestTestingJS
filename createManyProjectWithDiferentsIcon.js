// Todo.ly specs
var frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {
      'Authorization': 'Basic anVhbi5tYW1hbmkudGVzdEBnbWFpbC5jb206Q29udHJvbDEyMw=='
    },
    json: true
  }
});

// Create some project with diferents icon
for (var i = 0; i < 24; i++) {
  var now = new Date();
  var project = {
    "Content": "Project" + i,
    "Icon": i
  };
  frisby.create('Create project')
    .post('https://todo.ly/api/projects.json', project)
    .inspectJSON()
    .expectJSON(project)
  .toss();
}
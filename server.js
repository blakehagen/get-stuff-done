var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

var User = require('./models/users')

// EXPRESS //
var app = express();
app.use(cors());
app.use(bodyParser());

// CONTROLLERS //
var MainCtrl = require('./controllers/mainCtrl');
var UserCtrl = require('./controllers/userCtrl');

// MONGOOSE //
var mongoUri = 'mongodb://bmh:bmh@ds057244.mongolab.com:57244/get-stuff-done-app';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connection to mongoDB successful')
});

// TASK ENDPOINTS //
// Create New
app.post('/api/tasks', MainCtrl.createTask);
// Get All Tasks
app.get('/api/tasks', MainCtrl.getTasks);
// Get 1 Task
app.get('/api/tasks/:id', MainCtrl.getTask);
// Update Task
app.put('/api/tasks/:id', MainCtrl.updateTask);
// Delete Task
app.delete('/api/tasks/:id', MainCtrl.deleteTask);

// USER ENDPOINTS //

app.post('/api/users', UserCtrl.createUser);
app.get('/api/users', UserCtrl.getUsers);









// LINK TO FRONT END //
app.use(express.static(__dirname + '/public'));

// PORT //
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listenting on port ' + port);
});


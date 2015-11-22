var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// EXPRESS //
var app = express();
app.use(cors());
app.use(bodyParser());

// CONTROLLERS //
var MainCtrl = require('./controllers/mainCtrl')

// MONGOOSE //
var mongoUri = 'mongodb://localhost:27017/getStuffDone';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connection to mongoDB successful')
});

// ENDPOINTS //
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

// LINK TO FRONT END //
app.use(express.static(__dirname + '/public'));

// PORT //
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listenting on port ' + port);
});


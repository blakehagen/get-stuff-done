var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');
var passport = require('passport');
require('./server/config/passport.google')(passport);

var User = require('./server/features/users/user.server.model')

// EXPRESS //
var app = express();
app.use(cors());
app.use(bodyParser.json());

// CONTROLLERS //
var TaskCtrl = require('./server/features/tasks/tasks.server.controller');
var UserCtrl = require('./server/features/users/user.server.controller');

// MONGOOSE //
var mongoUri = 'mongodb://bmh:bmh@ds057244.mongolab.com:57244/get-stuff-done-app';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connection to mongoDB successful')
});

// INITIALIZE PASSPORT //
app.use(passport.initialize());
app.use(passport.session());

// AUTH ROUTING //
require('./server/features/auth/googleAuth.server.routes')(app, passport);

// TASK ENDPOINTS //
// Create New
app.post('/api/tasks', TaskCtrl.createTask);
// Update Task
app.put('/api/tasks/:id', TaskCtrl.updateTask);
// Delete Task
app.delete('/api/tasks/:id', TaskCtrl.deleteTask);

// USER ENDPOINTS //
app.post('/api/users', UserCtrl.createUser);
app.get('/api/user/:id', UserCtrl.getUser);


// LINK TO FRONT END //
app.use(express.static(__dirname + '/public'));

// PORT //
var port = process.env.PORT || 80;

app.listen(port, function () {
    console.log('Listenting on port ' + port);
});
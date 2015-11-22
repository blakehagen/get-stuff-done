var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// EXPRESS
var app = express();
app.use(cors());
app.use(bodyParser());

// CONTROLLERS


// MONGOOSE
var mongoUri = 'mongodb://localhost:27017/getStuffDone';
mongoose.connect(mongoUri);
mongoose.connection.once('open', function () {
    console.log('Connection to mongoDB successful')
});



// ENDPOINTS



// LINK TO FRONT
app.use(express.static(__dirname + '/public'));

// PORT
var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Listenting on port ' + port);
});


var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = require('../tasks/tasks.server.model')

var UserSchema = new Schema({
    name: { type: String, required: true },
    googleId: { type: String, required: true },
    img: { type: String, required: true },
    email: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
});

module.exports = mongoose.model('User', UserSchema);
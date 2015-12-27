var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = require('../tasks/tasks.server.model')


var UserSchema = new Schema({
    user: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = mongoose.model('User', UserSchema);
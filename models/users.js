var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TaskSchema = require('../models/tasks')


var UserSchema = new Schema({
    user: { type: String, required: true },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task'}]
})

module.exports = mongoose.model('User', UserSchema);
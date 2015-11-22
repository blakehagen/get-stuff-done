var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: String },
    createdAt: { type: String, default: moment().format('ddd, MMM D YYYY, h:mma') },
    due_in_hours: { type: Number }
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
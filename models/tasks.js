var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: String, default: moment().format('ddd, MMM D YYYY, h:mma') },
    // due_in_hours: { type: Number },
    status: {type: String, default: "new"}
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskSchema = new Schema({
    name: String,
    createdAt: {type: Date, default: Date.now},
    due_in_hours: {type: Number}
});

var Task = mongoose.model('Task', taskSchema);

module.exports = Task;
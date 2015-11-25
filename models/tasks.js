var moment = require('moment');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TaskSchema = new Schema({
    name: { type: String, required: true },
    createdAt: { type: String, default: moment().format('ddd, MMM D YYYY, h:mma') },
    status: { type: String, default: "new" }

});

module.exports = mongoose.model('Task', TaskSchema);
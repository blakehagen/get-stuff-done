var Task = require('../models/tasks');

module.exports = {
    
    // CREATE
    createTask: function (req, res, next) {
        var newTask = new Task(req.body);
        newTask.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send(result);
        })
    },
    
    // READ
    getTasks: function (req, res, next) {
        Task.find({}, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send(result);
        })
    }





}
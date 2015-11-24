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
    // READ (GET ALL TASKS)
    getTasks: function (req, res, next) {
        Task.find({}, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send(result);
        })
    },
    // READ (GET 1 TASK)
    getTask: function (req, res, next) {
        Task.findById(req.params.id, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send(result);
        })
    },
    // UPDATE
    updateTask: function (req, res, next) {
        Task.findByIdAndUpdate(req.params.id, req.body, function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send('updated');
        })
    },
    // DELETE
    deleteTask: function (req, res, next) {
        Task.findByIdAndRemove(req.params.id, function (err, result) {
            if (err) return res.status('NO BUENO' + 500).send(err);
            else res.status(200).send(result);
        })
    }
}
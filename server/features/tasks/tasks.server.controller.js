var Task = require('./tasks.server.model');
var User = require('../users/user.server.model');

module.exports = {
    
    // CREATE
    createTask: function (req, res, next) {
        var task = new Task(req.body);
        console.log('userId? ', req.body.user)
        task.save(function (err, task) {
            if(err){
                res.status(500);
            };
            User.findByIdAndUpdate(req.body.user, { $push: {
                tasks: task._id }}, function(err, result){
                    if(err){
                        res.status(500);
                    } else {
                        console.log('user ', result);
                    }
                })
        })
        res.status(200).json(task);
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
var Task = require('./tasks.server.model');
var User = require('../users/user.server.model');

module.exports = {
    
    // CREATE
    createTask: function (req, res, next) {
        var task = new Task(req.body);
        task.save(function (err, task) {
            if(err){
                res.status(500);
            };
            User.findByIdAndUpdate(req.body.userId, { $push: {
                tasks: task._id }}, function(err, result){
                    if(err){
                        console.log('err ', err);
                        res.status(500);
                    } 
                    else { 
                        // console.log('user ', result);
                    }
                })
        })
        res.status(200).json(task);
    },
    
    // UPDATE
    updateTask: function (req, res, next) {
        Task.findByIdAndUpdate(req.params.id, req.body, {new: true}, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            else res.status(200).json(result);
        })
    },
    
    // DELETE
    deleteTask: function (req, res, next) {
        Task.findByIdAndRemove(req.params.id, function (err, result) {
            if (err) {
                res.status('NO BUENO' + 500).send(err);
            }
            User.findByIdAndUpdate(result.userId, {
                $pull: { tasks : req.params.id}
            }, function(err, result){
                if(err){
                    res.status(500).send(err);
                } else {
                    // console.log('result ', result);
                }
            })
             res.status(200).json(result);
        })
    }
    
    
    
    
    
};
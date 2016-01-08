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
    
    // DELETE SINGLE TASK //
    deleteTask: function (req, res, next) {
        Task.findByIdAndRemove(req.params.id, function (err, result) {
            if (err) {
                res.status(500).send(err);
            }
            User.findByIdAndUpdate(result.userId, {$pull: { tasks : req.params.id}}, function(err, result){
                if(err){
                    res.status(500).send(err);
                } else {
                    // console.log('result ', result);
                }
            })
             res.status(200).send('Task Deleted');
        })
    },
    
        // DELETE ALL COMPLETED TASKS //
        // deleteCompletedTasks: function(req, res, next){
        //     var completedTasks;
        //     Task.where('status').equals('completed').exec(function(err, tasks){
        //         if(err){
        //             res.status(500)
        //         }
        //         for (var i = 0; i < tasks.length; i++) {
        //             tasks[i].remove();
        //         }
        //         completedTasks = tasks;
        //     })
        //     User.findById(req.params.id).populate('tasks').exec(function(err, user){
        //         if(err){
        //             res.status(500);
        //         }
        //         for (var i = 0; i < user.tasks.length; i++) {
        //             for (var j = 0; j < completedTasks.length; j++) {
        //                 if(user.tasks[i].status === completedTasks[j].status){
        //                     delete user.tasks[i];
        //                 }
        //             }
        //         }
        //         user.save(function(err, result){
        //             if(err){
        //                 res.status(500)
        //             }
        //         })
        //         // console.log(user.tasks);
        //         res.status(200).json(user);
        //     })
        // }
        
    
    
    
    
    
};
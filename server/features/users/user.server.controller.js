var User = require('./user.server.model');
var Task = require('../tasks/tasks.server.controller');

module.exports = {

    createUser: function (req, res, next) {
        var user = new User(req.body);
        user.save(function (err, result) {
            if (err) return res.status(500).send(err);
            else res.status(200).send(result);
        })
    },

    getUser: function (req, res, next) {
        User.findById(req.params.id).populate('tasks').exec(function (err, user) {
            if (err) return res.status(500).send(err);
            else res.status(200).json(user);
        })
    }






}
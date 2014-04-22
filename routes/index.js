var mongoose = require('mongoose');
var socketio = require('socket.io');
var Message = require('../models/message');
var Group = require('../models/group');

module.exports = function(app, server) {

    app.get('/', function(req, res) {
        
        Group.find({}, function(err, groups) {
            res.render('index.html', {
                title: 'Wildfire',
                groups: groups
            });
        });
    });

    app.get('/new', function(req, res) {
        
    });

    app.get('/:id', function(req, res) {
        var group_id = req.param('id');

        Group.find({}, function(err, groups) {
            Message.find({'group': group_id}, function(err, messages) {
                res.render('group.html', {
                    title: 'Wildfire',
                    groups: groups,
                    messages: messages,
                    id: group_id
                });
            });
        });
    });
}

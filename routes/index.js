var mongoose = require('mongoose');
var socketio = require('socket.io');
var Message = require('../models/message');
var Group = require('../models/group');

module.exports = function(app, server) {

    app.get('/', function(req, res) {
        res.render('index.html', {
            title: 'Wildfire',
            groups: Group.find({})
        });
    });

    app.get('/new', function(req, res) {
        
    });

    app.get('/:id', function(req, res) {
        var group_id = req.param('id');

        var groups = Group.find({});
        var messages = Message.find({'group': group_id});
        
        res.render('group.html', {
            title: 'Wildfire',
            groups: groups,
            messages: messages,
            id: group_id
        });
    });
}

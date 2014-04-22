var mongoose = require('mongoose');
var socketio = require('socket.io');
var Message = require('../models/message');
var Group = require('../models/group');

module.exports = function(app, server) {

    var io = socketio.listen(server);
    var sockets = [];

    io.sockets.on('connection', function(socket) {
        sockets.push(socket);

        // Message.find(function(err, messages) {
        //     messages.forEach(function(message) {
        //       socket.emit('message', message);
        //     });
        // });

        socket.on('message', function(messasge) {
            console.log(messasge.msg);
            var msg = new Message({'group': messasge.group, 'msg': messasge.msg});
            msg.save(function(err) {
                if (err) {
                    console.error(err);
                    return;
                }
            });

            // sockets.forEach(function(socket) {
            //     socket.emit('message', msg);
            // });
        });

        socket.on('disconnect', function() {
            sockets.splice(sockets.indexOf(socket), 1);
        });
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
}

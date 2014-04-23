var mongoose = require('mongoose');
var socketio = require('socket.io');
var Message = require('../models/message');
var Group = require('../models/group');

module.exports = function(app, server) {

    var io = socketio.listen(server);
    var sockets = [];

    io.sockets.on('connection', function(socket) {
        sockets.push(socket);

        //
        // UNCOMMENT TO ADD OLD MESSAGES
        //
        // Message.find(function(err, messages) {
        //     messages.forEach(function(message) {
        //       socket.emit('message', message);
        //     });
        // });

        socket.on('message', function(message) {
            var msg = new Message({'group': message.group, 'msg': message.msg});
            msg.save(function(err) {
                if (err) {
                    console.log(err);
                    return;
                }
            });

            sockets.forEach(function(socket) {
                socket.emit('message', msg);
            });
        });

        socket.on('group', function(group) {
            var grp = new Group({'title': group.title});
            grp.save(function(err) {
                if (err) {
                    console.log(err);
                }
                sockets.forEach(function(socket) {
                    socket.emit('group', grp);
                });
            });
        });

        socket.on('disconnect', function() {
            sockets.splice(sockets.indexOf(socket), 1);
        });
    });

    app.get('/test/:id', function(req, res) {
        Group.findById(req.param('id'), function(err, group) {
            console.log(group.title);
        })
    });

    app.get('/:id', function(req, res) {
        Group.find({}, function(err, groups) {
            Group.findById(req.param('id'), function(err, group) {
                Message.find({'group': req.param('id')}, function(err, messages) {
                    res.render('group.html', {
                        title: 'Wildfire',
                        groups: groups,
                        messages: messages,
                        group: group
                    });
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
}

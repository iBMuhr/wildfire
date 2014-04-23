var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    msg: String,
    group: String,
    time: String
});

module.exports = mongoose.model('Message', messageSchema);
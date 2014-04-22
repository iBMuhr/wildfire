var mongoose = require('mongoose');

var messageSchema = mongoose.Schema({
    msg: String,
    group: Number,
    time: String
});

module.exports = mongoose.model('Message', messageSchema);
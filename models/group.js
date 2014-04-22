var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    num: Number,
    title: String,
    radius: Number
});

module.exports = mongoose.model('Group', groupSchema);
var mongoose = require('mongoose');

var groupSchema = mongoose.Schema({
    title: String,
    radius: Number
});

module.exports = mongoose.model('Group', groupSchema);
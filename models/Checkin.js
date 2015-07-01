var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkinSchema = new Schema({
	userID: { type: Number, required: true },
	location: { type: Number, required: true }
});

var Checkin = mongoose.model('Checkin', checkinSchema);

exports.Checkin = Checkin;


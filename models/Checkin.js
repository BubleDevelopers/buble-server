var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkinSchema = new Schema({
	userId: { type: Number, required: true },
	location: { 
		lat: { type: Number, required: true },
		long: { type: Number, required: true },
		placeId: { type: String, required: true }
	}
});

var Checkin = mongoose.model('Checkin', checkinSchema);

exports.Checkin = Checkin;


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkinSchema = new Schema({
	userId: { type: Schema.ObjectId, required: true },
	location: { 
		lat: { type: Number, required: true },
		long: { type: Number, required: true },
		placeId: { type: String, required: true }
	},
	entered: { type: Date, required: true, default: Date.now() },
	exited: { type: Date, required: false }
});

var Checkin = mongoose.model('Checkin', checkinSchema);

exports.Checkin = Checkin;


var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var checkinSchema = new Schema({
	userID: { type: Number, required: true },
	location: { 
		lat: { type: Number, required: true },
    		long: { type: Number, required: true },
       		place: { type: String, required: true }
	}
});

var Checkin = mongoose.model('Checkin', checkinSchema);

exports.Checkin = Checkin;


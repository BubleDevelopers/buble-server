var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var checkinSchema = new Schema({
<<<<<<< HEAD
	userId: { type: Number, required: true },
	location: { type: Number, required: true }
=======
	userId: { type: Schema.ObjectId, required: true },
	location: { 
		lat: { type: Number, required: true },
		long: { type: Number, required: true },
		placeId: { type: String, required: true }
	},
	entered: { type: Date, required: true, default: Date.now() },
	exited: { type: Date, required: false }
>>>>>>> 704603b6fcb0b578561818357c9838c6e3dba4ca
});
*/

var checkinSchema = new Schema({
	userId: { type: Number, required: true },
	location: { type: String, required: true }
});


var Checkin = mongoose.model('Checkin', checkinSchema);

exports.Checkin = Checkin;


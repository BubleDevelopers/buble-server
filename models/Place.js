var mongoose = 	require('mongoose');
var schema   = 	mongoose.Schema;

var locationSchema = new Schema ({
	var placeId: 	{ type: String, required: true  },
	var total3h: 	{ type: Number, required: false },
	var sum3h: 		{ type: Number, required: false },
	var total24h: 	{ type: Number, required: false },
	var sum24h: 	{ type: Number, required: false }
});

var Location = mongoose.model('Location', locationSchema);

exports.Location = Location;

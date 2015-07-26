var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var wallPostSchema = new Schema({
	content: {type: String, required: false},
	rating: {type: Number, required: true},
	location: {
		lat: {type: Number, required: true},
		long: {type: Number, required: true},
		placeId: {type: String, required: true}
	},
	timeOfPost: {type: Date, required: false, default: Date.now()}
});

var WallPost = mongoose.model('WallPost', wallPostSchema);

exports.WallPost = WallPost;

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	firstName: {type: String, required: false},
	lastName: {type: String, required: false},
	email: {type: String, required: false},
	pictureUrl: {type: String, required: false},
	facebookId: {type: String, required: true},
	googleId: {type: String, required: false},
	twitterId: {type: String, required: false},
	signupDate: {type: Date, required: false, default: Date.now()},
	invisible: {type: Boolean, required: false, default: false},
	accessToken: {type: String, required: false}
});

var User = mongoose.model('User', userSchema);

exports.User = User;

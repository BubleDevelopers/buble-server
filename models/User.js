var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	first_name: 	{ type: String, required: false },
    last_name: 		{ type: String, required: false },
    email: 			{ type: String, required: false },
    pictureURL: 	{ type: String, required: false },
	facebookId: 	{ type: String, required: true },
 	googleId: 		{ type: String, required: false },
	twitterId: 		{ type: String, required: false },
	signupDate: 	{ type: Date, required: false, default: Date.now() },
    invisible: 		{ type: Boolean, required: false, default: false }
});

var User = mongoose.model('User', userSchema);

exports.User = User;

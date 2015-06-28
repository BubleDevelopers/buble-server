var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	facebookId: { type: String, required: true },
        googleId: { type: String, required: false },
	twitterId: { type: String, required: false },
	signupDate: { type: String, required: true, default: Date.now },
        invisible: { type: Boolean, required: false, default: false }
});

var User = mongoose.model('User', userSchema);

exports.User = User;

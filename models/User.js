var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/*
var userSchema = new Schema({
	name: { type: Number, required: true },
});
*/

var userSchema = new Schema({
	facebookId: { type: String, required: true },
        googleId: { type: String },
	twitterId: { type: String },
	signupDate: { type: String, default: Date.now },
        invisible: { type: Boolean, default: false }
});


var User = mongoose.model('User', userSchema);

exports.User = User;


//module.exports = mongoose.model('User', userSchema);

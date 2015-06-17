var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  email: String,
  fullname: String,
  age: Number,
  location: String,
  gender: String
});

var User = mongoose.model('User', userSchema);

exports.User = User;

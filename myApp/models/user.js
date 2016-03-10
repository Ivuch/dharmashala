var mongoose = require('mongoose')
var Schema = mongoose.Schema

var userSchema = new Schema({
	name : String,
	lastName: String,
	nickname: String,
	email: {type: String, required: true, unique: true},
	password: {type: String, required: true},
	age: Number,
	gender: String,
	created_at: Date,
	last_activity_at: Date
})

var User = mongoose.model('User', userSchema)

module.exports = User
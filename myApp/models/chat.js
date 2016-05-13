var mongoose = require('mongoose')
var Schema = mongoose.Schema


var chatSchema = new Schema({
	chat : [
		{
			message : String,
			status : Number,
			sent : Date,
			readed : Date
		}
	]
})

var Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
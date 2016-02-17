var express = require("express")
var app = express()
var fs = require("fs")
console.log(__dirname)
app.use(express.static("/css"))

app.get('/', function(req, res){
	res.sendFile("/home/snoop/Desktop/The HTML Bible/dharmashala/FBchat.html")
})

app.get('/text', function(req, res){
	fs.readFile("../json/FBchat.json", function(err, json){
		if(err){
			return console.error(err)
		}
		console.log(json.toString())
		res.send(json.toString())
	})
})

var server = app.listen(8081, function(){

	var host = server.address().address
	var port = server.address().port

	console.log("host: "+host+" , port: "+port)
})
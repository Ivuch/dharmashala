var express = require("express")
var app = express()
var fs = require("fs")
var bodyParser = require('body-parser');
 
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))


/**  ROUTER INIT   **/

app.get('/', function(req, res){
	res.sendFile(__dirname+"/login.html")
})

app.post('/login', function(req, res){
	console.log(req.body)
	if(req.body.user == "ivuch" && req.body.password == "ok"){
		console.log("I'm in")
		res.sendFile(__dirname+"/FBchat.html")
	}else{
		console.log("not in")
		res.sendFile(__dirname+"/login.html")
	}
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

app.post('/text', function(req, res){
 console.log(req.body)
 console.log("che "+req.body.text)
 res.send(req.body)
})

/**  ROUTER END   **/

var server = app.listen(8082, function(){

	var host = server.address().address
	var port = server.address().port

	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})
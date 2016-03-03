var express = require("express")
var app = express()
var fs = require("fs")
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose');
 
mongoose.connect('mongodb://127.0.0.1/myApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});
 
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))
app.use(session({
  secret:'S3KR3T',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


/**  ROUTER INIT   **/

app.get('/', function(req, res){
	res.sendFile(__dirname+"/login.html")
})

app.post('/login', function(req, res){
	console.log(req.body)
	fs.readFile("../json/FBchat.json", function(err, rs){
		if(err){
			return console.error(err)
		}
		console.log(rs.toString())
		var json = JSON.parse(rs)
		var user = json.user.name
		var userID = json.user.id
		if(req.body.user == user && req.body.password == "ok"){
			console.log(req.session.id)
			req.session.userID = userID
			res.sendFile(__dirname+"/FBchat.html")
		}else{
			console.log("not in")
			res.json({isERROR : true})
		}
	})
})

app.get('/text', function(req, res){
	fs.readFile("../json/FBchat.json", function(err, rs){
		if(err){
			return console.error(err)
		}
		console.log(rs.toString())
		res.send(rs.toString())
	})
})

app.post('/text', function(req, res){
 console.log(req.body)
 console.log("you are user number: "+req.session.id)
 console.log("and your userID is: "+req.session.userID)
 res.send(req.body)
})

/**  ROUTER END   **/

var server = app.listen(8082, function(){

	var host = server.address().address
	var port = server.address().port

	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})
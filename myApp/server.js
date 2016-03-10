var express = require("express")
var app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var fs = require("fs")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var session = require('express-session')
var mongoose = require('mongoose')

/* Mongoose DB*/
mongoose.connect('mongodb://127.0.0.1/myApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});
/* /Mongoose DB*/

var User = require(__dirname+'/models/user')



/* Socket.io*/
io.on('connection', function(socket){
  console.log('a user connected');

	socket.on('chat message', function(msg){
		 io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
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
	User.find({ name: req.body.user }, function(err, user) {
		if (err) throw err;
		console.log(user);
		if(req.body.user == user[0].name && req.body.password == user[0].password){
			console.log("login status: OK - "+req.session.id)
			req.session.userID = user[0]._id
			console.log("_id: "+req.session.userID)
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
		console.log("JSON levantado correctamente")
		res.send(rs.toString())
	})
})

app.post('/text', function(req, res){
 console.log(req.body)
 console.log("you are user number: "+req.session.id)
 console.log("and your userID is: "+req.session.userID)
 res.send(req.body)
})

app.get('/session', function(req, res){
	User.find({ _id: req.session.userID }, function(err, user) {
		if (err) {
			console.log("i don't know")
			res.json({isERROR : true})
		}
		console.log(user);
		res.send(user)
	})
})

//Creates a new User
app.post('/user', function(req, res){
	console.log(req.body)
	var user = new User({
	name : req.body.name,
	lastName: req.body.lastName,
	nickname: req.body.nickname,
	email: req.body.email,
	password: req.body.password,
	age: 23,
	gender: req.body.gender,
	created_at: new Date(),
	last_activity_at: new Date()
	})

	user.save(function(err){
		if(err) throw err

		console.log("User saved successfully!")
	})
	//Esto debiera mapearse a /users GET (get all users)
	User.find({}, function(err, users) {
	  if (err) throw err;

	  // object of all the users
	  console.log(users);
	})
	res.sendFile(__dirname+"/login.html")
})
/**  ROUTER END   **/

var server = http.listen(8080, function(){

	var host = server.address().address
	var port = server.address().port

	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})
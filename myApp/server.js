var express = require("express")
var app = express()
var http = require('http').Server(app)
var https = require('https')
var io = require('socket.io')(http)
var fs = require("fs")
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')//<---- Necesito realmente esto?
var session = require('express-session')
var mongoose = require('mongoose')

/** GLOBAL VARIABLES**/
var options = {
	key: fs.readFileSync('keys/key.pem'),
  	cert: fs.readFileSync('keys/cert.pem')
}
var sessionMiddleware = session({
  secret:'S3KR3T',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
});
/** GLOBAL VARIABLES**/

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))
app.use(sessionMiddleware);

/********************* Mongoose ***********************/
mongoose.connect('mongodb://127.0.0.1/myApp');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("we're connected!")
});
/********************* Mongoose ***********************/

/********************* Schemas ***********************/
var Chat = require(__dirname+'/models/chat')
var User = require(__dirname+'/models/user')
/********************* Schemas ***********************/


/********************* Socket.io ***********************/
io.use(function(socket, next) {
    sessionMiddleware(socket.request, socket.request.res, next)
})

io.on('connection', function(socket){
  console.log('a user connected');
  var cookie_string = socket.request.headers.cookie;
  console.log(cookie_string)
  var session = socket.request.session
  console.log(io.sockets.sockets+"holaa")
  /*var connect_sid = parsed_cookies['connect.sid'];
  if (connect_sid) {
    session_store.get(connect_sid, function (error, session) {
      console.log("msg emited by: "+session.userID)
	  console.log("session number: "+session.id)
	})
  }*/
  socket.on('chat message', function(msg){
  	  console.log("Usuario que emite el msg: "+session.userID)
	  console.log("msg: "+msg)
	  io.emit('chat message', msg);
  });
  
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
/********************* Socket.io ***********************/


/********************* ROUTER ***********************/

app.get('/', function(req, res){
	if(!req.session.userID){
		res.sendFile(__dirname+"/login.html")
	}else{
		res.sendFile(__dirname+"/FBchat.html")
	}
})

app.post('/login', function(req, res){
	console.log(req.body)
	User.find({ name: req.body.user }, function(err, user) {
		if (err){
			console.log(err)
			console.log("not in")
			res.json({isERROR : true})
		} 
		console.log(user)
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
/*
{https://www.youtube.com/watch?v=3-xJki_OVYg}}
*/

app.get('/text', function(req, res){
	fs.readFile("../json/FBchat.json", function(err, rs){
		if(err){
			return console.error(err)
		}
		console.log("JSON levantado correctamente")
		res.send(rs.toString())
	})
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

app.get('/endSession', function(req, res){
	req.session.destroy()
	res.redirect('/')
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
	age: 23,//<-------------------------Ver tema de la fecha/edad
	gender: req.body.gender,
	})

	user.save(function(err){
		if(err) console.log(err)

		console.log("User saved successfully!")
	})
	res.sendFile(__dirname+"/login.html")
})

app.get('/users', function(req, res){
	User.find({}, function(err, users) {
	  if (err) throw err;
	  console.log("Obteniendo todos los usuarios desde: /users");
	  res.json(users)
	})
})
/********************* ROUTER ***********************/


var server = http.listen(8080, function(){
	
	var port = server.address().port
	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})

var s = https.createServer(options, app).listen(4143, function(){
	console.log("Secure conction Established - HTTPS - SSL")
})
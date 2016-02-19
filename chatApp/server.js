var express = require("express")
var app = express()
var fs = require("fs")
var bodyParser = require('body-parser');
 
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))

console.log(__dirname)

app.get('/', function(req, res){
	res.sendFile(__dirname+"/FBchat.html")
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

/* DO we need this ? 

app.use(express.urlencoded());
app.use(express.json());
 
app.post('/user/login', function(req, res) {
  console.log('name: ' + req.param('name'));
});

*/

var server = app.listen(8081, function(){

	var host = server.address().address
	var port = server.address().port

	console.log("host: "+host+" , port: "+port)
})
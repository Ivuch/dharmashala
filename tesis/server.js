var express = require("express")
var app = express()
var http = require('http').Server(app)
var fs = require("fs")
var bodyParser = require('body-parser')

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(express.static(__dirname+"/public"))

app.get('/', function(req, res){
	res.sendFile(__dirname+'/tesis.html')
})


app.get('/dictionary', function(req, res){
	fs.readFile("dictionary.json", function(err, rs){
		if(err){
			return console.error(err)
		}
		console.log("Diccionario.JSON levantado correctamente: "+rs)
		res.send(rs)
	})
})

app.post('/dictionary', function(req,res){
	var datos
	var rs = fs.readFileSync("dictionary.json")
	console.log("RS: "+rs)
	datos  = JSON.parse(rs)
	var last = datos.dictionary.length
	console.log("f-end: "+req.body.word)
	var word = {"word" : req.body.word}
	datos.dictionary.push(word)
	datos = JSON.stringify(datos)
	console.log("data: "+datos)
	fs.writeFile("dictionary.json", datos,'utf8')
	res.send()
})


var server = http.listen(8080, function(){
	
	var port = server.address().port
	console.log("Server Running in http://127.0.0.1:"+port)
	console.log("Base dir: "+__dirname)
})
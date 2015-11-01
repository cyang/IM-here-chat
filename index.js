// Use express framework
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


var messagesArray = [];

io.on('connection', function(socket){
	// io.emit('A user has connected');



	socket.on('disconnect', function(){
		io.emit('A user has disconnected');
	});


	socket.on('chat message', function(msg){
		messagesArray.push(msg);
    	io.emit('chat message', msg);
  	});

	socket.on('user connected', function(msg){
    	io.emit('user connected', msg, messagesArray);
		console.log(messagesArray);
  	});

});

http.listen(3000, function(){
	console.log("Listening on port: 3000");
});

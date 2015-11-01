// Use express framework
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('disconnect', function(){
		io.emit('A user has disconnected');
	});

//	console.log("A user has connected.")
//	socket.on('disconnect', function(){
//    	console.log('A user disconnected.');
//  	});

	socket.on('chat message', function(msg){
    	io.emit('chat message', msg);
  	});

});

http.listen(3000, function(){
	console.log("Listening on port: 3000");
});

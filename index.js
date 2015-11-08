// Use express framework
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});


var messagesArray = [];
var usernames = {};

io.on('connection', function(socket){

	socket.on('disconnect', function(){
		if(usernames[socket.id] != null)
			io.emit('user disconnected', usernames[socket.id]);
	});


	socket.on('chat message', function(msg){
		messagesArray.push(usernames[socket.id]+ ": " + msg);
    	io.emit('chat message', msg, usernames[socket.id]);
  	});

	socket.on('user connected', function(msg){
		usernames[socket.id] = msg;
    	io.emit('user connected', msg, messagesArray);
  	});

});

http.listen(process.env.PORT || 3000, function(){
  console.log('listening on', http.address().port);
});

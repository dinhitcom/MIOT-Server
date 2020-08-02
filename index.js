const PORT = 3000;	
require('dotenv').config();								
const express = require('express');
const http = require('http'); 			
const path = require('path');				
const socketio = require('socket.io');				
const ip = require('ip');
let distance = null;
const app = express();
const server = http.createServer(app);					
const io = socketio(server);
let mongoose = require('mongoose');
let bodyParser   = require('body-parser');

let usersRouter = require('./routes/users.route');			
let roomsRouter = require('./routes/rooms.route');

mongoose.connect(process.env.DB_URL
	,{ useNewUrlParser: true , useUnifiedTopology: true});

server.listen(PORT, () => {
	console.log("Server nodejs chay tai dia chi: " + ip.address() + ":" + PORT);
});									

 
function parseJson(data) {
	try {
		return JSON.parse(data);
	} catch (error){
		return null;
	}
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', usersRouter); 
app.use('/rooms', roomsRouter);

app.get('/', (req, res) => {
    res.send("hello world");
});
app.get('/test', (req, res) => {
    res.send("hello world test");
});
let ioI = io.on('connection', (socket) => {
	console.log("Client connected");
	socket.emit('welcome', {
		message: "Connected to server"
	});
	
	socket.on('connection', (message) => {
		console.log(message);
	})

	socket.on('disconnect', () => {
		console.log("Client disconnected");
	});
	socket.on('sendFlameSensorData', (data) => {
		distance = data.value;
		//console.log(data)
	})
	//socket.emit('getFlameSensorData', "", "");
});
app.get('/sensor', (req, res) => {
	io.sockets.emit('getFlameSensorData', "", "");
	setTimeout(() => {
		console.log(distance)
		res.send(distance)
	}, 1000)
})

	
//})



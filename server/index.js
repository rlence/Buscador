
//Modulos importados
var bodyParser = require('body-parser')
    ,http = require('http')
    ,express = require('express')
    ,socketio = require('socket.io')
    ,path = require('path')
    ,buscador = require('./Buscador');

//Variables globales
var port = port = process.env.PORT || 3000
   ,app_root = __dirname
   ,app = express()
   ,Server = http.createServer(app)
   ,io = socketio(Server);

 //Configuración de app
 app.use(bodyParser.json());
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static(path.join(app_root, '../public')))
 app.use('/Buscador', buscador)

 Server.listen(port, function(){
   console.log("Servidor funciona en puerto: " + port);
 });

 io.on('Connection', function(socket){
   console.log("new user connected, socket: " + socket.id);

   socket.on('userJoin',(user)=>{
     //Escuchar el evento user join
     socket.user = user;
     socket.broadcast.emit('userJoin', user);
   })
 })

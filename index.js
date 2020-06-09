const app = require("express")();
const http = require("http").Server(app);
const io =require("socket.io")(http); // you 



//logic of our app :
let users =[];
let messages=[];
let index=0;

http.listen("4000",function(){
    console.log("listening on port 4000");
})

io.on("connection",(socket)=>{
    console.log("a new connection to the room chat");

    socket.userName =userName; // I dont know where this userName came from
    users.push(socket)
});
io.on("disconnected",function(){
    console.log("someone has left the room chat")
})
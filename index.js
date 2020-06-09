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

    socket.emit("loggedIn",{ // emit all users and all messages
        users:users.map(s=>s.userName),
        messages:messages
    })

    socket.on("newUser", userName=>{
        console.log("new user is connected")
        socket.userName =userName;                          // I dont know from where this userName came 
        users.push(socket);

        io.emit("UserOnLine",socket.userName)
    })
    socket.on('message',message=>{
        messages.push({msg:message,user:socket.userNamem,index:index}) //msg content, user who send it, and index represent the order of msg
        io.emit("msg",message)
        index++; // for the next msg
    })

    
    socket.on("disconnected",()=>{
        console.log("someone has left the room chat")
        users.splice(users.indexOf(socket),1) // remove the socket from the array => cause user has left the room chat
    })

});

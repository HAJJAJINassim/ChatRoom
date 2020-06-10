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
    
    console.log("join to server");

    socket.emit("loggedIn",{                             
        users:users.map(s=>s.userName),             // emit all usernames to the new connected user
        messages:messages                           // emit all messages to the new connected user
    })

    socket.on("newUser", userName=>{                //recieve the name of the new connected user
        console.log(userName+" is connected");
        socket.userName =userName;                           
        users.push(socket);

        io.emit("UserOnLine",socket.userName);      // send to all users the new connected user
    })
    socket.on('message',message=>{
        messages.push({msg:message,user:socket.userName,index:index}); //msg content, user who send it, and index represent the order of msg
        console.log(messages);
        io.emit("msg",message);
        index++; // for the next msg
    })

    
    socket.on("disconnect",()=>{
        console.log("someone has left the room chat");
        io.emit("userLeft", socket.userName);
        users.splice(users.indexOf(socket),1); // remove the socket from the array => cause user has left the room chat
    })

});

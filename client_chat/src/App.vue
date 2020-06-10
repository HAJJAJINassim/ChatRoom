<template>
  <div id="app">
    <div class="header">
      <h1>ChatRoom </h1>

      <!-- print the users length -->
      <h3>there is {{users.length}} users connected</h3>
      <!-- print the user name -->
      <h4> your user name is {{userName}}</h4>
    </div>
    <ChatRoom v-bind:messages="messages" v-on:sendmsg="sfitserver($event)"></ChatRoom>
  </div>
</template>

<script>

import io from 'socket.io-client';
import ChatRoom from './components/chatroom';
export default {
  name: 'App',
  components: {
    ChatRoom
   },
  data:function(){
      return{
        userName:"",
        socket:io("http://localhost:4000"),
        messages:[],
        users:[],
      };
    },
    methods:{
      joinServer: function(){              // here will start to join the sever
        this.socket.on("loggedIn", (data)=>{
          this.users=data.users;
          this.messages= data.messages
          this.socket.emit("newUser",this.userName) // emit the username to the server (newUser)
        })
        
        // listening to any changes came from the server

        this.socket.on("UserOnLine",(user=>{ // receive a new user 
            this.users.push(user);
          }));

        this.socket.on("msg",(msg=>{ // receive a new msg 
            this.messages.push(msg);
          }));

        this.socket.on("userLeft",(user=>{ // a user has left
            this.users.splice(this.users.indexOf(user),1);
          }));
        
      },
      sfitserver: function(message) {
        console.log(message)
        this.socket.emit("message",message)
        
      }
      
    },
    mounted: function(){
      this.userName=prompt("what is your username", "noName");
      if(!this.userName){
        this.userName="noName"
      }
        this.joinServer();
      
      
    }
}
</script>

<style>

</style>

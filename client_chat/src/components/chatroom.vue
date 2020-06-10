<template>
<div>
     <div class="showmessage">
        <div v-for="msg in messages" v-bind:key="msg">{{msg}}</div>
    </div>
    

    <div class="message">
        
            <input type="text" v-model="message">
            <button v-bind:disabled="!message" v-on:click="sendMessage()" >Send</button>
        
    </div> 
    
</div>


</template> 
<script>


export default {
    name:"ChatRoom",
    props:['messages'],
    data:function(){
        return {
            message:""
        }
    },
    methods:{
        sendMessage : function () {
            if(!this.message){
                alert("enter a message please");
            }
            this.$emit("sendmsg",this.message); // send to parents --> sendthe msg is the name of the event the second par is to send data
            this.message="";
            
        }
    }
}
</script>
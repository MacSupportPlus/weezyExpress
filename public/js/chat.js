const socket = io();

//usernme, message input fields
let chatUserName = document.querySelector('#chat-username');
let chatMessage = document.querySelector('#chat-message');



    //emit a message
    //look for form on page


    let chatForm = document.querySelector('form');
    //add event listenter to form
    chatForm.addEventListener('submit', e=>{
        e.preventDefault();

        console.log('form submitted');
        socket.emit('postMessages', {
            username: chatUserName.value ,
            message: chatMessage.value
        })
    })//end of chat event listner

    //listen for new incoming messages
    socket.on('updateMessage', (data)=>{
        //data {username, message}

        let chatDisplay = document.querySelector('.chat-display')
        
        let newMessage = document.createElement('p');

        if(chatUserName.value === data.username){
            newMessage.className = "bg-success chat-text";
        }
        else{
            newMessage.className ="bg-info text-warning chat-text"
        }

        newMessage.innerHTML = `<strong>${data.username}</strong>: ${data.message}`;

        console.log(newMessage);
        chatDisplay.insertBefore(newMessage, chatDisplay.firstChild);
    })
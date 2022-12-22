import React, { useState } from 'react';
import {StreamChat} from 'stream-chat'; 
import { Chat } from 'stream-chat-react';

import { ChannelListContainer,ChannelContainer,Authentic } from './components/imports'; 
import Cookies from 'universal-cookie'; 

//css from stream
import 'stream-chat-react/dist/css/index.css';
import './CSS_Files/App.css';

// get datas, through cookies
const cookies = new Cookies();

//check for login
const authToken = cookies.get("token");

//get apikey from stream web
const apikey = '8k4ajkqxg7rn';

//instance of stream chat
const client = StreamChat.getInstance(apikey);

//connect users and messages
if(authToken)
{
  client.connectUser({
    id:cookies.get('userID'),
    name:cookies.get('username'),
    fullName:cookies.get('fullName'),
    image:cookies.get('avatarURL'),
    hassedPassword:cookies.get('hassedPassword'),
    phoneNumber:cookies.get('phoneNumber')
  }, authToken);
}

const App = () => {
  //making sure that channels are in both c_container and c_list_container
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  if(!authToken) return <Authentic/>
  

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
      <ChannelListContainer
          //adding ChannelContainer vars to this clss
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}

          setCreateType = {setCreateType}
          setIsEditing = {setIsEditing}
        />

        
        <ChannelContainer 
          isCreating = {isCreating}
          setIsCreating = {setIsCreating}

          isEditing = {isEditing}
          setIsEditing = {setIsEditing}

          createType = {createType}

        />



       
      </Chat>
    </div>

  );
}

export default App;

import React, { useState } from 'react';
import {StreamChat} from 'stream-chat'; 
import { Chat } from 'stream-chat-react';

import { ChannelListContainer,ChannelContainer,Authentic } from './components/imports'; 
import Cookies from 'universal-cookie'; 

import 'stream-chat-react/dist/css/index.css';
import './CSS_Files/App.css';


const cookies = new Cookies();

const authToken = cookies.get("token");

//got apikey from stream web
const apikey = '8k4ajkqxg7rn';

const client = StreamChat.getInstance(apikey);

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
  const [createType, setCreateType] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);


  if(!authToken) return <Authentic/>
  

  return (
    <div className='app__wrapper'>
      <Chat client={client} theme='team light'>
      <ChannelListContainer
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

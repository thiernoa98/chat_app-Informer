import React, { useState } from 'react';
import {useChatContext} from 'stream-chat-react';
import {UserList} from './imports';
import { CloseCreateChannel } from '../assets';


const ChannelNameInput = ({ channelName = channelName,setChannelName}) =>{

  const handelChange = (event)=>{
    event.preventDefault();

    setChannelName(event.target.value);
  }


  return (
    <div className='channel-name-input__wrapper'>
      <p>Group Name: </p>
      <input value={channelName} onChange={handelChange} placeholder="(no spaces)"/>
      <p>Add people</p>
    </div>
  )
}


const EditChannel = ({setIsEditing}) => {

  const {channel} = useChatContext();
 
  const [channelName, setChannelName] = useState(channel?.data?.name || channel?.data?.id );
  const [addedUsers, setAddedUsers] = useState([]);


  const saveChanges = async(event) =>{
    event.preventDefault();

    const nameChange = channelName !== (channel.data.name || channel.data.id);

    if(nameChange){
      await channel.update({name: channelName},{text: `Group Name has been changed to ${channelName}`});
    }

    if(addedUsers.length ){
      
      await channel.addMembers(addedUsers) ;
       
    }
    setChannelName(null);
    setIsEditing(false);
    setAddedUsers([]); 
  }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>

        <p>Edit Group Name</p>

        <CloseCreateChannel setIsEditing={setIsEditing} />

      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
      <UserList addedUsers={addedUsers} setAddedUsers={setAddedUsers}/>

      <div className='edit-channel__button-wrapper' onClick={saveChanges}>
        <p>Save Edit</p>
      </div>
    </div>
  )
}

export default EditChannel;

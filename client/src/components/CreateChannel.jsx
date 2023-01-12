import React, { useState } from 'react';
import { useChatContext} from 'stream-chat-react';
import {UserList} from './imports';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({channelName = '', setChannelName}) =>{


  const handelChange = (event)=>{
    event.preventDefault();

    setChannelName(event.target.value);
  }

  return (
    <div className='channel-name-input__wrapper'>
      <p>Group Name: </p>
      <input required value={channelName} onChange={handelChange} placeholder="(no spaces)" />
      <p>Add people</p>
    </div>
  )
}

const CreateChannel = ({createType, setIsCreating}) => {
    //extracting our id, to add it to the gchat
    const {client, setActiveChannel} = useChatContext();

    //keep track of/able to add multiple users
    const [addedUsers, setAddedUsers] = useState([client.userID || '']);

  //create the channelNames
  const [channelName, setChannelName] = useState('');

  //creating groups
  const createChannel = async(e)=> {
    e.preventDefault();

    try {
        const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: addedUsers
      } );
      await newChannel.watch();

      //remove the bar for adding channel name //clear the field
      setChannelName('');
      setIsCreating (false);

      //have the new field with added member only
      setAddedUsers([client.userID]);
      //switching to new channel
      setActiveChannel(newChannel);

    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className='create-channel__container'>
      <div className='create-channel__header'>
        <p>{createType === 'team' ? 'create a new group' : 'send a private message'} </p>

        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} /> }
      <UserList setAddedUsers = {setAddedUsers} />

      {/*button to add users to group*/}
      <div className='create-channel__button-wrapper' onClick={createChannel}>
        <p>{createType === 'team'? 'create group' : 'start message' }</p>
      </div>
    </div>
  )
}

export default CreateChannel;

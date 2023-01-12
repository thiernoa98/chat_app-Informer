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

    const {client, setActiveChannel} = useChatContext();

    const [addedUsers, setAddedUsers] = useState([client.userID || '']);

  const [channelName, setChannelName] = useState('');

  const createChannel = async(e)=> {
    e.preventDefault();

    try {
        const newChannel = await client.channel(createType, channelName, {
        name: channelName, members: addedUsers
      } );
      await newChannel.watch();

      setChannelName('');
      setIsCreating (false);

      setAddedUsers([client.userID]);

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

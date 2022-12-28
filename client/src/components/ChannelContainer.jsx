//the message box funtion
import React from 'react';
//MessageTeam from stream (already coded) will display the message
import {Channel} from 'stream-chat-react';

import {ChannelInner, CreateChannel, EditChannel} from './imports';

const ChannelContainer = ({ isCreating,setIsCreating, isEditing,setIsEditing, createType}) => {
  //getting info about a specific channel
  //const {channel} = useChatContext();

  //are creating in that specfc channel?
  if(isCreating)
  {
    //channel__container
    return (
      <div className='channel__container'>
        <CreateChannel 
        createType = {createType}
        setIsCreating = {setIsCreating}
        />
      </div>
    )
  }

    //are we editing in that specfc channel?
    if(isEditing)
    {
      //channel__container
      return (
        <div className=''>
        <EditChannel 
          setIsEditing = {setIsEditing}
        />
      </div>
      )
    }

    //empty
    const MtState = () =>(
      <div className='channel-empty__container'>
        <p className='channel-empty__first'>Begining of chat</p>
        <p className='channel-empty__second'>send texts, images, links and more...</p>

      </div>
    )

  

  return (
    //channel-list__header
    <div className='channel-list__header-text2'>

{/*<meta name='color-scheme' content='dark'/>*/}
  <Channel
        
        EmptyStateIndicator={MtState}
      //MessageText is a stream func used to display the message
        //Message = {(messageProps, index) => <ChannelInner key={index} {...messageProps} /> }
        >

          <ChannelInner
            setIsEditing = {setIsEditing}
          />
   

  </Channel>

    </div>
 
  );
}

export default ChannelContainer;


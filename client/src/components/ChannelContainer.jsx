import React from 'react';
import {Channel} from 'stream-chat-react';

import {ChannelInner, CreateChannel, EditChannel} from './imports';

const ChannelContainer = ({ isCreating,setIsCreating, isEditing,setIsEditing, createType}) => {

  if(isCreating)
  {
    return (
      <div className='channel__container'>
        <CreateChannel 
        createType = {createType}
        setIsCreating = {setIsCreating}
        />
      </div>
    )
  }
    if(isEditing)
    {
      return (
        <div className=''>
        <EditChannel 
          setIsEditing = {setIsEditing}
        />
      </div>
      )
    }

    const MtState = () =>(
      <div className='channel-empty__container'>
        <p className='channel-empty__first'>Begining of chat</p>
        <p className='channel-empty__second'>send texts, images, links and more...</p>

      </div>
    )

  

  return (
    <div className='channel-list__header-text2'>

  <Channel
        
        EmptyStateIndicator={MtState}
        >

          <ChannelInner
            setIsEditing = {setIsEditing}
          />
   

  </Channel>

    </div>
 
  );
}

export default ChannelContainer;


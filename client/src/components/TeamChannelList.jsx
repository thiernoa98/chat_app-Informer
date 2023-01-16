import React from 'react';
import { AddChannel } from '../assets/AddChannel';
import Ld from '../assets/loadding.gif';

const TeamChannelList = ({ children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {

    if(error)
    {
        return type === 'team' ? (
            <div className='team-channel-list'>
                <p className='team-channel-list__message'>
                    Connection failed, please try again!
                </p>
            </div>
        ) : null;
    }

    if(loading){

        return(
        <div className='team-channel-list'>
            <p className='team-channel-list__message loading'>
                {
                    //condition
                    type === 'team'?'Groups':'Private Contacts' 
                } loading <img src={Ld} width='15px'/>
            </p>
        </div>
        )
    }

  return (
    <div className='team-channel-list'>
        <div className='team-channel-list__header'>
            <p className='team-channel-list__header__title'>
                {type === 'team'?'Groups':'Personal Messages'}
            </p>

            {/*button to add the groups, or people to text*/}
            <AddChannel 
            
                isCreating = {isCreating}
                setIsCreating = {setIsCreating}
                setCreateType = {setCreateType}
                setIsEditing = {setIsEditing}

                type = {type === 'team' ? 'team': 'messaging'}
                setToggleContainer = {setToggleContainer}
            />
       

        </div>
        
      {children}
    </div>
  );
}

export default TeamChannelList;

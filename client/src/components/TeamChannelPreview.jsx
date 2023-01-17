import React from 'react';
import groupImg from '../assets/grp.png';
import { Avatar, useChatContext } from 'stream-chat-react';


const TeamChannelPreview = ({setActiveChannel, setToggleContainer, setIsCreating, setIsEditing, channel, type}) => {
    const {channel:activeChannel, client} = useChatContext();

    //displays groups
    const ChannelPreview = () =>(
        <p className='channel-preview__item'>
            <img src={groupImg} width='30px' />{channel?.data?.name || channel?.data?.id} 
        </p>
    );

    //preview for dirct messages
    const DirectPreview = () =>{

        //get the correct usr// and getting the user thats not us
        const members = Object.values(channel.state.members).filter(({user} ) => user.id !== client.userID);

        console.log(members[0]);

        return(
            <div className='channel-preview__item single'>
                {/*avat is user's image*/}
                <Avatar 
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName}
                    size={24}
                />
                
                <p>
                   {/*members name, the first user created on stream, display their name*/}
                   {members[0]?.user?.fullName || members[0]?.user?.id}
                </p>
            </div>
        )
    }

    return (
    <div className={
        channel?.id === activeChannel?.id ? 'channel-preview__wrapper__selected' 
        : 'channel-preview__wrapper'}
        onClick={()=>{
            //show messages, not edit
            setIsCreating(false);
            setIsEditing(false);
            setActiveChannel(channel);

            if (setToggleContainer) {
                setToggleContainer = ((prevState) => !prevState)
            }
            
         } }
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview /> }
      
    </div>
  )
}

export default TeamChannelPreview;

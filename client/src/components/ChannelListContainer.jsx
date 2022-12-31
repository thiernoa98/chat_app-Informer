import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './imports';
import Logo from '../assets/logo.png';
import SignoutIcon from '../assets/logout.png';

const cookies = new Cookies();

const SideBar = ({signout})=>(
  <div className='top-blue__bar'>

      <div className='logo-icon__image'>
        <img src={Logo} alt='logo' width="100px" /> 
        
        </div> 
       <p className='app-name'>informer</p> 

      <div className='signout-icon__image' onClick={signout}>
        <a href=''>
        <img src={SignoutIcon} alt='Signout' width="30" />
        </a>
        </div>
  </div>
);

const AppHeader = () => (

<div className='channel-list__header'>
  <p className='channel-list__header__text'> MyInformer </p>

</div>
);

const customChannelGroupFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'team' );
}

const customChannelMessagingFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'messaging' );
}



const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing,setToggleContainer}) => 
{
  const { client } = useChatContext();

  const signout = ()=>{
    cookies.remove("token");
    cookies.remove('userID');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hassedPassword');
    cookies.remove('phoneNumber');
    
    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] }};

  return (
    
    <>
      
      <SideBar signout = {signout} />
 
        <div className='channel-list__list__wrapper'>
        <AppHeader/>
          <ChannelSearch setToggleContainer = {setToggleContainer} /> 
          
          <ChannelList 

              filters={filters}
  
              channelRenderFilterFn={customChannelGroupFilter}

              List={(listProps)=>(
                <TeamChannelList 
                  {...listProps}
                  type='team'
                  
                  isCreating = {isCreating}
                  setIsCreating = {setIsCreating}
                  setCreateType = {setCreateType}
                  setIsEditing = {setIsEditing}
                  setToggleContainer = {setToggleContainer}
                />
              )}

              Preview = {(previewProps) =>(
                <TeamChannelPreview 
                {...previewProps}
                setIsCreating = {setIsCreating}
                setIsEditing = {setIsEditing}
                setToggleContainer = {setToggleContainer}
                type = 'team'
                />

              )}

          />
      
          
          <ChannelList 
              filters={filters}

              channelRenderFilterFn={customChannelMessagingFilter}

              List={(listProps)=>(
                <TeamChannelList 
                  {...listProps}
                  type='messaging'

                  isCreating = {isCreating}
                  setIsCreating = {setIsCreating}
                  setCreateType = {setCreateType}
                  setIsEditing = {setIsEditing}
                  setToggleContainer = {setToggleContainer}
                />
              )}
              
              Preview = {(previewProps) =>(
                <TeamChannelPreview 
                {...previewProps}
                setIsCreating = {setIsCreating}
                setIsEditing = {setIsEditing}
                setToggleContainer = {setToggleContainer}
                type = 'messaging'
                />

              )}
          />
             
        </div> 
        
  </>

  );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing})=>{

  const [toggleContainer, setToggleContainer] = useState(false);

return (
  <>

    <div className=''>
      <ChannelListContent
        setIsCreating = {setIsCreating}
        setCreateType = {setCreateType}
        setIsEditing = {setIsEditing}
      />
    </div>

    <div className='channel-list__container-responsive'
    style={{left: toggleContainer ? "0%" : "-89%", backgroundcolor: "#005fff"}}>

         <div className='channel-list__container-toggle' onClick={() => setToggleContainer(
          (prevToggleContainer) => !prevToggleContainer )}>
         </div>

         <ChannelListContent
            setIsCreating = {setIsCreating}
            setCreateType = {setCreateType}
            setIsEditing = {setIsEditing}
            setToggleContainer = {setToggleContainer}
        />

    </div>
  </>
)
}
export default ChannelListContainer;

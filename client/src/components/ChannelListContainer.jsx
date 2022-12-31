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
{/*
      </div>

    </div>
*/}
  </div>
);

//func component

const AppHeader = () => (

<div className='channel-list__header'>
  <p className='channel-list__header__text'> MyInformer </p>

</div>
);

//groups are shown with this func
const customChannelGroupFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'team' );
}

//personal messages
const customChannelMessagingFilter = (channels) =>{
  return channels.filter((channel) => channel.type === 'messaging' );
}



const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing,setToggleContainer}) => 
{
  const { client } = useChatContext();

  //logout func
  const signout = ()=>{
    //clear all cookies 
    cookies.remove("token");
    cookies.remove('userID');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('avatarURL');
    cookies.remove('hassedPassword');
    cookies.remove('phoneNumber');
    
    window.location.reload();
  }

  //filter onbject //$in == included //get all message wit our userId on it
  const filters = { members: { $in: [client.userID] }};

  return (
    
    <>
      
      <SideBar signout = {signout} />
 
        <div className='channel-list__list__wrapper'>
        <AppHeader/>
          <ChannelSearch setToggleContainer = {setToggleContainer} /> 

          {/* groups and messages // channel-list__list__wrapper*/ }

          
          <ChannelList 

              //this allows to filter messages
              filters={filters}
  
              // show groups names
              channelRenderFilterFn={customChannelGroupFilter}

              //teamList class begi
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

              //TeamPreview class
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
      

          {/* direct/provate messages*/}
          
          <ChannelList 

              //this allows to filter messages
              filters={filters}

              //pass on filters here//func
              channelRenderFilterFn={customChannelMessagingFilter}

              //teamList class begi
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
              
              //TeamPreview class
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

  //making sure we toggle the website beased on the size of the device
  const [toggleContainer, setToggleContainer] = useState(false);

return (
  <>
  {/*only visible on desktop devices //channel-list__container*/}

    <div className=''>
      <ChannelListContent
      //ChannelListContent func has four params, no issue if we have just three here
        setIsCreating = {setIsCreating}
        setCreateType = {setCreateType}
        setIsEditing = {setIsEditing}
      />
    </div>

    {/* only visible on mobile deivices*/}

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

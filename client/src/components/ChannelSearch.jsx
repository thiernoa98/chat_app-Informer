import React, {useState, useEffect} from 'react';
import { useChatContext } from 'stream-chat-react';
import {SearchIcon} from '../assets';
import { OutcomeDropdown } from './imports';



const ChannelSearch = ({setToggleContainer}) => {

    const {client, setActiveChannel} = useChatContext();
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);


    useEffect(() => {
      if(!query){
      
        setTeamChannels([]);
        setDirectChannels([]);
      }
      
      }, [query])


    //the getChanls func //async since it has to be setfirst
    const getChannels = async(text) =>{
        try {
            //query //userID is mine,admin
            const channelResponse = client.queryChannels({
              type:'team', 
              name: {$autocomplete: text},
              members: {$in: [client.userID]}
            });
          
            //query other users
            const userResponse = client.queryUsers({
              //exclude our userID with $ne
              id: {$ne: client.userID },
              name: {$autocomplete: text},
              
            })

            const [channels, {users}] = await Promise.all([channelResponse, userResponse]);

            //check if the searched group/person exist
            if(channels.length) setTeamChannels(channels);

            if(users.length) setDirectChannels(users);

        } catch (error) {
            //if erro, set query mt
            setQuery('');
        }
    }


    const searchOnClick = (event)=>{
        //prevent refresh of page after search
        event.preventDefault();
        setLoading(true);

        //what is been searched, the value of input below
        setQuery(event.target.value);
        getChannels(event.target.value);

    }

    const setChannel = (channel)=> {
      setQuery('');
      setActiveChannel(channel);
    }


  return (
   

    <div className='channel-search__container'>
        
        <div className='channel-search__input__wrapper'>
          <div className='channel-search__input__icon'>
  
            <SearchIcon />
          </div>
          
          <input
                className='channel-search__input__text' 
                placeholder="Search people/groups" 
                type="text" 
                value={query} 
                onChange={searchOnClick} 
          />
        </div>

        {
          
          //check if query exist
          query && (
            <OutcomeDropdown
              teamChannels = {teamChannels}
              directChannels = {directChannels}
              loading = {loading}
              setChannel = {setChannel}
              setQuery = {setQuery}
              setToggleContainer = {setToggleContainer}

            />
          )
          
        }
    </div>
    
      

  )
}

export default ChannelSearch;


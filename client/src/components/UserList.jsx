import React, {useEffect, useState} from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import {InviteIcon} from '../assets';

const ListConatiner =({children}) =>{
    return (
        <div className="user-list__container">
            <div className="user-list__header">
                <p>User</p>
                <p>Add</p>
            </div>
            
            {children}
        </div>
    )
}

const UserItem =({user, setAddedUsers})=>{
    const [added, setAdded] = useState(false);

    const handleSeclect = ()=>{

        if(added) {
            setAddedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id ))
        }else{
              setAddedUsers((prevUsers)=> [... prevUsers, user.id])  
        }

        setAdded((prevAdded) => !prevAdded);
    }

    return (
        <div className="user-item__wrapper" onClick={handleSeclect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size ={40} />
                    
                <p className="user-item__name">{user.fullName || user.id}</p>
        
                {added? <InviteIcon/> : <div className="user-item__invite-empty"/> }
            </div>

        </div>
    )
}

const UserList = ({setAddedUsers}) => {
    const {client} = useChatContext();
     
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [listMt, setListMt] = useState(false);

    const [error, setError] = useState(false);

    useEffect(() =>{

       const getUsers = async() =>{
        if (loading) return;   
        
        setLoading (true);

        try {
            const response = await client.queryUsers(
                {   
                    id: {$ne: client.userID}
                },
                {
                    id: 1
                },
                {
                    limit: 10 
                }
            )
            if(response.users.length)
            {
                setUsers(response.users);
            }else{
                setListMt(true);
            }
            
        } catch (error) {
            setError(true);
        }
        setLoading(false);
       }

       if(client) getUsers()
    }, [])

    if(error){
        <ListConatiner>
        return(
            <div className="user-list__message">
                 Error loading, please refresh page
            </div> 
        )
        </ListConatiner>
    }

    if(listMt){
        <ListConatiner>
        return(
            <div className="user-list__message">
                Sorry, but no user were found!
            </div> 
        )
        </ListConatiner>
    }

  return (
    <ListConatiner>
      {loading ? <div className="user-list__message">
        Users loading...
      </div> : 
      (users?.map((user, i) =>(
        <UserItem index={i} key={user.id} user = {user} setAddedUsers = {setAddedUsers} />
      ))
      )}

    </ListConatiner>
  )
}

export default UserList;

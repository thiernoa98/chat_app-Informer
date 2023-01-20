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
    //adding users to groups
    const [added, setAdded] = useState(false);

    const handleSeclect = ()=>{

        if(added) {
            //just remove the check from one user only
            setAddedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id ))
        }else{
              setAddedUsers((prevUsers)=> [... prevUsers, user.id])  
        }

        //modify to the previous value, if isAdded, then unset/unAdd it
        setAdded((prevAdded) => !prevAdded);
    }

    return (
        <div className="user-item__wrapper" onClick={handleSeclect}>
            <div className="user-item__name-wrapper">
                <Avatar image={user.image} name={user.fullName || user.id} size ={40} />
                {/*display name instead of just avatar*/}
                <p className="user-item__name">{user.fullName || user.id}</p>
        
                {/* if added, show check mark, else empty div*/}
                {added? <InviteIcon/> : <div className="user-item__invite-empty"/> }
            </div>

        </div>
    )
}

const UserList = ({setAddedUsers}) => {
    //get client
    const {client} = useChatContext();
     
    //array of all users
    const [users, setUsers] = useState([]);

    const [loading, setLoading] = useState(false);

    const [listMt, setListMt] = useState(false);

    const [error, setError] = useState(false);

    //call when something changes
    useEffect(() =>{

       const getUsers = async() =>{
        if (loading) return;   
        
        setLoading (true);

        try {
            //querying users in params
            const response = await client.queryUsers(
                {   //expluding ourselfs in the query since we are adding others, not ourselves
                    id: {$ne: client.userID}
                },
                {
                    id: 1
                },
                {
                    limit: 10 //limit 10 users
                }
            )
            //check the query
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

       //if there's a client/user, then call getUser func
       if(client) getUsers()
    }, [])

    //if error, show this
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
      //is there user? check
      (users?.map((user, i) =>(
        <UserItem index={i} key={user.id} user = {user} setAddedUsers = {setAddedUsers} />
      ))
      )}

    </ListConatiner>
  )
}

export default UserList;

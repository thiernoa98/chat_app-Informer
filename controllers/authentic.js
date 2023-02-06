const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const StreamChat = require('stream-chat').StreamChat;
const crypto = require('crypto');
const { stdout } = require('process');
 

//.env class
require('dotenv').config();

//files from .env file
const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_APP_ID;


const signup = async (request, response)=>{
    try {
        //import the front-end usernames..
        const{fullName,username, password, phoneNumber} = request.body;

        //create random userID
        const userID = crypto.randomBytes(16).toString('hex');

        //connect to the server
        const serverClient = connect(api_key, api_secret, app_id);

        //masking password
        const hassedPassword = await bcrypt.hash(password,10);
        const token = serverClient.createUserToken(userID);

        //return the data
        response.status(200).json({token, fullName, username, userID, hassedPassword, phoneNumber});

    } catch (error) {
        console.log('an error has ocured',error);
        response.status(500).json({message : error});
    }
};


const login = async (request, response)=>{
    try {
        const {username, password} = request.body;

        //connect to the server
        const serverClient = connect(api_key, api_secret, app_id);
        const client = StreamChat.getInstance(api_key, api_secret);

        //matching the users on the dbs
        const { users }  = await client.queryUsers({name: username});
        //if useer not found
        if (!users.length) {

            return response.statusMessage = "Incorrect user or password", 
            response.status(400).end() 
        }
        //response.status(400).json({message: "incorrect user"});
        
        //decrypt hassed pass and compare
        const success = await bcrypt.compare(password, users[0].hassedPassword);

        const token = serverClient.createUserToken(users[0].id);

        //if user matches
        if (success) 
        {
         response.status(200).json({token, fullName: users[0].fullName, username, userID: users[0].id });
        }
        else
        {
            return response.statusMessage = "Incorrect user or password", 
            response.status(500).end() 
           // response.status(500).json({ message: "Incorrect Password"})
            
        }
        

    } catch (error) {
        console.log(error);
        response.status(500).json({message : error});
    }
};

module.exports = {signup, login}


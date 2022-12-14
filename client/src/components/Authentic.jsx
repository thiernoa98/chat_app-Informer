import React,{useState} from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import loginImage from '../assets/signup.jpg';

const cookies = new Cookies();

const initialState = {
    fullName:'',
    username:'',
    password:'',
    confirmPassword:'',
    phoneNumber:'',
}

const Authentic = () => {

    const [form, setForm] = useState(initialState);

    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e)=>{
        e.preventDefault();
        setForm({...form, [e.target.name]:e.target.value});
       
    } 

    const handleSubmit = async (e)=>{
  
        e.preventDefault();

        const {username, password, phoneNumber } = form;

        const URL = 'http://localhost:5000/authentic';


        const { data: {token, userID, hassedPassword, fullName}}  = 
        await axios.post(`${URL}/${isSignup? 'signup':'login' }`, 
        {username, password, fullName: form.fullName, phoneNumber });

        cookies.set('token', token);
        cookies.set('username', username);
        cookies.set('fullName', fullName);
        cookies.set('userID', userID);

        if(isSignup)
        {
            cookies.set('phoneNumber', phoneNumber);
            cookies.set('hassedPassword', hassedPassword);
        }

        window.location.reload();

    }
    
    const switchMode = ()=>{
        setIsSignup((previewIsSignup)=> !previewIsSignup);  
    }

  return (
    <div className='auth__form-container'>
      <div className='auth__form-container_fields'>
        <div className='auth__form-container_fields-content'>
            <p>
                {isSignup ? 'Sign Up' : 'Login'}
            </p>

            <form onSubmit={handleSubmit}>
                {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='fullName'> Full Name</label>
                        <input 
                            name='fullName'
                            type="text"
                            placeholder="Full Name"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                  <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='username'> Username</label>
                        <input 
                            name='username'
                            type="text"
                            placeholder="username"
                            onChange={handleChange}
                            required
                        />
                 </div>

                 {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='phoneNumber'>Phone Number</label>
                        <input 
                            name='phoneNumber'
                            type="text"
                            placeholder="Phone Number"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}


                <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='password'> Password</label>
                        <input 
                            name='password'
                            type="password"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                        />

                </div>

                {isSignup && (
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='confirmPassword'> Confirm Password </label>
                        <input 
                            name='confirmPassword'
                            type="Password"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                            required
                        />
                    </div>
                )}
                <div className='auth__form-container_fields-content_button'>
                    
                    {
                       <button> 
                         {isSignup ? "Signup" : "Login"}
                        </button>
                    }
                </div>

            </form>

            <div className='auth__form-container_fields-account'>
                <p>
  
                    {isSignup? <span onClick={switchMode}> Already have an Account? </span> :
                     <span onClick={switchMode}> Don't have an Account? </span>}

                     <span onClick={switchMode}>
                        {isSignup ? 'Signin' : 'Sign up'}
                     </span>

                </p>
            </div>
        </div>
      </div>
      <div className='auth__form-container_image'>
           <img src={loginImage} alt="Login"/>

      </div>

    </div>
  )
}

export default Authentic;

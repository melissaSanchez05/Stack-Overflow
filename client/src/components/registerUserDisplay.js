import React, { useState, useEffect } from 'react';
import Button from './button';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

export function RegistrationForm(){
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordconfirmation, setPasswordConfirmation] = useState('');
    const [invalidUsername, setInvalidUsername] = useState(false);
    const [invalidPassword, setInvalidPassword] = useState(false);
    const [isMember, setIsMember] = useState(false);
    const navigate = useNavigate();

    
    const clearStates = () =>{
        setEmail('');
        setUsername('');
        setPassword('');
        setPasswordConfirmation('');
    };

    const handleRegistration = async (event) =>{
        event.preventDefault();
        try{
            const form = {
                username : username,
                email : email,
                password : password,
                pConfirmation: passwordconfirmation,

            };

            
            const req = await axios.post(`http://localhost:8000/Register`, form);
        
            
     
            if( req.data == 'user'){
                //user already taken, try a new username
    
                console.log('inside user');
                setInvalidUsername(true);
                clearStates();
                
                
            }else if(req.data == 'psw'){
                //password is weak or invalid
                console.log('inside psw');
                setInvalidPassword(true);
                clearStates();
               
               
            }else if(req.data === 'member'){
                console.log('inside mem');
                //the user has an account already
                setIsMember(true);
                clearStates();
               
               
            }else{
             //if it is indeed a new user and passowrd is unique
             //make the user log in
             console.log('inside else');
             navigate('/Success');
            }

 
        }catch(err){
            console.error('Error during Registration', err);
            
        }

    };




    return(


  <div className="wrapper center-r">
    <h2>Registration</h2>
    {isMember ? <h4 className="color-r">User has an Account, log in</h4> : ''}
    {invalidPassword ? <h4 className="color-r">Weak Password</h4> : ''}
    {invalidUsername ? <h4 className="color-r">Username is taken</h4> : ''}
    <form onSubmit={handleRegistration}>
      <div className="input-box">
        <input 
        value ={username}
        onChange={(e)=> setUsername(e.target.value)}
        type="text" 
        placeholder="Enter your name or username" required />
      </div>
      <div className="input-box">
        <input 
        value={email}
        onChange={(e)=> setEmail(e.target.value)}
        type="text" 
        placeholder="Enter your email" required />
      </div>
      <div className="input-box">
        <input 
        value={password}
        onChange={(e)=> setPassword(e.target.value)}
        type="password" 
        placeholder="Create password" required />
      </div>
      <div className="input-box">
        <input 
        value={passwordconfirmation}
        onChange={(e)=> setPasswordConfirmation(e.target.value)}
        type="password" 
        placeholder="Confirm password" required/>
      </div>
      <div className="policy">
        <input 
        type="checkbox"/>
        <h3>I accept all terms & condition</h3>
      </div>
      <Button className="input-box button" label="Register Now" />

      <div className="text">
        <h3>Already have an account? <Link to="/" >Login now</Link></h3>
      </div>
    </form>
  </div>

        
        
    
    );

};

export default RegistrationForm;


/**
 *       <div className="input-box button">
       
        <input type="Submit" value="Register Now"/>
      </div>
 */
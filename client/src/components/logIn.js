import React, { useState } from 'react';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function LoginForm() {
const[email, setEmail] = useState('');
const[password, setPassword] = useState('');
const [invalidInfo, setInvalidInfo] = useState(false);
const [createMember, setCreateMember] = useState(0)
const navigate = useNavigate();

const invalidEntry =   () =>{
    return (email === '' || password === '')
  
   };
const clearStates = () =>{
    setPassword('');
    setEmail('');

};
const handleLogin = async (event) =>{
    event.preventDefault();


    try{
        const user = {
            email : email,
            password, password,
        };
        const req = await axios.post(`http://localhost:8000/Login`, user);

        //wrong password or username
        if(req.data === 'psw'){
            setInvalidInfo(true); 
            clearStates();
            setCreateMember( createMember + 1);
        }else{
            //naviage to home page
            navigate('/Questions/Newest')

        }

    }catch(err){
        console.error('Error during LogIn', err);
    }
    /*
    setAttemptedLogin(true); 
     if(invalidEntry()){
      setEmail(''); 
      setPassword(''); 

     }else{
        navigate('/Questions/Newest');

     }
     */
};

  return (
    <div className="login">
      <div className="heading">
        <h2>Sign in</h2>
        <form action="#" onSubmit={(e) => handleLogin(e)}>
          <div className="input-group input-group-lg">
            <span className="input-group-addon"><i className="fa fa-user"></i></span>
            <input 
            value= {email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
             className="form-control" 
             placeholder="Username or email" />
          </div>

          <div className="input-group input-group-lg">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
            <input 
            type="password" 
            value ={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="form-control" 
            placeholder="Password" />
          </div>

          	
          {invalidInfo ? <h4 className="color-r">Invalid Password or Username</h4> : ''}
          {createMember > 3 ? <h4 className="color-g">Become a member, create an account</h4> : ''}
				
			
          <Button label="Login" className="float" onClick={handleLogin}/>
          <Button label="Register" className="float" to={'/Register'}/>
          <Button label="Guest" className="float" to={'/Questions/Newest'}/>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;



/*
<div className="login">
      <div className="heading">
        <h2>Sign in</h2>
        <form action="#">
          <div className="input-group input-group-lg">
            <span className="input-group-addon"><i className="fa fa-user"></i></span>
            <input 
            value= {email}
            onChange={(e) => setEmail(e.target.value)}
            type="text"
             className="form-control" 
             placeholder="Username or email" />
          </div>

          <div className="input-group input-group-lg">
            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
            <input 
            type="password" 
            value ={password}
            onChange={(e)=> setPassword(e.target.value)}
            className="form-control" 
            placeholder="Password" />
          </div>

          	
          {attemptedLogin ? <h4 className="color-r">Invalid Password or Username</h4> : ''}
				
			
          <Button label="Login" className="float" onClick={handleLogin}/>
          <Button label="Guest" className="float" to={'/Questions/Newest'}/>
        </form>
      </div>
    </div>
*/
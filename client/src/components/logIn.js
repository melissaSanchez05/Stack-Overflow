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


const clearStates = () =>{
    setPassword('');
    setEmail('');

};
const handleLogin = async (event) =>{
    event.preventDefault();
 
    try{
        const user = {
            username : email,
            password: password,
        };

        const req = await axios.post(`http://localhost:8000/Login`, user);

        //wrong password or username
        if(req.data === 'psw'){
            setInvalidInfo(true); 
            clearStates();
            setCreateMember( createMember + 1);
        }else{
            //naviage to home page
            sessionStorage.setItem('username', email);
            sessionStorage.setItem('userType', 'member');
           
            navigate('/Profile')
            window.location.reload();

        }

    }catch(err){
        console.error('Error during LogIn', err);
    }


};
const handleGuestLogin = () =>{
    sessionStorage.setItem('userType', 'guest');
  
    navigate('/Questions/Newest');
    window.location.reload();
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
				
			
          <Button label="Login" className="float" />
          <Button label="Register" className="float" to={'/Register'}/>
          <Button label="Guest" className="float" onClick={handleGuestLogin}/>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;




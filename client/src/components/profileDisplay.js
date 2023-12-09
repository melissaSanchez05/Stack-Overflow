import React, { useEffect, useState } from 'react';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { now } from 'mongoose';
const username = sessionStorage.getItem('username');

export function ProfileForm(){
const [users, setUsers] = useState([]);


const navigate = useNavigate();

useEffect( () => {
    const fetchUser = async () => {
        try{

        const res = await axios.get('http://localhost:8000/Register');
        
        setUsers(res.data.users);
            
        }catch(error){
            console.error('Error fetching data:', error);
        }
    };
    fetchUser();
},[]);

if (users.length === 0 ) {
    return <div>Loading...</div>;
  }
 

        //get the loged user info
     const member = users.find( (usr) => usr.username === username);


    const handleDeleteProfile = async () =>{
    //delete profile 
    const req = await axios.post(`http://localhost:8000/Register/UserDelete`);
    //go to login
    if(req.data == 'deleated'){
        navigate('/');

    }else{
 
        alert("Deleating was not succesful");
    }
    };
    return(


<div className="container d-flex  p-center justify-content-center">
    
    <div className="card p-3 py-4">
        <div className="text-center"> 
		<img src="https://i.postimg.cc/0jp7hjFc/ui-profile-icon-vector.jpg" width="100"  className='round-img' alt="Profile Image"/>
            <h3 className="mt-2">{member.username}</h3>
			<span className="mt-1 clearfix">Active Member for {memberActiveYears(member.memberYear)} </span>
			
			<div className="row mt-3 mb-3">
			
	
			  <div className="col-md-4">
			  <h5>Questioons posted</h5>
				<span className="num">{member.qs_asked}</span>
			  </div>
			  <div className="col-md-4">
			  <h5>Reputation</h5>
				<span className="num">{member.reputation}</span>
			  </div>
			
			</div>
			
			<hr className="line"/>
			
	
			  
			 <div className="profile mt-5">
             
			 <Button className="profile_button px-5" label ="Menu" to={'/Questions/Newest'}/>
             <Button className="profile_button px-5" label ="Questions" to={''}/>
             <Button className="profile_button px-5" label ="Answers" to={''}/>
             <Button className="profile_button px-5" label ="Tags" to={''}/>
             <Button className="profile_button px-5" label ="Log out" to={'/LogOut'}/>
             <Button className="profile_button px-5" label ="Delete Profile" onClick={handleDeleteProfile}/>
            

		</div>
			   
        </div>
    </div>
  
</div>




    
    );
}


function memberActiveYears(date){
    const signUp = new Date(date);   
    const current = new Date();

    
    if( current.getFullYear() - signUp.getFullYear() > 0){
        return current.getFullYear() - signUp.getFullYear() + ' Years';
    }else if(current.getMonth() - signUp.getMonth() > 0){

        return current.getMonth() - signUp.getMonth() + ' Months';

    }else if(current.getDate() - signUp.getDate()){
        return current.getDate() - signUp.getDate() + ' Days';
    }else if(current.getHours() - signUp.getHours()){
        return current.getHours() - signUp.getHours() + ' Hours';
    }else if(current.getMinutes() - signUp.getMinutes()){
        return current.getMinutes() - signUp.getMinutes() + ' Minutes';
    }else{
        return current.getSeconds() - signUp.getSeconds() + ' Seconds';
    }
}
export default ProfileForm;
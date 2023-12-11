import React, { useEffect, useState } from 'react';
import Button from './button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { now } from 'mongoose';
const username = sessionStorage.getItem('username');

export function ProfileForm(){
const [users, setUsers] = useState([]);
const [questions, setQuestions] = useState([]);

const navigate = useNavigate();

useEffect( () => {
    const fetchUser = async () => {
        try{

        const res = await axios.get('http://localhost:8000/Register');
        
        setUsers(res.data.users);
        setQuestions(res.data.questions)
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
     const qsPosted = questions.filter(qs => {return qs.asked_by === username});

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
    const onTitleClick = (questionId)=>{
        if(questionId !== null){
            navigate(`/EditQuestion/${questionId}`)
        }
    }
    return(


<div className="  container justify-content-center card-qs" >
    
    <div className="card  ">
    {/** first colunm */}
                {<Profile member={member} handleDeleteProfile={handleDeleteProfile}/>}
                
        
    </div >
    {/** side */}
    {<DisplayQuestionPosted questions={qsPosted} onTitleClick={onTitleClick}/>}
    

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
function Profile({member, handleDeleteProfile}){
    return (
        <>
                <div className="text-center "> 
		<img src="https://i.postimg.cc/0jp7hjFc/ui-profile-icon-vector.jpg" width="100"  className='round-img' alt="Profile Image"/>
            <h3 className="mt-2">{member.username}</h3>
			<span className="mt-1 clearfix">Active Member for {memberActiveYears(member.memberYear)} </span>
			
			<div className="row mt-3 mb-3">
			
	
			  <div >
			  <h5>Questioons posted</h5>
				<span className="num">{member.qs_asked}</span>
			  </div>
			  <div >
			  <h5>Reputation</h5>
				<span className="num">{member.reputation}</span>
			  </div>
			
			</div>
			
			<hr className="line"/>
			
	
			  
			 <div className="profile mt-5">
             
			 <Button className="profile_button px-5" label ="Menu" to={'/Questions/Newest'}/>
             <Button className="profile_button px-5" label ="Log out" to={'/LogOut'}/>
             <Button className="profile_button px-5" label ="Edit" to={'/LogOut'}/>
             <Button className="profile_button px-5" label ="Delete Profile" onClick={handleDeleteProfile}/>
            

		</div>
			   
        </div>
        </>
    );
}
function DisplayQuestionPosted({questions, onTitleClick}){
    return(
        <>
                <div className="text-center overflow-page"> 
                
            <h3 className="mt-2"></h3>
			<span className="mt-1 clearfix"> </span>
			

			 <div className="profile mt-5">
             <span className="mt-1 clearfix color-b tag-header-text-question"> Questions Posted  </span>
             {questions.length > 0 ?  questions.map( qs => <QuestionSummary key={qs._id} question={qs} onTitleClick={onTitleClick}/>)
             : <div className="question-no-found">No Results Found</div>}
     
            

		</div>
			   
        </div>
        
        </>
    );
}
function QuestionSummary({question , onTitleClick}){

        return(
            <div className="post-summary">
          
              <QuestionMeta id={question._id} title={question.title} onTitleClick={onTitleClick}/>

                   </div>
        );
}
function QuestionMeta({id,title, onTitleClick}){
    return(
      <div className="post-summary-content">
      <h3 className="post-summary-content-title color-b bold_text"> <div  className="post-link" onClick= {()=> onTitleClick(id)} >{title} </div>  </h3>
    </div>
    );
  }
export default ProfileForm;
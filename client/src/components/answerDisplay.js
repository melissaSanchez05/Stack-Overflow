
import axios from "axios";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import React,{  useEffect, useState } from "react";
import VoteButtonForm from "./voteButton";

const userType = sessionStorage.getItem('userType');
const username = sessionStorage.getItem('username');

export function AnswerContent({questionId}){
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const navigate = useNavigate();


 
  useEffect(() => {

    const fetchData = async () => {
      try {
        const updateViews = await axios.post(`http://localhost:8000/Questions/${questionId}`);
        
        const res = await axios.get('http://localhost:8000/Answers');
        setQuestions(res.data.questions);
        setAnswers(res.data.answers);
  
      } catch (error) {
        console.error('Error updating and fetching data:', error);
      }
    };
  
    fetchData();
  }, [questionId]);

 const handleComment = (ansId) =>{
    if(ansId != null){
     navigate(`/AddComment/${ansId}`)
    }
 }

       


  if (questions.length === 0 || answers.length === 0) {
    return <div>Loading...</div>;
  }


  

      return(

           <>
            {questionId === '' ? (<div className="question-no-found">Error</div> )
            : (<QuestionSummary questionId={questionId} questions={questions} answers={answers} handleComment={handleComment} />)}
            </>

      );
}
//answer corresponds to the qs id triggered, which will be used to find the corresoing
//answers related to the current qs
function QuestionSummary({questionId, questions, answers, handleComment}){


    const current_qs = questions.filter(qs => {
      return qs._id === questionId;
    });
    const current_answersId = current_qs.flatMap(qs => qs.answers)
    
   
    
       const current_related_ans =  answers.filter((ans)=>{return  current_answersId.includes(ans._id); })
      .sort(function(ans1,ans2){ return sortAnswerByDate(ans1, ans2);});

      
            

     
      
    return(
        <> 
        <div className="question-header reduce-width">
           {userType === 'guest' ? <Button label ="LogIn" className= "ask-question move-left" to={'/'} /> : <Button label ="Ask Question" className= "ask-question move-left" to={'/AskQuestion'} />}
           {userType === 'guest' ? '' : <Button label ="LogOut" className= "ask-question move-left logout-color" to={'/LogOut'} />}
           {userType === 'guest' ? '' : <Button label ="LogOut" className= "ask-question move-left logout-color" to={'/LogOut'} />}
           

           </div>
      {current_qs.length > 0 ? ( current_qs.map((qs)=> <QuesitonDisplay key={qs._id} question={qs} />)) : (<div className="question-no-found">No Questions Found</div>)}
      
      {current_related_ans.length > 0 ? (current_related_ans.map((answer)=> <RelatedAnswers key={answer._id} answer={answer} handleComment={handleComment}/>))
      :(<div className="question-no-found">No Results Found</div>)  }
      
      {userType === 'guest' ? ('') : (<Button label ="Answer Question" className= "ask-question flush-right-b" to={`/AnswerQuestion/${questionId}`}/>)}
      </>
    );
    
    
} 
function QuesitonDisplay({question}){
        return(
 
            <div className="answers-summmary post-summary">
            
            <QuestionMeta user={question.asked_by} date={question.asked_date_time}/>
          <QuestionStats answer={question.answers.length} views={question.views} votes={question.votes} questionId={question._id} />
          
          <QuestionSummaryDisplay title={question.title} summary={question.text}/>
          
          
          </div>
          
         
          
          
        );
}
function QuestionSummaryDisplay({title, summary}){
      return(
        <div className="post-summary-content ans-summary-content ">
            
        <h3 className="post-summary-content-title inc-w color_B inc-font bold_text">{title}</h3>
        <h3 className="post-summary-content-meta-text-container post-summary-content-title">{summary}</h3>
        

        </div>
      );
 }
function QuestionMeta({user, date}){
  
      return(
        <div className="ans-summary-content-meta move-left">
        <div className="ans-summary-content-meata-user"> 
        
          <span className= {`post-summary-stats-items user-meta`}>{user} </span>
          
        </div>
        <div className="ans-summary-content-meata-user"> 
        
          <span className={`post-summary-stats-items time `}>{showRelativeTime(date)}</span>
          
        </div>

        
    
        </div>
      );
}
function QuestionStats({answer, views, votes, questionId}){


  const handleUpvote = async () =>{

    try{

    const votes = await axios.post(`http://localhost:8000/Questions/Upvote/${questionId}/${username}`);
    if(votes.data === 'reputation'){
      alert('User is unable to vote.')
    }
    window.location.reload();
    }catch(error){
      console.error('Error Upvoting:', error);
    }

  };
  const handleDownvote = async () =>{

    try{

    const votes = await axios.post(`http://localhost:8000/Questions/Downvote/${questionId}`);
    window.location.reload();
    }catch(error){
      console.error('Error Downvoting:', error);
    }
 
  };
      return(
        <div className="post-summary-stats ans-summary-stats flex-s "> 
        <div className="post-summary-stats-items ">
          <span className="post-summary-stats-items d-front-weight d-white-space bold_text">{answer}</span>
          <span className="post-summary-stats-items bold_text"> answers</span>
        </div>
        <div className="post-summary-stats-items">
          <span className="post-summary-stats-items d-front-weight d-white-space bold_text">{views}</span>
          <span className="post-summary-stats-items bold_text "> views</span>
        </div>
        <div className="post-summary-stats-items ">
          <span className="post-summary-stats-items d-front-weight d-white-space bold_text">{votes}</span>
          <span className="post-summary-stats-items bold_text"> votes</span>
        </div>
        {userType === 'guest' ? '' : <VoteButtonForm onUpvote={handleUpvote} onDownvote={handleDownvote} showDownvote={true}/> }
    </div>
      );
}
function AnswerMeta({user, date, votes, userClassName = '', timeClassName = '', answerId, handleComment}){
  const handleUpvote = async () =>{

    try{

    const votes = await axios.post(`http://localhost:8000/Answers/Upvote/${answerId}/${username}`);
    if( votes.data == 'reputation'){
      alert('User is unable to vote.');
    }
    window.location.reload();
    }catch(error){
      console.error('Error Upvoting:', error);
    }

  };
  const handleDownvote = async () =>{

    try{

    const votes = await axios.post(`http://localhost:8000/Answers/Downvote/${answerId}`);
    window.location.reload();
    }catch(error){
      console.error('Error Downvoting:', error);
    }
 
  };
      return(
        <div className="ans-summary-content-meta">
        <div className="ans-summary-content-meata-user"> 
        
          <span className= {`post-summary-stats-items user-meta ${userClassName}`}>{user} </span>
          
        </div>
        <div className="ans-summary-content-meata-user"> 
        
          <span className={`post-summary-stats-items time ${timeClassName}`}>{showRelativeTime(date)}</span>
          
        </div>
        <div className="ans-summary-content-meata-user"> 
        
        <span className={`post-summary-stats-items time ${timeClassName}`}>{votes} votes</span>
        
      </div>
        {userType === 'guest' ? '' : <VoteButtonForm onUpvote={handleUpvote} onDownvote={handleDownvote} showDownvote={true}/> }
        {userType === 'guest' ? '' : <Button label ="Add comment" className= "ask-question move-left logout-color" onClick={() => handleComment(answerId)} />}
    
        </div>
      );
}
function RelatedAnswers({answer, handleComment}){
  const [comments, setComments] = useState([]);
  useEffect(() => {

    const fetchData = async () => {
      try {
       
        
        const res = await axios.get('http://localhost:8000/Answers/Comments');
        setComments(res.data.comments);
       
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

   const comment = comments.filter( com => answer.comments.includes(com._id)).sort((c1, c2) => { return sortAnswerByDate(c1,c2)}).reverse();
        return(
        <>
            <div className=" undo_border">
              <AnswerMeta user={answer.ans_by} date={answer.ans_date_time} votes={answer.votes} userClassName="d-color-g" timeClassName="clear-element" answerId={answer._id} handleComment={handleComment}/>

            <h3 className="post-summary-content-meta-text-container post-summary-content-title color_B">{answer.text}</h3>

        
   
          
          </div>

          { comment.map((com) =><CommentsDisplay key={com._id} comment={com}/> )}
          </>
          
        );
}           
function showRelativeTime(date){
  const postDate = new Date(date);
  const currentTime = new Date();


  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var m = postDate.getMinutes();
        if(postDate.getMinutes() < 10){
          m = "0" + postDate.getMinutes();
        }

  if(currentTime.getFullYear() !== postDate.getFullYear()){//post year is older 
        
    return months[postDate.getMonth()] + " " + postDate.getDate() + ", " + postDate.getFullYear() + " at " + postDate.getHours() + ":" + m;

  }
  else if(currentTime.getMonth() !== postDate.getMonth()){//current year, but different month
    return months[postDate.getMonth()] + " " + postDate.getDate() + " at " + postDate.getHours() + ":" + m;
  }else if(currentTime.getDate() !== postDate.getDate()){//same year and month, but different date(1-31)
    return  Math.abs( currentTime.getDate() - postDate.getDate()) + " days ago" ;
  }else if(currentTime.getHours() !== postDate.getHours()){//same year,month,date
    return Math.abs(currentTime.getHours() - postDate.getHours()) + " hours ago";
  }else if(currentTime.getMinutes() !== postDate.getMinutes()){
    return Math.abs(currentTime.getMinutes() - postDate.getMinutes()) + " minutes ago";
  }else{
    return Math.abs(currentTime.getSeconds() - postDate.getSeconds()) + " seconds ago";
  }



  
  

}
function sortAnswerByDate(ans1, ans2){

  const a = new Date(ans1.ans_date_time);
  const b = new Date(ans2.ans_date_time);


    if(a.getFullYear() !== b.getFullYear()){
      if(a.getFullYear() > b.getFullYear()){
        return ans1;
      }
      return ans2;
    }else if(a.getMonth() !== b.getMonth()){
      if(a.getMonth() > b.getMonth()){
        return ans1;
      }return ans2;
    }else if(a.getDate() !== b.getDate()){
      if(a.getDate() > b.getDate()){
        return ans1;
      }return ans2;
      
    }else if(a.getHours() !== b.getHours()){
      if(a.getHours() > b.getHours()){
        return ans1;
      }return ans2;
    }else if(a.getMinutes() !== b.getHours()){
      if(a.getMinutes() > b.getHours()){
        return ans1;
      }return ans2;
    }if(a.getSeconds() > b.getSeconds()){
      return ans1;
    }return ans2;


}
function CommentsDisplay({comment}){
  const handleUpvote = async () =>{

    try{

    const votes = await axios.post(`http://localhost:8000/Answers/Comments/Upvote/${comment._id}`);
   
    window.location.reload();
    }catch(error){
      console.error('Error Upvoting:', error);
    }

  };
  const handleDownvote = () =>{

  alert('Downvotting is not allowed');
  };
  return(
      <>


<section>
  <div className="container">
      <div className="row">
          <div className="col-sm-5 col-md-6 col-12 pb-4">

              <div className="comment mt-4 text-justify float-left">
                  
              
                  
                  <br/>
                  <p className="comment-text color-b">{comment.text}
                  <span className="color-b"> - By {comment.comment_by}</span>
                 </p>
                 <span className="color-b d-white-space"> {comment.votes} votes</span>
                 <span className=" move-left">{showRelativeTime(comment.comment_date_time)}</span>
                  
                  
              </div>
          </div>

      </div>
      {userType === 'guest' ? '' : <VoteButtonForm onUpvote={handleUpvote} onDownvote={handleDownvote} showDownvote={false}/> }
  </div>
</section>
      
      
      </>
  );
}
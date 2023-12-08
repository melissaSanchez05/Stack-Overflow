
import axios from "axios";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import React,{  useEffect, useState } from "react";



export function AnswerContent({questionId}){
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
   
  useEffect(() => {
    axios.get('http://localhost:8000/Answers')
      .then(res => {
   
        setQuestions(res.data.questions);
        setAnswers(res.data.answers);
       
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 
       


  if (questions.length === 0 || answers.length === 0) {
    return <div>Loading...</div>;
  }

      return(

           <>
            {questionId === '' ? (<div className="question-no-found">Error</div> )
            : (<QuestionSummary questionId={questionId} questions={questions} answers={answers}/>)}
            </>

      );
}
//answer corresponds to the qs id triggered, which will be used to find the corresoing
//answers related to the current qs
function QuestionSummary({questionId, questions, answers}){

    const current_qs = questions.filter(qs => {
      return qs._id === questionId;
    });
    const current_answersId = current_qs.flatMap(qs => qs.answers)
    
   
    
       const current_related_ans =  answers.filter((ans)=>{return  current_answersId.includes(ans._id); })
      .sort(function(ans1,ans2){ return sortAnswerByDate(ans1, ans2);}).reverse();

            //update the data base
            
    const submitUpdate = async () => {
      try {
        const updatedViews = Number(current_qs.flatMap(qs => qs.views)) + 1;//updates the views
        const view =  {
         views: updatedViews,
          
        };
    
        const req = await axios.post(`http://localhost:8000/Questions/${questionId}`,view);
        console.log('response: ', req.data);
       
      
      } catch (error) {
        console.error('Error adding answer:', error);
      }
    };
     
    submitUpdate();
     
      
    return(
        <>
     <Button label ="Ask Question" className= "ask-question flush-right-button" to={`/AskQuestion`}/>
      {current_qs.length > 0 ? ( current_qs.map((qs)=> <QuesitonDisplay key={qs._id} question={qs}/>)) : (<div className="question-no-found">No Questions Found</div>)}
      {current_related_ans.length > 0 ? (current_related_ans.map((answer)=> <RelatedAnswers key={answer._id} answer={answer}/>))
      :(<div className="question-no-found">No Questions Found</div>)  }
      <Button label ="Answer Question" className= "ask-question flush-right-b" to={`/AnswerQuestion/${questionId}`}/>
      </>
    );
    
    
} 
function QuesitonDisplay({question}){
        return(
 
            <div className="answers-summmary post-summary">
            
            <QuestionMeta user={question.asked_by} date={question.asked_date_time}/>
          <QuestionStats answer={question.answers.length} views={question.views}/>
          
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
function QuestionMeta({user, date, userClassName = '', timeClassName = ''}){
      return(
        <div className="ans-summary-content-meta">
        <div className="ans-summary-content-meata-user"> 
        
          <span className= {`post-summary-stats-items user-meta ${userClassName}`}>{user} </span>
          
        </div>
        <div className="ans-summary-content-meata-user"> 
        
          <span className={`post-summary-stats-items time ${timeClassName}`}>{showRelativeTime(date)}</span>
          
        </div>
    
        </div>
      );
}
function QuestionStats({answer, views}){
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
    </div>
      );
}
function RelatedAnswers({answer}){
        return(
        
            <div className="undo_border">
              <QuestionMeta user={answer.ans_by} date={answer.ans_date_time} userClassName="d-color-g" timeClassName="clear-element"/>

            <div className="answers-summmary post-summary">
        
          <div className="post-summary-content ans-summary-content ">
            <h3 className="post-summary-content-meta-text-container post-summary-content-title color_B">{answer.text}</h3>

            </div>
          </div>
          
          </div>
          
          
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
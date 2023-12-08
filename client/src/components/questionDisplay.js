import React ,{useState, useEffect, useContext}from "react";
import Button from "./button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const tags_db= React.createContext();
const questions_db = React.createContext();
const answers_db  = React.createContext();

export function QuestionsContent({activeTab}){
   
    const [activeQuestionId, setActiveQuestionId] = useState(null);
    const [questions, setQuestions] = useState([])
    const [tags, setTags] = useState([])
    const [answers, setAnswers] = useState([])
    const navigate = useNavigate();

    const handleQuestionClick = (questionId) => {
      //setActiveQuestionId(questionId);
      //setButtonClicked(true);
      if(questionId !== null){
        navigate(`/Questions/Questions/${questionId}`);
      }
      
    };
    useEffect(() => {
        axios.get('http://localhost:8000/Questions')
          .then(res => {
            setQuestions(res.data.questions);
            setTags(res.data.tags);
            setAnswers(res.data.answers);
            
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []); 
      if (questions.length === 0 || answers.length === 0 || tags.length === 0) {
        return <div>Loading...</div>;
      }

  return(
    <answers_db.Provider value={answers}>   
    <questions_db.Provider value={questions}>
    <tags_db.Provider value={tags}>
    
    
         <DefaultDisplay  activeQuestionId={activeQuestionId} onQuestionClick={handleQuestionClick} activeTab={activeTab}/>
        
          </tags_db.Provider>
          </questions_db.Provider>
          </answers_db.Provider>
  );
}

function DefaultDisplay({  activeQuestionId, onQuestionClick, activeTab }){
    
    const [questionNumber, setQuestionNumber] = useState(0);
  

    

    const components = {
        Newest: <DisplayNewest  setQuestionNumber={setQuestionNumber} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick} />,
        Active: <DisplayActive setQuestionNumber={setQuestionNumber}activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>,
        Unanswered:<DisplayUnanswered setQuestionNumber={setQuestionNumber} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>,
    };


    
    return(
     <>     <div className="question-header">
             <span className="content-header-text">All Questions</span> 
           <Button label ="Ask Question" className= "ask-question" to={'/AskQuestion'} />
            <div className="main-nav-bar">
            <div className="question-num">{questionNumber}  Questions</div>

            <div className="question-selection-bar">
              <Button label = "Newest" className="question-button d-flex" to ={'/Questions/Newest'} />
              <Button label = "Active" className="question-button d-flex" to ={'/Questions/Active'}/>
              <Button label = "Unanswered" className="question-button d-flex" to ={'/Questions/Unanswered'}/>
              
            </div>
          </div>
          <div className="flush-left overflow-page">{components[activeTab]}</div>
          </div>
 </>
    );
}
function DisplayNewest({ setQuestionNumber,activeQuestionId, onQuestionClick }){
    const sortedQuestions = useContext(questions_db).sort((q1, q2) => {
        return sortQuestionsByDate(q1,q2);
     }).reverse();
    useEffect(()=>{
        setQuestionNumber(sortedQuestions.length);

    },[ sortedQuestions, setQuestionNumber]);

    return(
      
        <>
            {sortedQuestions.length > 0 ? (sortedQuestions.map((question) => <QuestionSummary key={question._id} question={question} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>))
            :( <div className="question-no-found">No Questions Found</div>)}
            
        </>

           );
        
}
function DisplayActive({ setQuestionNumber,activeQuestionId, onQuestionClick }){

    const qs_active = useContext(questions_db).filter((qs)=>{ return qs.answers.length > 0})
     .sort(function(q1,q2){

        const a = Most_recent_ansid(q1.answers);//most recent ans from qs
        const b = Most_recent_ansid(q2.answers);
        
        if(sortAnswerByDate(a,b) === a){
            
            return q1;
        }else{
            return q2;
        }
    
      }).reverse();
    
      useEffect(()=>{
        setQuestionNumber(qs_active.length);

    },[qs_active, setQuestionNumber]);
     

    return(
    <>
    { qs_active.length > 0 ? 
     (qs_active.map((question) =><QuestionSummary key={question._id} question={question} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>)) 
     : (<div className="question-no-found">No Questions Found</div>) }
    
    </>
    );

}
function DisplayUnanswered({ setQuestionNumber ,activeQuestionId, onQuestionClick }){
    console.log('active function: unanswered');
    const noAnswerQuestions = useContext(questions_db).filter((qs) => { return qs.answers.length === 0}).reverse();
    useEffect(()=>{
        setQuestionNumber(noAnswerQuestions.length);
    },[noAnswerQuestions, setQuestionNumber]);
    
    return(
    <>
        {(noAnswerQuestions.length > 0) ? 
        (noAnswerQuestions.map((quesiton) => <QuestionSummary key={quesiton._id} question={quesiton} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>))
        :(<div className="question-no-found">No Questions Found</div>)}
    
    </>);

}
function Get_tag_name(id){

    var tag = useContext(tags_db);
    for(const t of tag){
       if(t._id === id){
        return t.name;
       }
    }
    return 'tag not found'
  
}
function Most_recent_ansid(ansArr){

    var mostRecentAns = useContext(answers_db)
    .filter(function(ans){return ansArr.includes(ans._id);})
    .reduce((ans1, ans2) => { return sortAnswerByDate(ans1, ans2) });
  
    return mostRecentAns;
  
  
  
  
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
function sortQuestionsByDate(q1,q2){
    var a = new Date(q1.asked_date_time);
    var b = new Date(q2.asked_date_time);
    if(a.getFullYear() !== b.getFullYear()){
      if(a.getFullYear() > b.getFullYear()){
        return q1;
      }
      return q2;
    }else if(a.getMonth() !== b.getMonth()){
      if(a.getMonth() > b.getMonth()){
        return q1;
      }return q2;
    }else if(a.getDate() !== b.getDate()){
      if(a.getDate() > b.getDate()){
        return q1;
      }return q2;
      
    }else if(a.getHours() !== b.getHours()){
      if(a.getHours() > b.getHours()){
        return q1;
      }return q2;
    }else if(a.getMinutes() !== b.getHours()){
      if(a.getMinutes() > b.getHours()){
        return q1;
      }return q2;
    }if(a.getSeconds() > b.getSeconds()){
      return q1;
    }return q2;
}
function QuestionSummary({question , onQuestionClick}){
    const [activeButton, setActiveButton] = useState(null);
    const handleButton = (questionId) => {
        setActiveButton(questionId);
        onQuestionClick(questionId);
      };;

        return(
            <div className="post-summary">
              <QuestionSummaryDisplay ans={question.answers.length} views={question.views}/>
              <QuestionMeta date={question.asked_date_time} user={question.asked_by} id={question._id} title={question.title} tags={question.tags} onTitleClick={handleButton}/>

                   </div>
        );
}
function QuestionMeta({date,user,id,title,tags, onTitleClick}){
  return(
    <div className="post-summary-content">
    <div className="post-summary-content-meta">
      <time className="post-summary-content-meta-time post-summary-content-meta">   asked 
        <span className="time"> {showRelativeTime(date)}</span>
      </time>
      <div className="user-meta">{user}</div>
    </div>
    <h3 className="post-summary-content-title"> <div  className="post-link" onClick= {()=> onTitleClick(id)} >{title} </div>  </h3>
      <div className="post-summary-content-meta-container">
      {tags.map((tag) => (<Button key={tag} className="post-summary-content-meta-tags" label= {Get_tag_name(tag)} to={`/Tags/${Get_tag_name(tag)}`}/>))}
       
         </div>
         </div>
  );
}
function QuestionSummaryDisplay({ans, views}){
  return(
    <div className="post-summary-stats"> 
    <div className="post-summary-stats-items">
      <span className="post-summary-stats-items d-front-weight d-white-space">{ans}</span>
      <span className="post-summary-stats-items ">answers</span>
    </div>
    <div className="post-summary-stats-items">
      <span id ="views" className="post-summary-stats-items d-front-weight d-white-space">{views}</span>
      <span className="post-summary-stats-items ">views</span>
    </div>
</div>
  );
}

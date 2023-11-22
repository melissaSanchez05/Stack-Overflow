import React ,{useState, useEffect}from "react";
import { AnswerContent } from "./answerDisplay";
import {qs_sort_By_date, show_relative_time} from "./display"
import axios from "axios";
const answerModel = require('./models/answers')
const questionModel = require('./models/questions')
const tagsModel = require('./models/tags')
const meta_data = answerModel.find();

export function QuestionsContent(){
    const [activeQuestionId, setActiveQuestionId] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [qs_meta_data, set_meta_data] = useEffect([])
    const handleQuestionClick = (questionId) => {
      setActiveQuestionId(questionId);
      setButtonClicked(true);
      
    };

  return(
    
        <div className="question-header">
          {buttonClicked ? null : <span className="content-header-text">All Questions</span>  }
          {buttonClicked ? null :<Button label ="Ask Question" className= "ask-question"  />}
          {buttonClicked ?  <AnswerContent questionId={activeQuestionId} /> : <DefaultDisplay activeQuestionId={activeQuestionId} onQuestionClick={handleQuestionClick}/>}
          </div>
  );
}
function DefaultDisplay({ activeQuestionId, onQuestionClick }){
    const [activeButton, setActiveButton] = useState('Newest');
    const [questionNumber, setQuestionNumber] = useState(0);


    const handleButton = (label) => {
        //setActiveButton(label);
        if (label === activeButton) {
          // Clicking the same button again, temporarily set activeButton to null to force a re-render
          setActiveButton(null);
          setTimeout(() => setActiveButton(label), 0);
      } else {
          setActiveButton(label);
      }
        
      };
    const components = {
        Newest: <DisplayNewest setQuestionNumber={setQuestionNumber} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick} />,
        Active: <DisplayActive setQuestionNumber={setQuestionNumber}activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>,
        Unanswered:<DisplayUnanswered setQuestionNumber={setQuestionNumber} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>,
    };

    useEffect(() => {
        setQuestionNumber(meta_data.data.questions.length);
      }, [activeButton]);
    
    return(
     <>
            <div className="main-nav-bar">
            <div className="question-num">{questionNumber}  Questions</div>

            <div className="question-selection-bar">
              <Button label = "Newest" className="question-button d-flex" onClick= {()=> handleButton('Newest')} />
              <Button label = "Active" className="question-button d-flex" onClick= {()=> handleButton('Active')}/>
              <Button label = "Unanswered" className="question-button d-flex" onClick= {()=> handleButton('Unanswered')}/>
              
            </div>
          </div>
          <div className="flush-left overflow-page">
          {components[activeButton]}
            </div>
 </>
    );
}
function QuestionSummary({question , onQuestionClick}){
    const [activeButton, setActiveButton] = useState(null);
    const handleButton = (questionId) => {
        setActiveButton(questionId);
        onQuestionClick(questionId);
      };;

        return(
            <div id={question.qid} className="post-summary">
              <QuestionSummaryDisplay question={question.ansIds.length} views={question.views}/>
              <QuestionMeta date={question.askDate} user={question.askedBy} id={question.qid} title={question.title} tags={question.tagIds} onTitleClick={handleButton}/>

                   </div>
        );
}
function QuestionMeta({date,user,id,title,tags, onTitleClick}){
  return(
    <div className="post-summary-content">
    <div className="post-summary-content-meta">
      <time className="post-summary-content-meta-time post-summary-content-meta">   asked 
        <span className="time"> {show_relative_time(date)}</span>
      </time>
      <div className="user-meta">{user}</div>
    </div>
    <h3 className="post-summary-content-title"> <div  className="post-link" onClick= {()=> onTitleClick(id)} >{title} </div>  </h3>
      <div className="post-summary-content-meta-container">
      {tags.map((tag) => (<Button key={tag} className="post-summary-content-meta-tags" label= {get_tag_name(tag)}/>))}
       
         </div>
         </div>
  );
}
function QuestionSummaryDisplay({question, views}){
  return(
    <div className="post-summary-stats"> 
    <div className="post-summary-stats-items">
      <span className="post-summary-stats-items d-front-weight d-white-space">{question}</span>
      <span className="post-summary-stats-items ">answers</span>
    </div>
    <div className="post-summary-stats-items">
      <span id ="views" className="post-summary-stats-items d-front-weight d-white-space">{views}</span>
      <span className="post-summary-stats-items ">views</span>
    </div>
</div>
  );
}
function DisplayNewest({ setQuestionNumber,activeQuestionId, onQuestionClick }){

    const qs_sorted_by_date = meta_data.data.questions.sort(function(q1,q2){
        return qs_sort_By_date(q1.askDate, q2.askDate);
          
  
    }).reverse();

    setQuestionNumber(qs_sorted_by_date.length);

    return(
        <>
            {qs_sorted_by_date.length > 0 && (qs_sorted_by_date.map((question) => <QuestionSummary key={question.qid} question={question} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>))}
             <div className="question-no-found">No Questions Found</div>
        </>

           );
}
function DisplayActive({ setQuestionNumber,activeQuestionId, onQuestionClick }){
    const qs_active = meta_data.data.questions.filter(function(q1){return q1.ansIds.length > 0}).sort(function(q1,q2){

        const a = most_recent_ansid(q1.ansIds).ansDate;
        const b = most_recent_ansid(q2.ansIds).ansDate;

        return qs_sort_By_date(a,b);
      
      });
      setQuestionNumber(qs_active.length);

    return(<>
    { qs_active.length > 0 &&  (qs_active.map((question) =><QuestionSummary key={question.ansIds} question={question} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>))}
    <div className="question-no-found">No Questions Found</div>
    </>);

}
function DisplayUnanswered({ setQuestionNumber ,activeQuestionId, onQuestionClick }){
    const qs_filtered_by_noAnswer = meta_data.data.questions.filter(function(qs){ return qs.ansIds.length === 0;});
    setQuestionNumber(qs_filtered_by_noAnswer.length);
    return(
    <>
        {qs_filtered_by_noAnswer.length > 0 && (qs_filtered_by_noAnswer.map((quesiton) => <QuestionSummary key={quesiton.ansIds} question={quesiton} activeQuestionId={activeQuestionId} onQuestionClick={onQuestionClick}/>)) }
        <div className="question-no-found">No Questions Found</div>
    </>);

}
function get_tag_name(id){
    const meta_data = new Model();
    const tags = meta_data.data.tags;
    for(const t of tags){
       if(t.tid === id){
        return t.name;
       }
    }
    return 'tag not found'
  
}
function most_recent_ansid(ansArr){

    const ans_in_ansArr = meta_data.data.answers.filter(function(ans){return ansArr.includes(ans.aid);});
    const sortans_in_ansArr = ans_in_ansArr.reduce(function(ans1, ans2){
  
      const a = ans1.ansDate;
      const b = ans2.ansDate;
  
  
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
  
  
    });
  
    return sortans_in_ansArr;
  
  
  
  
}

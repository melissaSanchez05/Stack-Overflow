import axios from "axios";
import React, { useState, useEffect , useContext} from "react";
import { useNavigate } from 'react-router-dom';
import Button from "./button";

const tags_db = React.createContext();
const questions_db = React.createContext();
const userType = sessionStorage.getItem('userType')
export function TagRelatedQuestions({tag_name}){
   const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState({});
    const [activeQuestionId, setActiveQuestionId] = useState(null);



    useEffect(() => {

        const fetchData = async () => {
          try {
           
            const res = await axios.get('http://localhost:8000/Tags/selected');
            setQuestions(res.data.questions);
            setTags(res.data.tags);
      
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
        fetchData();
      }, []);

      
      const onQuestionClick = (questionId) => {
  
        if(questionId !== null){
          navigate(`/Questions/Tags/${questionId}`);
        }
        
      };
      if (questions.length === 0 || tags.length === 0) {
        return <div>Loading...</div>;
      }
 
const relatedQs =  RelatedQuestions(questions, tags,tag_name);

    return(
    <questions_db.Provider value={questions}>
    <tags_db.Provider value ={tags}>
        <>
        
            <div className="related-tag-header">
            <div className="tag-header-text-question">{relatedQs.length}  Questions Related to Tag : {tag_name}</div>
            {userType === 'guest' ? <Button label ="LogIn" className= "ask-question move-right" to={'/'} /> 
           : <Button label ="Ask Question" className= "ask-question move-right"  to={'/AskQuestion'} />}
           {userType === 'guest' ? '' : <Button label ="LogOut" className= "ask-question move-right logout-color" to={'/LogOut'} />}
            </div>
            <div className="flush-left overflow-page bottom-space">
        {relatedQs.length > 0 ? ( relatedQs.map(qs => < QuestionSummary key={qs._id} question={qs} onQuestionClick={onQuestionClick}/>))
        :(<div className="question-no-found">No Questions Found</div>)}</div>
        
        </>
                          
    </tags_db.Provider>
    </questions_db.Provider>

    );
}
function RelatedQuestions(questions, tags, tag_name){
    const question = questions;

  
    let related = [];
    question.forEach(qs => {
        qs.tags.forEach(tag =>{
          if(TagMatch(tag, tag_name, tags)){
            related.push(qs);
          }
        });
  
      
    });
    return related.reverse();
}
function TagMatch(tagId, tag_name, tags){
    const tag = tags;

    for(const t of tag){
    
      if(t._id === tagId && t.name === tag_name){
      return true;}
    }
     return false;

}
function QuestionSummary({question , onQuestionClick}){
    const [activeButton, setActiveButton] = useState(null);
    const handleButton = (questionId) => {
        setActiveButton(questionId);
        onQuestionClick(questionId);
      };;

        return(
            <div className="post-summary">
              <QuestionSummaryDisplay ans={question.answers.length} views={question.views} votes={question.votes}/>
              <QuestionMeta date={question.asked_date_time} user={question.asked_by} id={question._id} title={question.title} tags={question.tags} onQuestionClick={handleButton}/>

                   </div>
        );
}
function QuestionMeta({date,user,id,title,tags, onQuestionClick}){
    return(
      <div className="post-summary-content">
      <div className="post-summary-content-meta">
        <time className="post-summary-content-meta-time post-summary-content-meta">   asked 
          <span className="time"> {showRelativeTime(date)}</span>
        </time>
        <div className="user-meta">{user}</div>
      </div>
      <h3 className="post-summary-content-title"> <div  className="post-link" onClick= {()=> onQuestionClick(id)} >{title} </div>  </h3>
        <div className="post-summary-content-meta-container">
        {tags.map((tag) => (<Button key={tag} className="post-summary-content-meta-tags" label= {Get_tag_name(tag)} to={`/Tags/${Get_tag_name(tag)}`}/>))}
         
           </div>
           </div>
    );
  }
function QuestionSummaryDisplay({ans, views, votes}){
    return(
      <div className="post-summary-stats"> 
            <div className="post-summary-stats-items">
        <span id ="views" className="post-summary-stats-items d-front-weight d-white-space">{votes}</span>
        <span className="post-summary-stats-items ">votes</span>
      </div>
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
function Get_tag_name(id){

    var tag = useContext(tags_db);
    for(const t of tag){
       if(t._id === id){
        return t.name;
       }
    }
    return 'tag not found'
  
}
import axios from "axios";
import React, { useState, useEffect , useContext} from "react";
import Button from "./button";

const tags_db = React.createContext();
const questions_db = React.createContext();

export function TagRelatedQuestions({tag_name}){
    console.log('tag name ', tag_name);
    const [questions, setQuestions] = useState([]);
    const [tags, setTags] = useState({});
    const [activeQuestionId, setActiveQuestionId] = useState(null);

    const onQuestionClick = (questionId) => {
        setActiveQuestionId(questionId);}

    useEffect(() => {
        axios.get('http://localhost:8000/Tags/selected')
          .then(res => {
         
            setQuestions(res.data.questions);
           
            setTags(res.data.tags);

            
            
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []); 
const relatedQs =  RelatedQuestions(questions, tags,tag_name);

    return(
    <questions_db.Provider value={questions}>
    <tags_db.Provider value ={tags}>
        <>
        
            <div className="main-nav-bar">
            <div className="question-num">{relatedQs.length}  Questions Related to Tag : {tag_name}</div>
            
            </div>
            <div className="flush-left overflow-page">
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
    return related;
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
        {tags.map((tag) => (<Button key={tag} className="post-summary-content-meta-tags" label= {Get_tag_name(tag)}/>))}
         
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
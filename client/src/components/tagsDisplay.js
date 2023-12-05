import React, { useContext, useState , useEffect} from 'react';
import axios from "axios";
import Button from './button';
import { Navigate, useNavigate } from 'react-router-dom';
const tags_db = React.createContext();
const questions_db = React.createContext();

export function TagContent() {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get('http://localhost:8000/Tags')
      .then(res => {
     
        setQuestions(res.data.questions);
        setTags(res.data.tags);
        
        
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 


  const uniqueTags = Array.from(new Set(tags.map(tag => tag.name.toLowerCase())))
                     .map(lowerCaseName => tags.find(tag => tag.name.toLowerCase() === lowerCaseName));



 const [activeTag, setActiveTag] = useState(null);

 

 useEffect(() => {
  if (activeTag !== null) {
    navigate(`/Tags/${activeTag}`);
  }
}, [activeTag]);





  return (
    <questions_db.Provider value={questions}>
    <tags_db.Provider value ={tags}>
    <div className='tagSection'>
      <div className="tag-header">
        <span className="tag-header-text">{uniqueTags.length} tags </span>
        <span className="tag-header-text">All Tags</span>
        <Button label="Ask Question" className="ask-question"/>
      </div>
      <div className="tags_container"> 
      {uniqueTags.length > 0 ? (uniqueTags.map((tag) => <DisplayTags key={tag._id} tag={tag} setActiveTag={setActiveTag} />)) 
      : (<div className="question-no-found">No Questions Found</div>)}
      </div>
    </div>
    </tags_db.Provider>
    </questions_db.Provider>
  );
}

function DisplayTags({tag, setActiveTag}){

      const tagCount = TagOccurenceInQuestions(tag.name);
      const tagCountText = tagCount === 1 ? 'question' : 'questions';

      return(
        <div className="tags_container_element" key={tag._id}>
          <div className="tag_name link-lookalike" onClick={() => setActiveTag(tag.name)}>
            {tag.name}
          </div>
          <div className="tag-count">
            {tagCount} {tagCountText}
          </div>
        </div>
      );
}
function TagOccurenceInQuestions(tag_name) {
//how many questions are related to this tag name
//iterate
  const questions = useContext(questions_db);
  
  let count = 0;
  questions.forEach(qs => {
      qs.tags.forEach(tag =>{
        if(TagIdMatch(tag, tag_name)){
          count++;
        }
      });

    
  });

  return count;
  //how many times does the tag id appeaars in all questions
}
function TagIdMatch( tagId, tag_name){
  const tags = useContext(tags_db);

  for(const tag of tags){
  
    if(tag._id === tagId && tag.name === tag_name){
    return true;}
  }
   return false;

}
function DisplayRelatedQuestions({question}){
    return(
        <div id={question._id} className="post-summary">
      
        <div className="post-summary-stats"> 
            <div className="post-summary-stats-items">
              <span className="post-summary-stats-items d-front-weight d-white-space">{question.answers.length}</span>
              <span className="post-summary-stats-items ">answers</span>
            </div>
            <div className="post-summary-stats-items">
              <span id ="views" className="post-summary-stats-items d-front-weight d-white-space">{question.views}</span>
              <span className="post-summary-stats-items ">views</span>
            </div>
        </div>
        <div className="post-summary-content">
          <div className="post-summary-content-meta">
            <time className="post-summary-content-meta-time post-summary-content-meta">   asked 
              <span className="time"> {showRelativeTime(question.asked_date_time)}</span>
            </time>
            <div className="user-meta">{question.asked_by}</div>
          </div>
          <h3 className="post-summary-content-title"> <div  className="post-link" >{question.title} </div>  </h3>
            <div className="post-summary-content-meta-container">
            {question.tags.map((tag) => (<Button key={tag} className="post-summary-content-meta-tags" label= {Get_tag_name(tag)}/>))}
             
               </div>
               </div>
               </div>
    );

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

    
    

    
    
    


import React, { useContext, useState , useEffect} from 'react';
import axios from "axios";
import Button from './button';
import { Navigate, useNavigate } from 'react-router-dom';
const tags_db = React.createContext();
const questions_db = React.createContext();
const userType = sessionStorage.getItem('userType');

export function TagContent() {
  const [questions, setQuestions] = useState([]);
  const [tags, setTags] = useState([]);
  const [activeTag, setActiveTag] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {

    const fetchData = async () => {
      try {
       
        const res = await axios.get('http://localhost:8000/Tags');
        setQuestions(res.data.questions);
        setTags(res.data.tags);
  
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);



  
 useEffect(() => {
  if (activeTag !== null) {
    navigate(`/Tags/${activeTag}`);
  }
}, [activeTag]);
  if (questions.length === 0 || tags.length === 0) {
    return <div>Loading...</div>;
  }
  const uniqueTags = Array.from(new Set(tags.map(tag => tag.name.toLowerCase())))
                     .map(lowerCaseName => tags.find(tag => tag.name.toLowerCase() === lowerCaseName));



 

 






  return (
    <questions_db.Provider value={questions}>
    <tags_db.Provider value ={tags}>
    <div className='tagSection'>
      <div className="tag-header">
        <span className="tag-header-text">{uniqueTags.length} tags </span>
        <span className="tag-header-text">All Tags</span>
        {userType === 'guest' ? '' : <Button label ="LogOut" className= "ask-question move-left logout-color" to={'/LogOut'} />}
        {userType === 'guest' ? <Button label ="LogIn" className= "ask-question move-left" to={'/'} /> : ''}
       
      </div>
      <div className="tags_container overflow-page"> 

      {uniqueTags.length > 0 ? (uniqueTags.map((tag) => <DisplayTags key={tag._id} tag={tag} setActiveTag={setActiveTag} />)) 
      : (<div className="question-no-found">No Results Found</div>)}
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



    
    

    
    
    


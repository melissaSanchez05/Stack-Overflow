import Button from "./button";
import axios from "axios";
import React ,{useState, useEffect}from "react";
import { useNavigate } from "react-router-dom";
const userType = sessionStorage.getItem('userType');
const username = sessionStorage.getItem('username');


export function CommentsForm({answerId}){

    const [commentText, setCommentText] = useState('');

    const navigate = useNavigate()



      
      const validateForm = () => {
        if (!commentText.trim()) {
          alert('Please enter a username and answer text');

        }
        return true;
      };

  
   
  //Add question to the data base 
  const handleSubmit = async () => {
    try {

      const comment =  {
        text: commentText,
        comment_by: username,
      };
    
      const req = await axios.post(`http://localhost:8000/Answers/AddComment/${answerId}/${username}`,comment);
      if(req.data === 'fail'){
        alert('Not able to add comment');
      }
      navigate('/Questions/Newest');
      //console.log('Answer added', req.data);
       
  
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };
  
    return (

      <div className="form-container">
 
  
        <div className="input-div">
          <span className="input-descriptor">Comment Text</span>
          <span className="input-field-descript">Add text</span>
          <textarea
            className="input-question-text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <span className="error" id="question-text-error"></span>
        </div>
  
        
       
  
       <Button label="Post comment"className="ask-question" onClick={handleSubmit} />
        
  
      </div>
    );
}

export default CommentsForm;
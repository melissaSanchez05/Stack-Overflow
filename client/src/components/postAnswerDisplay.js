import Button from "./button";
import axios from "axios";
import React ,{useState, useEffect}from "react";
import { useNavigate } from "react-router-dom";




export function AnswerQuestionForm({questionId}) {
    const [username, setAnswerUsername] = useState('');
    const [answerText, setAnswerText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:8000/AnswerQuestion')
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
      
      const validateForm = () => {
        if (!username.trim() || !answerText.trim()) {
          console.error('Please enter a username and answer text');
          return false;
        }
        return true;
      };

  
   
  //Add question to the data base 
  const handleSubmit = async () => {
    try {

      
      const answer =  {
        text: answerText,
        ans_by: username,
      };
    
      const req = await axios.post(`http://localhost:8000/AnswerQuestion/${questionId}`,answer);
    
      navigate('/Questions/Newest');
      //console.log('Answer added', req.data);
       
  
    } catch (error) {
      console.error('Error adding answer:', error);
    }
  };
  
    return (

      <div className="form-container">
        <div className="input-div">
          <span className="input-descriptor">Username*</span>
          <span className="input-field-descript">Limit username to 100 characters or less</span>
          <input
            className="input-question-title"
            type="text"
            value={username}
            onChange={(e) => setAnswerUsername(e.target.value)}
          />
          <span className="error" id="question-title-error"></span>
        </div>
  
        <div className="input-div">
          <span className="input-descriptor">Answer Text</span>
          <span className="input-field-descript">Add text</span>
          <textarea
            className="input-question-text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></textarea>
          <span className="error" id="question-text-error"></span>
        </div>
  
        
       
  
        <Button label="Post Answer"className="ask-question" onClick={handleSubmit}  >
        
        </Button>
      </div>
    );
  }


  


function linkAnswerToQuestion({questionId, questions, user, text}){
  
   





}
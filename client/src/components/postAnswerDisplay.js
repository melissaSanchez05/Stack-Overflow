import Button from "./button";
import axios from "axios";
import React ,{useState, useEffect}from "react";
import { useNavigate } from "react-router-dom";
const userType = sessionStorage.getItem('userType');
const username = sessionStorage.getItem('username');

export function AnswerQuestionForm({questionId}) {
   
    const [answerText, setAnswerText] = useState('');
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

      const fetchData = async () => {
        try {
         
          const res = await axios.get('http://localhost:8000/AnswerQuestion');
          setQuestions(res.data.questions);
          setAnswers(res.data.answers);
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
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
          <span className="input-descriptor">Answer Text</span>
          <span className="input-field-descript">Add text</span>
          <textarea
            className="input-question-text"
            value={answerText}
            onChange={(e) => setAnswerText(e.target.value)}
          ></textarea>
          <span className="error" id="question-text-error"></span>
        </div>
  
        
       
  
        {userType === 'guest'? '' : <Button label="Post Answer"className="ask-question" onClick={handleSubmit} />}
        
  
      </div>
    );
  }


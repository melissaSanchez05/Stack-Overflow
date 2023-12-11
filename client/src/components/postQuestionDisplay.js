import Button from "./button";
import axios from "axios";
import React ,{useState, useEffect}from "react";
import { useNavigate } from "react-router-dom";

const username = sessionStorage.getItem('username');

export function AskQuestionForm() {
    const [questionTitle, setQuestionTitle] = useState('');
    const [questionText, setQuestionText] = useState('');
    const [questionTags, setQuestionTags] = useState('');

    const [questions, setQuestions] = useState([])
    const navigate = useNavigate()
    useEffect(() => {

      const fetchData = async () => {
        try {
         
          const res = await  axios.get('http://localhost:8000/Questions');
          setQuestions(res.data.questions);
          
    
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
    
      if (questions.length === 0 ) {
        return <div>Loading...</div>;
      }

   
  //Add question to the data base
    const handleSubmit = async () => {
      
        try{
        const newQuestion = {
         
          title: questionTitle,
          text: questionText,
          tags: questionTags.split(' '),
          asked_by: username,
        };
        
       
        const req = await axios.post(`http://localhost:8000/Questions/AddQuestion`, newQuestion);
         if(req.data === 'fail'){
          alert('Question was unable to be added.')
         }
        window.history.back();

      }catch(err){
        console.error('Error creating question:', err);
      }

  
      
    };
  
    return (
      <div className="form-container">
        <div className="input-div">
          <span className="input-descriptor">Question Title*</span>
          <span className="input-field-descript">Limit title to 50 characters or less</span>
          <input
            className="input-question-title"
            type="text"
            value={questionTitle}
            onChange={(e) => setQuestionTitle(e.target.value)}
          />
          <span className="error" id="question-title-error"></span>
        </div>
  
        <div className="input-div">
          <span className="input-descriptor">Question Text*</span>
          <span className="input-field-descript">Add details</span>
          <textarea
            className="input-question-text"
            type="text"
            value={questionText}
            onChange={(e) => setQuestionText(e.target.value)}
          ></textarea>
          <span className="error" id="question-text-error"></span>
        </div>
  
        <div className="input-div">
          <span className="input-descriptor">Tags*</span>
          <span className="input-field-descript">Add keywords separated by whitespace</span>
          <input
            className="input-question-tags"
            type="text"
            value={questionTags}
            onChange={(e) => setQuestionTags(e.target.value)}
          />
          <span className="error" id="question-tags-error"></span>
        </div>
  

  
        <Button label="Post Question"className="ask-question" onClick={handleSubmit} ></Button>
      </div>
    );
  }
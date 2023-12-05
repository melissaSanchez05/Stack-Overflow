import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DataTesting() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000')
      .then(res => {
        setQuestions(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  return (
    <ol>
      {questions.map(function(question) {
        return (<li key={question._id}>{question.name}</li>);
      })}
    </ol>
  );
}

export default DataTesting;
const express = require('express')
const router = express.Router()
const path = require('path')
const answerModel = require('../models/answers')
const questionModel = require('../models/questions')


router.get('/', async (req,res, )=> {
    try{
    const [questions,answers] = await Promise.all([
        questionModel.find(), answerModel.find(),]);
        res.json({questions, answers})
    
    }catch(err){console.log(err)}
} );

router.post('/:questionId', async (req, res) => {
    const { text, ans_by } = req.body;
    const {questionId} = req.params;
    
    

  
    try {
        if (!text || !ans_by) {
            return res.status(400).json({ error: 'Invalid data: text and ans_by are required' });
          }
        
        
        // Create a new answer instance
        const answer = new answerModel({
          text : text,
          ans_by : ans_by,
      
           
        });

        const savedAnswer = await answer.save();
        const qsAnswered = await questionModel.findByIdAndUpdate(
            questionId,
            { $push : { answers : savedAnswer._id} },
            {new : true}
        );
        
        res.json({ message: 'Answer added and linked successfully' });
        
    
      } catch (error) {
        console.error('Error adding answer:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding answer' });
      } 
    
  });
  
  module.exports = router;
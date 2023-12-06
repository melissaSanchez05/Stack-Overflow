const express = require('express')
const router = express.Router()
const answerModel = require('../models/answers')
const questionModel = require('../models/questions')


router.get('/', async (req,res)=> {
    try{
    const [questions,answers] = await Promise.all([
        questionModel.find(), answerModel.find(),]);
        res.json({questions, answers})
    }catch(err){console.log(err)}
} )
/*
router.put('/:questionId', async (req, res) => {
    try {
      const questionId = req.params.questionId;
      const updatedViews = req.body.views;
  
      // Find the question by ID and update the views
      const updatedQuestion = await questionModel.findByIdAndUpdate(
        questionId,
        { views: updatedViews },
        { new: true } // Return the updated document
      );
  
      if (!updatedQuestion) {
        return res.status(404).json({ error: 'Question not found' });
      }
  
      res.json(updatedQuestion);
    } catch (error) {
      console.error('Error updating question:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });*/
module.exports = router
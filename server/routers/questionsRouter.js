const express = require('express')
const router = express.Router()
const path = require('path')
const answerModel = require('../models/answers')
const questionModel = require('../models/questions')
const tagsModel = require('../models/tags')


router.get('/:tab', async (req,res, next)=> {
   const {tab} = req.params;

   try{
    let questions;
    let tags;
    let answers;
    if(tab === 'Newest' || tab === 'Active' || tab === 'Unanswered' ){
        [questions, tags, answers] = await Promise.all( [
            questionModel.find(),
            tagsModel.find(),
            answerModel.find(),
             ]);
    }else{
        return next();
    }
    res.json({questions, tags, answers});
   }catch(err){
    console.error(err);
    res.status(500).json({erro: 'Internal server error'});
   }
    
})
router.get('/', async (req,res)=> {
    try{
    const [questions, tags, answers] = await Promise.all([
        questionModel.find(), tagsModel.find(), answerModel.find(),]);
        res.json({questions,tags, answers})
    }catch(err){console.log(err)}
} )

router.post('/AddQuestion', async (req, res) =>{
        const {title, text, tags, asked_by} = req.body;
        
        if (!title || !text || !tags || !asked_by) {
            return res.status(400).json({ error: 'Invalid data: text and ans_by are required' });
          }
        try{

              

            const tagArray = await Promise.all(
                tags.map(async (tag) => {
                  const existingTag = await tagsModel.findOne({ name: tag });
          
                  if (existingTag) {
                    return existingTag._id;
                  } else {
                    const newTag = new tagsModel({ name: tag });
                    const saveTag = await newTag.save();
                    return saveTag._id;
                  }
                })
              );
                

              const question = new questionModel({
                title : title,
                text : text,
                tags : tagArray,
                asked_by : asked_by,

              }) 
              const savedQuestion = await question.save();
              
              
              res.json({ message: 'question created and added successfully' });
        }catch(error){
            console.error('Error adding a Question:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding ans answer' });
        }
});
router.post('/:questionId', async (req, res) => {
    const { views } = req.body;
    const {questionId} = req.params;
    
    

  
    try {
        /*
        if (!updatedViews || !questionId) {
            return res.status(400).json({ error: 'Invalid data: questionId and updatedVeiws required' });
          }*/
        //find the question by id
      
      
        const updateQuestion = await questionModel.findByIdAndUpdate(
            questionId,
            {views : views}, 
            {new : true}
        );
        

    
       if(!updateQuestion){
        return res.status(404).json({ error: 'Question not found' });
       }
       
        res.json(updateQuestion);
        
    
      } catch (error) {
        console.error('Error updating Question:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a question' });
      } 
    
  });


module.exports = router
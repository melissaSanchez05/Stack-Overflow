const express = require('express')
const router = express.Router()
const path = require('path')
const answerModel = require('../models/answers')
const questionModel = require('../models/questions')
const tagsModel = require('../models/tags')
const userModel = require('../models/users')
const commentModel = require('../models/comments')
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
            if(title.length > 50 || text.length > 140){
                return res.send('fail')
            }
              
            const user = await userModel.findOne({username : asked_by});
            if(!user){
                return res.send('fail');
            }
            const tagArray = await Promise.all(
                tags.map(async (tag) => {
                  const existingTag = await tagsModel.findOne({ name: tag });
          
                  if (existingTag) {
                   
                    return existingTag._id;
                  } else if(user.reputation >= 50) {
                  
                    const newTag = new tagsModel({ name: tag });
                    const saveTag = await newTag.save();
                    return saveTag._id;
                  }
                  
                  
                })
              );
              const filteredTagArray = tagArray.filter((tagId) => tagId !== undefined);
      
              const question = new questionModel({
                title : title,
                text : text,
                tags : filteredTagArray,
                asked_by : asked_by,

              }) 
              const savedQuestion = await question.save();
              //update the user's question count
              const userUpdate = await userModel.findByIdAndUpdate( 
                user._id,
                { $inc: {qs_asked : 1}}, 
                {new : true}
              );
              console.log('user: ', userUpdate);
              if(!userUpdate){
                return res.status(400).json({ error: 'Not able to update user' });
              }
              
              res.json({ message: 'Question created and added successfully' });
        }catch(error){
            console.error('Error adding a Question:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding ans answer' });
        }
});
router.post('/:questionId', async (req, res) => {
   
    const {questionId} = req.params;
    
    

  
    try {
   
        const updateQuestion = await questionModel.findByIdAndUpdate(
            questionId,
            { $inc: {views : 0.5}}, 
            {new : true}
        );
        

            
       if(!updateQuestion){
        return res.status(404).json({ error: 'Question not found' });
       }
       
        res.send('Question updated');
        
    
      } catch (error) {
        console.error('Error updating Question:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a question' });
      } 
    
  });

router.post('/Upvote/:questionId/:username', async (req, res) => {
   
    const {questionId, username} = req.params;
    
    

  
    try {
        //The votes must have 50 or more repuation points to vote
                const existingVoter = await userModel.findOne({username : username});
                if(!existingVoter){
                    return res.status(404).json({ error: 'Voter not found' });
                }
                if(existingVoter.reputation < 50){
                    return res.send('reputation')
                }
        //user has enough reputation points to vote
                const existingQuestion = await questionModel.findById(questionId);
                if(!existingQuestion){
                    return res.status(404).json({ error: 'Question not found' });
                }
                //increase the question's vote i
                const updateQuestion = await questionModel.findByIdAndUpdate(
                    existingQuestion._id,
                    { $inc: {votes : 1}}, 
                    {new : true}
                );
                if(!updateQuestion){
                    return res.status(404).json({ error: 'Question could not be updated' });
                }
                const existingUser =  await userModel.findOne({  username : existingQuestion.asked_by} );
                //increase the user's reputation
                if(existingUser ){
                    const updateUserReputation = await answerModel.findByIdAndUpdate(
                        existingUser._id,
                        { $inc : {reputation : 5}},
                        {new : true}
                    );
                    }

       
        res.send('Question votes updated');
        
    
      } catch (error) {
        console.error('Error updating Question by upvoting:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a question' });
      } 
    
});
router.post('/Downvote/:questionId', async (req, res) => {
   
    const {questionId} = req.params;
    
    

  
    try {
        
        const existingQuestion = await questionModel.findById(questionId);
        if(!existingQuestion){
            return res.status(404).json({ error: 'Question not found' });
           }
           
        const updateQuestion = await questionModel.findByIdAndUpdate(
            questionId,
            { $inc: { votes: existingQuestion.votes > 0 ? -1 : 0 } }, 
            {new : true}
        );
        if(!updateQuestion){
            return res.status(404).json({ error: 'Question could not be updated' });
           }
        //find the user who asked the question to decrease the reputation
        const existingUser= await userModel.findOne({username : existingQuestion.asked_by} );
        if(existingUser){
 
        //decrease the user's reputation by 10  
        const updateUserReputation = await userModel.findByIdAndUpdate(
             existingUser._id, 
             {$inc : { reputation : existingUser.reputation > 10 ? -10 : 0}},
             {new : true}
         ); 
         if(!updateUserReputation){
            return res.status(404).json({ error: 'user not found' });
           }
           }
       
        
       
        res.send('Question votes updated');
        
    
      } catch (error) {
        console.error('Error updating Question by downvoting:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a question' });
      } 
    
});
module.exports = router
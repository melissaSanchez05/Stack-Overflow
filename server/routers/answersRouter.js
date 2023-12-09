const express = require('express')
const router = express.Router()
const answerModel = require('../models/answers')
const questionModel = require('../models/questions')
const userModel = require('../models/users')

router.get('/', async (req,res)=> {
    try{
    const [questions,answers] = await Promise.all([
        questionModel.find(), answerModel.find(),]);
        res.json({questions, answers})
    }catch(err){console.log(err)}
} );
router.post('/Upvote/:answerId/:username', async (req, res) => {
   
    const {answerId, username} = req.params;
    
    

  
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
            const existingAnswer = await answerModel.findById(answerId);
            if(!existingAnswer){
                return res.status(404).json({ error: 'Answer not found' });
            }
        //increase the question's vote 1
            const updateAnswer = await answerModel.findByIdAndUpdate(
                existingAnswer._id,
                { $inc: {votes : 1}}, 
                {new : true}
            );
            if(!updateAnswer){
                return res.status(404).json({ error: 'Answer could not be updated' });
            }

            const existingUser =  await userModel.findOne({  username : existingAnswer.ans_by} );
            //increase the user's reputation
            if(existingUser ){
                const updateUserReputation = await answerModel.findByIdAndUpdate(
                    existingUser._id,
                    { $inc : {reputation : 5}},
                    {new : true}
                );
                }


   
        res.send('Answer votes and reputation updated');
        
    
      } catch(error) {
        console.error('Error updating Answer by upvoting:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a Answer' });
      } 
    
});
router.post('/Downvote/:answerId', async (req, res) => {
   
    const {answerId} = req.params;
    
    

  
    try {
        const existingAnswer = await answerModel.findById(answerId);
        if(!existingAnswer){
            return res.status(404).json({ error: 'Answer not found' });
           }
           
        const updateAnswer = await answerModel.findByIdAndUpdate(
            answerId,
            { $inc: { votes: existingAnswer.votes > 0 ? -1 : 0 } }, 
            {new : true}
        );
         
            
       if(!updateAnswer){
        return res.status(404).json({ error: 'Answer could not be updated' });
       }

        //find the user who asked the question to decrease the reputation
        const existingUser= await userModel.findOne({username : existingAnswer.ans_by} );
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
       
    
        res.send('Answer votes updated');
        
         
      } catch (error) {
        console.error('Error updating Answer by downvoting:', error); 
        res.status(500).json({ error: 'Internal Server Error in updating a answer' });
      } 
    
});

module.exports = router
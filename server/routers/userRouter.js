const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/users')
const questionModel= require('../models/questions')

router.post('/', async (req, res) => {
    const { username, email, password, pConfirmation} = req.body;
    


  
    try {
        if (!username || !email || !password || !pConfirmation) {
            return res.status(400).json({ error: 'Invalid data: username, password, email or confirmation password' });
          }

          //username in use
            const userExist = await userModel.findOne({ username : username});
            console.log('exist: ', userExist);
            if(userExist){
                
                return res.send('user');
            }
            //user has an accout already
            const emailExist = await userModel.findOne({ email : email});
            if(emailExist){
                return res.send('member');
            }
            //weak pasw
            if (password.length < 8 || !password.match(pConfirmation)) {
                return res.send('psw');
              }
              
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    
            if (!password.match(passwordRegex)) {
                return res.send('psw');
            }
              const saltRounds = 10;
              const hashedPassword = await bcrypt.hash(password, saltRounds);
            
            const user = new userModel ({
                username : username,
                email : email,
                password : hashedPassword,
            });
            const saveUser = await user.save();
        
        
        res.send('new user created');
        
    
      } catch (error) {
        console.error('Error adding answer:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding answer' });
      } 
    
  });
  router.post('/:username', async (req, res) => {
    const { username} = req.params;
    


  
    try {
        if (!username ) {
            return res.status(400).json({ error: 'Invalid ' });
          }

        
        res.send('new user created');
        
    
      } catch (error) {
        console.error('Error adding answer:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding answer' });
      } 
    
  });
router.get('/', async (req,res, next)=> {
    try{
        const [users, questions] = await Promise.all([
            userModel.find(), questionModel.find()]);
            res.json({users, questions})
        }catch(err){console.log(err)}

} );


router.post('/UserDelete', async (req, res) => {
   


  
    try {

        
        
        res.send('deleated');
        
    
      } catch (error) {
        console.error('Error deleting user:', error); 
        res.status(500).json({ error: 'Internal Server Error deleating user' });
      } 
    
  });

  module.exports = router;
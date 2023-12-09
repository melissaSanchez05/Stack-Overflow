const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const userModel = require('../models/users')

router.post('/', async (req, res) => {
    const { username, password} = req.body;
    
   
    


  
    try {
        if (!username || !password ) {
            return res.status(400).json({ error: 'Invalid data: username or password' });
          }
          //find a macthing user based on the username
          const user = await userModel.findOne({  username: username });
          if(!user){
            return res.send('psw')
          }

          const passwordMatching = await bcrypt.compare(password, user.password);
          if(!passwordMatching){
            return res.send('psw');
          }
        
        res.send('authentication approved'); 
         
    
      } catch (error) {
        console.error('Error adding answer:', error); 
        res.status(500).json({ error: 'Internal Server Error in adding answer' });
      } 
    
  });
  module.exports = router; 
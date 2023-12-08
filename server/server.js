// Application server


const express = require('express');
const cors = require('cors');;
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const session = require("express-session");
const mongoose = require('mongoose')
const questionRouter = require('./routers/questionsRouter')
const tagRouter = require('./routers/tagsRouter')
const answerRouter = require('./routers/answersRouter')
const answerModel = require('./models/answers')
const ansQuestionRouter = require('./routers/answerQuestionRouter')
const usersRouter = require('./routers/userRouter')
const loginRouter = require('./routers/loginRouter')
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/fake_so', { useNewUrlParser: true, useUnifiedTopology: true });
//frontend set up
const secret = "secret-key";
  app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
  app.use(
    session({
      secret: secret,
      cookie: {},
      resave: false,
      saveUninitialized: true,
    })
  ); 
  
  
//database routes set up + routers
    app.use('/Questions', questionRouter)
    app.use('/Tags', tagRouter)
    app.use('/Answers',answerRouter)
    app.use('/AnswerQuestion',ansQuestionRouter)
    app.use('/Register',usersRouter)
    app.use('/Login',usersRouter)

    //testing
    app.get('/', (req, res) => {
        answerModel.find()
        .then( qs => res.json(qs))
        .catch(err => console.log(err))
        
      });
      app.post('/Test', async (req, res) => {
        const { text, ans_by } = req.body;
        
        
   
      
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
        
            res.json({ message: 'Answer added successfully' });
            
        
          } catch (error) {
            console.error('Error adding answer:', error); 
            res.status(500).json({ error: 'Internal Server Error in adding answer' });
          } 
        
      });


//backend set up
app.listen(8000,()=>{ console.log('server working at port 8000') })






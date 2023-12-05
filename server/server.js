// Application server


const express = require('express');
const cors = require('cors');;
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const questionRouter = require('./routers/questionsRouter')
const tagRouter = require('./routers/tagsRouter')
const answerRouter = require('./routers/answersRouter')
const model = require('./models/answers')
mongoose.connect('mongodb://127.0.0.1:27017/fake_so', { useNewUrlParser: true, useUnifiedTopology: true });
//frontend set up
app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
  }));

//database routes set up + routers
    app.use('/Questions', questionRouter)
    app.use('/Tags', tagRouter)
    app.use('/Answers',answerRouter)
    app.get('/', (req, res) => {
        model.find()
        .then( qs => res.json(qs))
        .catch(err => console.log(err))
        
      });


//backend set up
app.listen(8000,()=>{ console.log('server working at port 8000') })






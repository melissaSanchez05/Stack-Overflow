// Application server


const express = require('express');
const MongoClient = require("mongodb").MongoClient;
//const cors = require('cors')
const http = require('http');
const fs = require('fs');
const hostname = 'localhost'
const port = 8000;
const app = express();
//const cors = require('cors')
const mongoose = require('mongoose')
const answerModel = require('./models/answers')
const questionModel = require('./models/questions')
const tagsModel = require('./models/tags')
//Database set up
///app.use(cors())
app.use(express.json())
mongoose.connect('mongodb://127.0.0.1:27017/fake_so')

app.listen(3000,()=>{
  console.log('Database connecting...')
})
//methods to connet the database with the different schemas associeted with each components
    //initial page
            app.get('/',(req,res)=>{
                res.send("main Page")
            })
    //Quesitons tab
    const questionRouter = require('./routers/questionsRouter')
    app.use('/Questions', questionRouter)
    //Tags tab
    const tagRouter = require('./routers/tagsRouter')
    app.use('/Tags', tagRouter)

const path = require('path');


// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));


//server set up
const server = http.createServer((req,res)=>{
    res.writeHead(200, {'content-type': 'text/html'})
    res.write('Server working :)')
        res.end()
})

server.listen(port,hostname,()=>{
 console.log(`Server running at http://'${hostname}:${port}/ comming from VSCODE`)
})


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});



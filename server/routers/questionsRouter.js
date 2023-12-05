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


module.exports = router
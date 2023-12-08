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

module.exports = router
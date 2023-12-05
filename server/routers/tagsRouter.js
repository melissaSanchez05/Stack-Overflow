const express = require('express')
const router = express.Router()
const tagsModel = require('../models/tags')
const questionModel = require('../models/questions')

router.get('/', async (req,res)=> {
    let questions;
    let tags;
    try{
        [questions,tags] = await Promise.all([
            questionModel.find(),
            tagsModel.find(),
        ]);
        res.json({questions, tags});
        }catch(err){
            console.error(err);
            res.status(500).json({erro: 'Internal server error'});
           }
} )

router.get('/selected', async (req,res)=> {
    let questions;
    let tags;
    try{
        [questions,tags] = await Promise.all([
            questionModel.find(),
            tagsModel.find(),
        ]);
        res.json({questions, tags});
        }catch(err){
            console.error(err);
            res.status(500).json({erro: 'Internal server error'});
           }
} )

module.exports = router
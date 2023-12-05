const express = require('express')
const router = express.Router()
const ansModel = require('../models/answers')

router.get('/', async (req,res)=> {
    try{
        res.json( await ansModel.find())
        }catch(err){console.log(err)}
} )


module.exports = router
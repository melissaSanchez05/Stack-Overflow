const express = require('express')
const router = express.Router()

router.get('/Questions/Newest',(req,res)=> {
    questionModel.find()
    .then(qs => res.json(qs))
    .catch(error => res.json('some error occurred while parsing data from DB'))
} )
router.get('/Questions/active',(req,res)=> {
    questionModel.find()
    .then(qs => res.json(qs))
    .catch(error => res.json('some error occurred while parsing data from DB'))
} )
router.get('/Questions/Unanswered',(req,res)=> {
    questionModel.find()
    .then(qs => res.json(qs))
    .catch(error => res.json('some error occurred while parsing data from DB'))
} )


module.exports = router
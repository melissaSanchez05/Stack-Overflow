const express = require('express')
const router = express.Router()


router.get('/Tags',(req,res)=> {
    tagsModel.find()
    .then(ans => res.json(ans))
    .catch(error => res.json('some error occurred while parsing data from DB'))
} )

module.exports = router
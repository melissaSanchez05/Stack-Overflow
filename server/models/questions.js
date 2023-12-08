
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

var QuestionSchema = new Schema({

 title:{ 
    type : String,
    required: true,
    maxLenght: 100,
},
text:{
    type : String,
    required : true,
},
tags:[{
    type : Schema.Types.ObjectId,
    ref : 'Tag',
    required : true,
}],
answers: [{
    type: Schema.Types.ObjectId,
    ref : 'Answers',
    default : [],
}],
asked_by : {
    type: String,
    default : 'Anonymous',
},
asked_date_time : {
    type : Date,
    default : Date.now,
},
views : {
    type : Number,
    default : 0,
},
__v : {
    type: Number,
    default : 0,
},
});

QuestionSchema.virtual('url').get(function(){
    return 'posts/question/' + this.id;
});

module.exports = mongoose.model('Questions', QuestionSchema);
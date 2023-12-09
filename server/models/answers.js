// Answer Document Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 var AnswerSchema = new Schema({

    text :{
        type: String,
        required : true,
    },
    ans_by: {
        type: String,
        required : true,
    },
    ans_date_time : {
        type : Date,
        default : Date.now,
    },
    votes :{
        type: Number,
        default : 0,
    },
 });

 AnswerSchema.virtual('url').get(function(){
    return 'posts/answer/' + this.id;
 });

 module.exports = mongoose.model('Answers', AnswerSchema);
// Answer Document Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 var CommentSchema = new Schema({

    text :{
        type: String,
        required : true,
    },
    comment_by: {
        type: String,
        required : true,
        default : 'Anonymous',
    },
    comment_date_time : {
        type : Date,
        default : Date.now,
    },
    votes :{
        type: Number,
        default : 0,
    },
 });

 CommentSchema.virtual('url').get(function(){
    return 'posts/comment/' + this.id;
 });

 module.exports = mongoose.model('Comments', CommentSchema);
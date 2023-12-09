// Answer Document Schema

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

 var UserSchema = new Schema({

    username :{
        type: String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    email :{
        type: String,
        required : true,
        default : this.id +'@gmail.com',
        
    },
    memberYear:{
        type: Date,
        default : Date.now,
    },
    reputation :{
        type : Number,
        default : 0,
    },
    qs_asked:{
        type: Number,
        default : 0,
    }
 });

 UserSchema.virtual('url').get(function(){
    return 'posts/answer/' + this.id;
 });

 module.exports = mongoose.model('User', UserSchema);
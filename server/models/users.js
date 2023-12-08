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
        default : this.username + '@gmail.com',
    },
 });

 UserSchema.virtual('url').get(function(){
    return 'posts/answer/' + this.id;
 });

 module.exports = mongoose.model('User', UserSchema);
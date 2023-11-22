// Tag Document Schema
 mongoose = require('mongoose');

const Schema = mongoose.Schema;

var TagSchema = new Schema({
    name : {
        type: String,
        required: true,
    },
});

TagSchema.virtual('url').get(function(){
    return 'posts/tag/' + this.id;
});

module.exports = mongoose.model('Tag', TagSchema);
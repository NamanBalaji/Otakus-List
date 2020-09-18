const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true  
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    watchList: [
        {
            title: String,
            episodes: Number,
            watched: Number
        }
    ],
    watchLater: [{
        title: String,
        episodes: Number
         }]
},{timestamps:true});

module.exports = mongoose.model('User', userSchema);
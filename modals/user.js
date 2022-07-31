const mongoose = require('mongoose')

const userScheme = mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    password : {
        type : String , 
        require : true
    },
    email : {
        type : String , 
        require : true
    }

},{timestamps : true});

 module.exports = mongoose.model("User",userScheme);

const mongoose = require("mongoose");
// const config = require("../config/database");
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    title: {
        type: String
    },
    type: {
        type: String
    },
    time : [{
        name : {
            type : String,
        }
    }],
    file_name : {
        type : String,
        // require : true,
    },logo : { 
        data: Buffer, contentType: String
    },
});

const User = module.exports = mongoose.model('User', UserSchema, 'user');
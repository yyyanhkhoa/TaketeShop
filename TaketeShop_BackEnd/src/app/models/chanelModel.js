const mongoose = require('mongoose')
const messSchema = require('./messagerModel');
//const userSchema = require('./userModel.js')
const chanelSchema = new mongoose.Schema({

    userId: {
        type: Number,       
        required: true
    },    

})

module.exports = mongoose.model('Chanel', chanelSchema);

const mongoose = require('mongoose');


const messSchema = new mongoose.Schema({  

    chanelId:{       
        type: String,    
        ref : 'Chanel',
        required: true
    },
    userId:{
        type: Number,        
        required: true
    },  
    text : {
        type: String,      
        default: null
    },
    isStaff:{
        type: Boolean,       
        default: false
    },
    createAt:{
        type:Date,
        default:Date.now,       
    },
})

module.exports = mongoose.model('Message',messSchema);

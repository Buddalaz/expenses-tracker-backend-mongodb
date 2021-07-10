const mongoose = require('mongoose');

const ExpenseSchema = mongoose.Schema({
    date:{
        type:String,
        required:true
    },
    traveling:{
        type:Number,
        required: true
    },
    food:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model('Expenses',ExpenseSchema);
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    fName:{
        type:String,
        required:true
    },
    lName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
    expenseID:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Expenses'
        }
    ]
});

module.exports = mongoose.model('User',UserSchema);
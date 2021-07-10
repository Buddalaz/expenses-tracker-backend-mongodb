const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const port = 3000;

// declare the route
//-------------------------------
const UserRoute = require('./routes/UserRoute');
//-------------------------------

const app = express();
app.use(express.json({limit:'50mb'}));
app.use(cors());

mongoose.connect(
'mongodb://127.0.0.1:27017/expense_tracker',{
    useNewUrlParser:true,
        useUnifiedTopology:true,
        useFindAndModify:false,
        useCreateIndex:true
    }
).then(()=>{
    app.listen(port,()=>{
        console.log(`Server Up and Running on ${port}`)
    });
}).catch((error=>{
    console.log(error);
}));

//--------------------------------------
app.use('/api/v1/userRoute', UserRoute);

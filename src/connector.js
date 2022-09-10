
//const mongodb = require('mongodb');
let mongoose = require('mongoose');
const mongoURI = "mongodb+srv://ayush:ayush123@cluster0.swqiskf.mongodb.net/firts_db?retryWrites=true&w=majority"


// const { tallySchema } = require('./schema')

const database = (module.exports=()=>{
    const connParams = {
        useNewUrlParser:true,
        useUnifiedTopology:true,
    };
    try{
        mongoose.connect(mongoURI,connParams);
        console.log("database is connected ");
    }
    catch(err){
        console.log("not connected due to ",err);
    }
})

database();



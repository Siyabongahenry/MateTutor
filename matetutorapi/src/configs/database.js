const mongoose = require("mongoose");

const {MONGO_URL} = process.env;

exports.connect = ()=>{

    console.log(MONGO_URL);
    mongoose.connect(MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then(()=>{
        console.log("Successfull connected to database");
    })
    .catch((error)=>{
    console.log("database connection failed.");
    console.error(error);
    process.exit(1);
    })
};

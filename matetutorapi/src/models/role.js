const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RoleSchema = new Schema({
     name:{
        type:String,
        enum:["admin","tutor","user"]
     }
});


module.exports = mongoose.model("Role",RoleSchema);
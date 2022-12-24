const role = require("../utils/role");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        firstName:{
            type:String,
            minLength:2,
            maxLength:20,
            required:true
        },
        lastName:{
            type:String,
            minLength:2,
            maxLength:20,
            required:true
        },
        cellNo:{
            type:String,
            required:true
        },
        cellNoConfirmed:{
            type:Boolean,
            default:false
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        emailConfirmed:{
            type:Boolean,
            default:false
        },
        password:{
            type:String,
            required:true,
            minLength:[6,"The length of the password cannot be less than 6."]
            
        },
        description:{
            type:String,
            maxLength:200,
        },
        profileImg:{
            type:String
        },
        blocked:{
            status:{
                type:Boolean,
                default:false
            },
            reason:{
                type:String
            },
            date:Date
        },
        token:{
            type:String,
            default:"SFTHHYJIKKIIRTH5EGGERTGDTGHT"
        },
        roles:[{type:String,enum:[role.admin,role.tutor,role.user]}]
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("User", UserSchema,"Users");



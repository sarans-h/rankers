const mongoose=require('mongoose');
const userschema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true

    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    leetid:{
        type:String,
        trim:true,
        required:true
    },
    codeid:{
        type:String,
        trim:true,
        required:true
    },
    leetRate:{
        type:Number,
    },
    codeRate:{
        type:Number,
    },
    password:{
        type:String,
        
        required:true
    }
},{
    timestamps:true
});
let User=mongoose.model("User",userschema);
module.exports=User;
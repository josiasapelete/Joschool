const mongoose = require("mongoose");

const PostSchema=new mongoose.Schema(
    {
       userId:{
        type: String,
        required:true
       } ,
       message:{
        type: String,
        trim: true,
        maxlength:600
       },
       picture:{
        type:String
       },
       video:{
        type:String
       },
       likers: {
        type:[String],
        required:true
       },
       comments:{
        type:[
            {
                commenterId:String,
                commentPseudo: String,
                text:String,
                timestamps:Number
            }
        ],required:true
       }
    },{
        timestamps:true
    }
)

module.exports=mongoose.model('post',PostSchema);
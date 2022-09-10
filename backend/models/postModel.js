import mongoose from "mongoose";

const PostSchema= mongoose.Schema(
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
                timestamp:Number
            }
        ],required:true
       }
    },{
        timestamp:true
    }
)

module.exports=mongoose.model('post',PostSchema);
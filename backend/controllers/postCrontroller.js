const postModel=require('../models/postModel');
const userModel=require('../models/user.model');
const ObjectID= require('mongoose').Types.ObjectId;


module.exports.getPosts= async(req,res)=>{
    await postModel.find((error,data)=>{
        if(!error){
            res.send(data)
        } else{
            console.log('Error to get post' +error)
        }
    })
}

module.exports.createPost=async(req,res)=>{
    const newPost= new postModel({
        userId:req.body.userId,
        message: req.body.message,
        video: req.body.video,
        likers:[],
        comments:[]
    });
    try {
        const post=await newPost.save();
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.updatePost=()=>{

}

module.exports.deletePost=()=>{

}


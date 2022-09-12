const postModel = require('../models/postModel');
const userModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;


module.exports.getPosts = (req, res) => {
    postModel.find((error, data) => {
        if (!error) {
            res.send(data)
        } else {
            console.log('Error to get post' + error);
        }
    })
}

module.exports.createPost = async (req, res) => {
    const newPost = new postModel({
        userId: req.body.userId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: []
    });
    try {
        const post = await newPost.save();
        return res.status(200).json(post)
    } catch (error) {
        return res.status(400).send(error)
    }
}

module.exports.updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send("ID unknow :" + req.params.id)
    }
    postModel.findByIdAndUpdate(req.params.id,
        {
            $set: { message: req.body.message }
        }, { new: true },(error,data)=>{
            if(error){
                console.log("Update error : "+ error)
            } else{
                res.send(data)
            }
        }
    )
}

module.exports.deletePost =async (req,res) => {
    if(!ObjectID.isValid(req.params.id)){
        console.log("Unknow ID: " +req.params.id)
    }
    try {
    await    postModel.deleteOne({_id:req.params.id}).exec();
        res.status(200).json("Post deleted succussefull");
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports.like= async (req,res)=>{
    const postId= req.params.id;
    const {userId}=req.body;
    if(!ObjectID.isValid(postId)){
        console.log("Unknow post Id : "+ postId )
    }
    try {
        
        const post=await postModel.findById(postId);
        const liker=await userModel.findById(userId);
    
        if(!post.likers.includes(userId)){
            await post.updateOne({$push:{likers:userId}});
            await liker.updateOne({$push:{likes:postId}});
            res.status(200).json("Post liked successfully")
        }else{
            await post.updateOne({$pull:{likers:userId}});
            await liker.updateOne({$pull:{likes:postId}});
            res.status(200).json("Post unliked successfully")
        }
    } catch (error) {
        console.log(error)
    }
}
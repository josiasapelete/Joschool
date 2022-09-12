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
        }, { new: true }, (error, data) => {
            if (error) {
                console.log("Update error : " + error)
            } else {
                res.send(data)
            }
        }
    )
}

module.exports.deletePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log("Unknow ID: " + req.params.id)
    }
    try {
        await postModel.deleteOne({ _id: req.params.id }).exec();
        res.status(200).json("Post deleted succussefull");

    } catch (error) {
        console.log(error.message)
    }
}

module.exports.like = async (req, res) => {
    const postId = req.params.id;
    const { userId } = req.body;
    if (!ObjectID.isValid(postId)) {
        console.log("Unknow post Id : " + postId)
    }
    try {

        const post = await postModel.findById(postId);
        const liker = await userModel.findById(userId);

        if (!post.likers.includes(userId)) {
            await post.updateOne({ $push: { likers: userId } });
            await liker.updateOne({ $push: { likes: postId } });
            res.status(200).json("Post liked successfully")
        } else {
            await post.updateOne({ $pull: { likers: userId } });
            await liker.updateOne({ $pull: { likes: postId } });
            res.status(200).json("Post unliked successfully")
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports.createComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log("Unknow post Id : " + postId)
    }
    try {
        postModel.findByIdAndUpdate(req.params.id,
            {
                $push: {
                    comments: {
                        commenterId: req.body.commenterId,
                        commentPseudo: req.body.commentPseudo,
                        text: req.body.text,
                        timestamps: new Date().getTime()
                    }
                }
            }, { new: true }, (error, data) => {
                if (error) {
                    return res.status(400).send(error)
                } else {
                    return res.status(200).send(data)
                }

            })
    } catch (error) {
        console.log(error)
    }


}
module.exports.editComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log("Unknow post Id : " + postId)
    }
    try {

        return postModel.findById(req.params.id, (error, data) => {
            const theComment = data.comments.find((comment) => {
                comment._id.equals(req.body.commentId)
            });
            if (!theComment) return res.status(400).send("Commentaire non trouvé");

            theComment.text = req.body.text;

            return data.save((err) => {
                if (!err) res.status(200).send(data);
                return res.status(500).send(err)

            })
        }
        )
    } catch (error) {
        return res.status(400).send(error)

    }
}

module.exports.deleteComment = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        console.log("Unknow post Id : " + postId)
    }
    try {
        
        return postModel.findByIdAndUpdate(req.params.id,{
            $pull:{
                comments: {
                    _id:req.body.commentId
                }
            } 
        },{new:true},(err,data)=>{
            if(!err)return res.status(200).send(data);
            else return res.status(400).send(err)
        })
    } catch (error) {
        return res.status(400).send(error)
    }
}
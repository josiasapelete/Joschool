const userModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
    const users = await userModel.find().select('-password');
    res.status(200).json(users);
}

module.exports.userInfo = async (req, res) => {
    console.log(req.params);
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    userModel.findById(req.params.id, (err, docs) => {
        if (!err) res.send(docs);
        else console.log('ID unknown : ' + err);
    }).select('-password');
}
//Update an user
module.exports.updateUser = async (req, res) => {

    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('ID unknow : ' + req.params.id);

    try {
        await userModel.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    bio: req.body.bio,
                }
            }, {
            new: true, upsert: true, setDefaultsOnInsert: true
        }
        ).then((data) => res.send(data))
            .catch((err) => res.status(500).send({ message: err }));
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

//Supprimer un user
module.exports.deleteUser = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) return res.status(400).send('ID unknown :' + req.params.id)
    try {
        await userModel.remove({ _id: req.params.id }).exec();
        res.status(200).json({ message: "Succesfull deleted " });
    } catch (error) {
        return res.status(500).json({ message: error });
    }
}



//Follow
module.exports.follow= async (req,res)=>{
    const id =req.params.id;
    const {currentUserId}=req.body;
    if(currentUserId===id){
        res.status(403).json("Action forbidden")
    } else{
        try {
            const followUser= await userModel.findById(id);
            const followingUser= await userModel.findById(currentUserId);

            if(!followUser.followers.includes(currentUserId)){
                 await followUser.updateOne({$push:{followers:currentUserId}});
                 await followingUser.updateOne({$push:{following:id}});
                 res.status(200).json("User followed");
                console.log("COOL")
            } else{
                await followUser.updateOne({$pull:{followers:currentUserId}});
                await followingUser.updateOne({$pull:{followings:id}});
                res.status(200).json("User unfollowed");
            }
        } catch (error) {
            return res.status(500).json({ message: error.message });
            
        }
    }
}



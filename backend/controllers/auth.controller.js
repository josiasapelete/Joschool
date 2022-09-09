const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt')
module.exports.signUp= async (req,res)=>{
    const {pseudo,email,password}=req.body ;
    try{
        const user=await userModel.create({pseudo,email,password});
        res.status(201).json({user:user._id});
    }
    catch(err){
        res.status(200).send({err});
    }
}


module.exports.login= async (req,res)=>{
    const {email,password}=req.body;
    const user= await userModel.findOne({email});
    const maxAge= 24*60*60*1000;
    const SECRET_TOKEN=process.env.TOKEN;
    try {
        if(user){
        const verifyPass= await bcrypt.compare(password,user.password);
        
       if(!verifyPass){
        res.status(400).json("Wrong password");
       } else{
        const token= jwt.sign({
            email: user.email, id: user._id
        },SECRET_TOKEN,{expiresIn: maxAge});
        res.cookie("jwt",token,{httpOnly:true, maxAge})
        res.status(200).json({user,token})
       }
        } else{
            res.status(404).json("User does'nt exist");
        }
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
}

module.exports.logout= (req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/")
}
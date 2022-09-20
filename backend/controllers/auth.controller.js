const userModel=require('../models/user.model');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');


module.exports.signUp= async (req,res)=>{
    const {pseudo,email,password}=req.body ;
    
    try{
        const user=await userModel.create({pseudo,email,password});
        res.status(201).json({user:user._id});
    }
    catch(error){
        const errors= signUpErrors(error);
        res.status(200).send({errors});
    }
}

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN, {
      expiresIn: maxAge
    })
  };
  module.exports.signIn = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await userModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    } catch (error){
      const errors = signInErrors(error);
      res.status(400).json({ errors });
    }
  }
//   module.exports.login = async (req, res) => {
//     const {email,password}=req.body;
//     const user= await userModel.findOne({email});
//     const maxAge= 24*60*60*1000;
//     const SECRET_TOKEN=process.env.TOKEN;
  
    
//       if(user){
//         const verifyPass= await bcrypt.compare(password,user.password);

//        if(!verifyPass){
//         res.status(400).json("Wrong password");
//        } else{
//         const token= jwt.sign({
//             email: user.email, id: user._id
//         },SECRET_TOKEN,{expiresIn: maxAge});
//         res.cookie("jwt",token,{httpOnly:true, maxAge})
//         res.status(200).json({user,token})
//        }
//         } else{
//             res.status(404).json("User does'nt exist");
//         }
//     } 
  

module.exports.logout= (req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/")
}
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


const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN, {
      expiresIn: maxAge
    })
  };
  module.exports.login = async (req, res) => {
    const { email, password } = req.body
  
    try {
      const user = await userModel.login(email, password);
      const token = createToken(user._id);
      res.cookie('jwt', token, { httpOnly: true, maxAge});
      res.status(200).json({ user: user._id})
    } catch (err){
      const errors = signInErrors(err);
      res.status(400).json({ errors });
    }
  }
  

module.exports.logout= (req,res)=>{
    res.cookie("jwt","",{maxAge:1})
    res.redirect("/")
}
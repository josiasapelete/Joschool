const jwt =require('jsonwebtoken');
const userModel= require('../models/user.model');

//fonction pour verifier si vraiment le jeton appartient à l'utilisateur
module.exports.checkUser =(req,res,next)=>{

    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.TOKEN, async (err, decodedToken)=>{
            if(err){
                res.locals.user= null;
                res.cookie('jwt','',{maxAge:1});
                next()
            } else{
                console.log("decodedToken : "+ decodedToken)
                let user= await userModel.findById(decodedToken.id);
                res.locals.user= user;
                console.log(user);
                next()
            }
        })
    }else {
        res.locals.user=null;
        next()
    }
}

module.exports.requireAuth = (req,res,next)=>{
    const token =req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN, async (err, decodedToken)=>{
            if(err){
                console.log(err);
                next();
            } else {
                console.log(decodedToken.id);
            }
        })
    } else{
        console.log("No token")
    }
}
const express = require('express');
const userRoutes= require('./routes/user.routes');
const postRoutes= require('./routes/postRoutes');
require('dotenv').config({path:'./config/.env'})
const bodyParser= require('body-parser');
const cookieParser= require('cookie-parser');
const PORT=process.env.PORT;
require('./config/db');
const { checkUser, requireAuth } = require('./middlewares/auth.middleware');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))
app.use(cookieParser());

//Verifications avec jwt
app.get('*',checkUser);
app.get('/jwtid', requireAuth, (req,res)=>{
    res.status(200).send(res.locals.user._id);
})

//les routes
app.use('/user',userRoutes);
app.use('/post',postRoutes)

app.listen(PORT,(err)=>{ 
    if(err) throw err ;
    
    console.log(`En attente de requette 
    sur le port ${PORT} `);
})
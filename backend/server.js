const express = require('express');
const userRoutes= require('./routes/user.routes');
require('dotenv').config({path:'./config/.env'})
const bodyParser= require('body-parser');
const PORT=process.env.PORT;
require('./config/db');
const app=express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}))


app.use('/user',userRoutes)

app.listen(PORT,(err)=>{ 
    if(err) throw err ;
    
    console.log(`En attente de requette 
    sur le port ${PORT} `);
})
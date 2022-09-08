const mongoose= require('mongoose');
require('dotenv').config({path:'./.env'})
const URI=process.env.URI;
mongoose.connect(URI,
    {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    }
).then(()=>{console.log("Connected to Mongodb")})
.catch((err)=>{console.log("Failed to connected " + err)})
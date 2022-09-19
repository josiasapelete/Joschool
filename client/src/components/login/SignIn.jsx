import React from 'react';
import { useState } from 'react';
import {Container, Row, Col,Button,Form} from "react-bootstrap"
import axios from "axios"

const SignIn = () => {
    const [data,setData]=useState({email:"",password:""})

    const handleChangeData=(e)=>{
        setData({...data,[e.target.name]:e.target.value});
       
}
const handleSubmit = (e)=>{
    e.preventDefault() ;
    const emailError= document.querySelector('.email .Error');
    const pwError= document.querySelector('.pwError');
    const test= document.querySelector('.test');
    
// var data = JSON.stringify({
//   "pseudo": "test",
//   "email": "test@gmail.com",
//   "password": "test123"
// });

var config = {
	method: 'post',
  url:`${process.env.REACT_APP_API_URL}user/login `  
,
	data : data
};

axios(config)
.then( (res) =>{
  if(res.status===400){
    emailError.innerHTML=JSON.stringify(res.data);
    // pwError.innerHTML=res.data;
    console.log("ayi")
  } else{
    // window.location='accueil';
	// console.log(JSON.stringify(res.data));
  console.log(res)
  pwError.innerHTML=res.data.token
    
  }
})
.catch(function (error) {
	console.log(error.message);
  pwError.innerHTML="Holala";

});
}
    return (
        <div>
           <Form onSubmit={handleSubmit} >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={data.email} onChange={handleChangeData} />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
        <p className='email Error'></p>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={data.password} onChange={handleChangeData} />
      </Form.Group>
      <p className='pwError'></p>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    
        </div>
    );
};

export default SignIn;
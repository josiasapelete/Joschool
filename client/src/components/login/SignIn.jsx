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
// var data = JSON.stringify({
//   "pseudo": "test",
//   "email": "test@gmail.com",
//   "password": "test123"
// });

var config = {
  method: 'post',
  url:`${process.env.REACT_APP_API_URL}user/login ` ,
  headers: { 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
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
        <p className='emailError'></p>
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
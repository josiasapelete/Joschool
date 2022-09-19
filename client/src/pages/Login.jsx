import React from 'react';
import { useState } from 'react';
import {Container, Row, Col,Button,Form} from "react-bootstrap";
import Footer from '../components/Footer';
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';
import img from "../images/eleve.jpg"

const Login = () => {
    const [SignInModal,setSignInModal]=useState(true)
    return (
        <div className="container-fluid my-5">
            <div className="row">
                <div className="col-12 col-md-6">
                    <img src={img} className="w-100 h-100" alt="eleve" />
                </div>
                <div className="col-12  my-5 col-md-6">

                <ul>
                    <Button onClick={(e)=>setSignInModal(true)} variant="primary">Se Connecter</Button>{' '}

                    <Button onClick={(e)=>setSignInModal(false)} variant="secondary">S'inscrire</Button>{' '}
                </ul>
                {SignInModal?<SignIn/>:<SignUp/> }

                </div>
            </div>
            <Footer/>
        </div>
       
    );
};

export default Login;
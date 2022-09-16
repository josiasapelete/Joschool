import React from 'react';
import { useState } from 'react';
import {Container, Row, Col,Button,Form} from "react-bootstrap";
import SignIn from '../components/login/SignIn';
import SignUp from '../components/login/SignUp';


const Login = () => {
    const [SignInModal,setSignInModal]=useState(true)
    return (
        <Container>
            <Row>
                <Col>

                </Col>
                <Col>
                <ul>
                    <Button onClick={(e)=>setSignInModal(true)} variant="primary">Se Connecter</Button>{' '}
      
                    <Button onClick={(e)=>setSignInModal(false)} variant="secondary">S'inscrire</Button>{' '}
                </ul>
                {SignInModal?<SignIn/>:<SignUp/> }
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
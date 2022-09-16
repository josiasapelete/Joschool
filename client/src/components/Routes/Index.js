import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const Index = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Home/>} />
                <Route path='/profil' exact element={<Profil/>} />
                <Route path='/trending' exact element={<Trending/>} />
                <Route path='/login' exact element={<Login/>} />
            </Routes>
        </BrowserRouter>
        </div>
    );
};

export default Index;
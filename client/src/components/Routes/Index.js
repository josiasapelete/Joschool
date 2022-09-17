import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import About from '../../main/About';
import Accueil from '../../main/Accueil';
// import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Profil from '../../pages/Profil';
import Trending from '../../pages/Trending';

const Index = () => {
    return (
        <div>
        <BrowserRouter>
            <Routes>
                <Route path='/' exact element={<Accueil/>} />
                <Route path='/profil' exact element={<Profil/>} />
                <Route path='/trending' exact element={<Trending/>} />
                <Route path='/login' exact element={<Login/>} />
                <Route path='/about' exact element={<About/>} />
                {/* <Route path='/login' exact element={<Login/>} /> */}
            </Routes>
        </BrowserRouter>
        </div>
    );
};

export default Index;
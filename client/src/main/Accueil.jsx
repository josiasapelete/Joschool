import React from 'react';
import { useState } from 'react';
import img1 from "../images/accueil.jpg"
import img2 from "../images/ele.jpg"
import Login from '../pages/Login';
import About from './About';
const Accueil = () => {
    const [btn,setBtn]= useState()
    return (
        <div>
            <div className="container-fluid">
                <img className='w-100' src={img1} alt="Eleve" />
            </div>
            <div className="container p-2">
                <div className="row">
                    <div className="col-12 col-md-6">
                <img className='w-100' src={img2} alt="Eleve" />

                    </div>
                    <div className="col-12 col-md-6">
                        <p className='px-5 pt-5'>

                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea voluptatibus voluptates repellat provident, repellendus corrupti excepturi. Nihil, aut minima. Voluptatum ad omnis eaque earum labore incidunt non laboriosam repellendus quibusdam!
                        </p>

                        <p className='w-50 text-center d-flex justify-content-between'>

                        <button type="button" onClick={()=>setBtn(true)}   class="btn btn-success">Get Start</button>
                        <button type="button" onClick={()=>setBtn(false)} class="btn btn-success">A Propos de Nous</button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Accueil;
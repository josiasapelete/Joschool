import React from 'react';
import eg from "../images/EG.jpg";
import oif from "../images/oif.png";
import simplon from "../images/simplon.png";

const Footer = () => {
    return (
        <div>
              <div className="container ">
                <h2 className='text-center my-3'>NOS PARTENAIRES</h2>
                <div className="row">
                    <div className="col-3">
                      <img src={eg} className="w-100" alt="Partenaire" />   
                    </div>
                    <div className="col-3">
                      <img src={oif} className="w-100" alt="Partenaire" />   
                    </div>
                    <div className="col-3">
                       <img src={simplon} className="w-100" alt="Partenaire" />  
                    </div>
                    <div className="col-3">
                       <img src={eg} className="w-100" alt="Partenaire" />  
                    </div>

                </div>
                <div className="row p-5">
                  <div className="col-3">
                    <h2>Nous Rejoindre</h2>
                  </div>
                  <div className="col-3">
                    <h2>JoSchool</h2>
                  </div>
                  <div className="col-3">
                    <h2>Blog</h2>
                  </div>
                  <div className="col-3"></div>
                </div>
              </div>
        </div>
    );
};

export default Footer;
import React from 'react';
import img from "../images/ele.jpg"
const About = () => {
    return (
        <div>
           <div className="container">
            <div className="row">
                <div className="col">
                    <img src={img} className="w-100" alt="eleve" />
                </div>
                <div className="col"></div>
            </div>
            </div> 
        </div>
    );
};

export default About;
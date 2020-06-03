import React, { useState }  from 'react';
import './footer-home.css';
import LogoIatech from '../../../assets/images/logo-iatech.svg';

/* import { useForm } from 'react-hook-form' */


const footerHome = () =>{
    return(
        <React.Fragment>
            <div className='iatech-container-home'>
                <div className='desing-letter-home'>
                    <h6>Sistema de Registro de Clientes</h6>
                    <h6>Diseñado y desarrollado por</h6>
                </div>
                <div>
                    <img className='img-iatech-home' src={LogoIatech} alt=""/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default footerHome;
import React, { useState }  from 'react';
import './footer-registered.css';
import LogoIatech from '../../../assets/images/logo-iatech.svg';

const footerRegistered = () =>{
    return(
        <React.Fragment>
            <div className='iatech-container-registered'>
                <div className='desing-letter-registered'>
                    <h6>Sistema de Registro de Clientes</h6>
                    <h6>Diseñado y desarrollado por</h6>
                </div>
                <div>
                    <img className='img-iatech-registered' src={LogoIatech} alt=""/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default footerRegistered;
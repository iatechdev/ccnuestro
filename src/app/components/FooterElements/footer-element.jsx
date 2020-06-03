import React, { useState }  from 'react';
import LogoIatech from '../../../assets/images/logo-iatech.svg';
import './footer-element.css';
/* import { useForm } from 'react-hook-form' */


const footerElements = () =>{
    return(
        <React.Fragment>
            <div className='iatech-container-elements'>
                <div className='desing-letter-elements'>
                    <h6>Sistema de Registro de Clientes</h6>
                    <h6>Diseñado y desarrollado por</h6>
                </div>
                <div>
                    <img className='img-iatech-elements' src={LogoIatech} alt=""/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default footerElements;
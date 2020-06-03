import React, { useState }  from 'react';
import './header.css';
import LogoNuestro from '../../../assets/images/logo-nuestro.svg';

const header = () =>{
    return(
        <React.Fragment>
            <div className='header-container'>
                <div className='logo-nuestro-container'>
                    <img className='logo-nuestro'  src={LogoNuestro} alt=""/>
                </div>
                <div className='clients-register'>
                    <h2 className='title-client-register'>Sistema de Registro de Clientes</h2>
                </div>
            </div>
        </React.Fragment>
    )
}
export default header;
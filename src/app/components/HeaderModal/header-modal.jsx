  
import React, { useState }  from 'react';
import './header-modal.css';
import LogoNuestro from '../../../assets/images/logo-nuestro.svg';

const headermodal = () =>{
    return(
        <React.Fragment>
            <div className='headerModal-container'>
                <div className='logo-nuestro-container-modal'>
                    <img className='logo-nuestro-modal'  src={LogoNuestro} alt=""/>
                </div>
                <div className='clients-register-modal'>
                    <h2 className='title-habeas-modal'>política de tratamiento de datos</h2>
                </div>
            </div>
        </React.Fragment>
    )
}
export default headermodal;
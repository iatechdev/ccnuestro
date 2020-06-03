import React, { useState }  from 'react';
import FooterRegistered from '../../components/FooterRegistered/footer-registered.jsx';
import Logo from '../../../assets/images/logo-nuestro.svg';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import asiaticGirl from '../../../assets/images/asiatic-girl.png';
import './registered.css';


const registered = () =>{

    return(
        <React.Fragment>
            <div className="main-registered-container">
                    <img className='ovalos-registered' src={OvalosHome} alt=""/>
                    <img className='asiatic-girl-registered' src={asiaticGirl} alt=""/>
                <div className='registered-container'>
                    <img className='logoNuestro-registered' src={Logo} alt="LOGO Nuestro" title="Logo Nuestro"/>

                    <div className='register-checked-container'>
                        <h2 className='h-block'>Los datos han sido registrados</h2>
                        <h2 className='h-block'>con éxito</h2>
                    </div>

                    <div className='register-checked-container-responsive'>
                        <h2 className='h-block'>Los datos han sido</h2>
                        <h2 className='h-block'>registradoscon éxito</h2>
                    </div>

                    <div>
                        <button>nuevo registro</button>
                    </div>
                </div>
                <div className='footer-registered'>
                    <FooterRegistered/>
                </div>
            </div>

            
        </React.Fragment>
    )
}
export default registered;
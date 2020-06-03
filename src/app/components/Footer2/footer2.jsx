import React, { useState }  from 'react';
import './footer2.css';
import LogoIatech from '../../../assets/images/logo-iatech.svg';

/* import { useForm } from 'react-hook-form' */


const footer2 = () =>{
    return(
        <React.Fragment>
            <div className='footer-container'>
                <div className='iatech-container'>
                    <div className='desing-letter'>
                        <h6>Sistema de Registro de Clientes</h6>
                        <h6>Diseñado y desarrollado por</h6>
                    </div>
                    <div>
                        <img className='img-iatech' src={LogoIatech} alt=""/>
                    </div>
                </div>

                <div className='rigths-container'>
                    <span className='rigths-data'>*Al hacer clic en CONTINUAR acepta la</span>
                    <span className='rigths-data'><strong> Política de Tratamiento de Datos</strong></span>
                </div>

                <div className='empty-div-footer'></div>
            </div>
        </React.Fragment>
    )
}
export default footer2;
import React, { useState }  from 'react';
import Header from '../../components/Header/header.jsx';
import Footer2 from '../../components/Footer2/footer2.jsx';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import './registro-clientes.css';


const RegistroClientes = () =>{

    return(
        <React.Fragment>
            <div className='main-container'>
            <img className='ovalos' src={OvalosHome} alt=""/>
                <div className='header'>
                    <Header/>
                </div>

                <div className='personal-data-container'>
                    <h3 className='personal-data-title'>Datos personales</h3>
                    <form className='main-form-container' action="">
                        <div className='form-container'>
                            <input className='item1 data-id' type="text" placeholder="Tipo Documento"/>
                            
                            <input className='item5 personal-data-field' type="email" placeholder="Email"/>
                            
                            <input className='item2 data-id' type="text" placeholder="457869090"/>

                            <select className='item6' name="" id="cities-select">
                                <option className='option-cities' disabled selected>Centro Comercial</option>
                                <option value="">Nuestro Monteria</option>
                                <option value="">Nuestro Atlántico</option>
                                <option value="">Nuestro Uraba</option>
                                <option value="">Nuestro Cartago</option>
                            </select>
                            
                            <input className='item3 personal-data-field' type="text" placeholder="Nombre Completo"/>

                            {/* <input className='item7 personal-data-field' type="text" placeholder="Nombre del Almacen"/> */}
                            
                            <span className='item7-grid-d-none'></span>

                            <input className='item4 personal-data-field' type="text" placeholder="Teléfono / Celular"/>
                        </div>

                        <button className=''>continuar</button>
                    </form>
                </div>
                
                <div className='footer2'>
                    <Footer2/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default RegistroClientes;
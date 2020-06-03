import React, { useState }  from 'react';
import Header from '../../components/Header/header.jsx';
import FooterElements from '../../components/FooterElements/footer-element.jsx';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import './protection-elements.css';


const ProtectionElements = () =>{

    return(
        <React.Fragment>
            <div className='main-container'>
            
                <div className='header'>
                    <Header/>
                </div>

                <div className='main-protection-elements-container'>
                    <form className='main-form-container' action="">
                        <div className='protection-elements-section'>
                            <h3 className='protection-elements-title'>lleva elementos de prevención</h3>
                            <div className='protection-options-container'>
                                <div className='main-checkbox-container'>
                                    <div className='checkbox-container'>
                                        <input className='radio-elements' type="checkbox" id="tapabocas" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-element' htmlFor="tapabocas">Tapabocas</label>
                                </div>
                                
                                <div className='main-checkbox-container m-top-mobile'>
                                    <div className='checkbox-container'>
                                        <input className='radio-elements' type="checkbox" id="mascara" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-element' htmlFor="mascara">Máscara protectora</label>
                                </div>
                                
                                <div className='main-checkbox-container m-top-mobile'>
                                    <div className='checkbox-container'>
                                        <input className='radio-elements' type="checkbox" id="guantes" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-element' htmlFor="guantes">Guantes</label>
                                </div>
                            </div>
                        </div>

                        <div className='options-risk-main-container'>
                            <h3 className='protection-elements-title'>Seleccione las opciones que apliquen en su caso</h3>
                            <div className='options-risk-container'>
                                    <div className='checkbox-container-synthoms'>
                                        <input className='s-checkbox' type="checkbox" id="sintoma1" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-sintoma' htmlFor="sintoma1">He presentado algún síntoma la última semana (tos, fiebre, malestar general)</label>

                                    <div className='checkbox-container-synthoms'>
                                        <input className='s-checkbox' type="checkbox" id="sintoma2" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-sintoma' htmlFor="sintoma2">Estuve en contacto con personas que presentaron alguno de esos síntomas</label>

                                    <div className='checkbox-container-synthoms'>
                                        <input className='s-checkbox' type="checkbox" id="sintoma3" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-sintoma' htmlFor="sintoma3">Hice un viaje internacional en los últimos 30 días</label>
                                
                                    <div className='checkbox-container-synthoms'>
                                        <input className='s-checkbox' type="checkbox" id="sintoma4" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-sintoma' htmlFor="sintoma4">Hice un viaje nacional en los últimos 30 días</label>
                                
                                    <div className='checkbox-container-synthoms'>
                                        <input className='s-checkbox' type="checkbox" id="sintoma5" name="" value=""/>
                                        <i></i>
                                    </div>
                                    <label className='s-sintoma' htmlFor="sintoma5">Soy trabajador de la salud</label>
                            </div>
                        </div>                        

                        <button className=''>registrar</button>
                    </form>
                </div>

                <img className='ovalos-protection-elements' src={OvalosHome} alt=""/>
                
                <div className='footer-protection'>
                    <FooterElements/>
                </div>
            </div>
        </React.Fragment>
    )
}
export default ProtectionElements;

import React, { useState }  from 'react';
import { useForm } from 'react-hook-form'
import Header from '../../components/Header/header.jsx';
import FooterElements from '../../components/FooterElements/footer-element.jsx';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import './protection-elements.css';
import axios from 'axios';


const ProtectionElements = ({history}) =>{
    const [datastorange] = useState(JSON.parse(localStorage.getItem("Token"))); 
    const { register,handleSubmit} = useForm();
    const [dataForm, setSegurity ]= useState({});
    const onSubmit = dataForm => {formGuard(dataForm)};

    function handleChange(e) {
        setSegurity({...dataForm, [e.target.name] : e.target.checked })
    }

    async function formGuard(dataForm){
        try {
            const response = await 
            axios({
                method: 'post',
                url:'https://formnuestros.iatech.com.co:4002/api/auth/seguridad',
                headers: {'Content-Type': 'application/json'},
                data: JSON.stringify({
                    user: datastorange.id,
                    tapabocas: dataForm.tapabocas,
                    mascarilla: dataForm.mascarilla,
                    guantes: dataForm.guantes,
                    pregunta1_c: dataForm.pregunta1_c,
                    pregunta2_c: dataForm.pregunta2_c,
                    pregunta3_c: dataForm.pregunta3_c,
                    pregunta4_c: dataForm.pregunta4_c,
                    pregunta5_c: dataForm.pregunta5_c 
                })
            })
        console.log(response)
        if(response.status === 200){
        history.push("/registroexitoso")
        }
        } catch (error) {
            console.log(error)
        }
    }

    return(
        <React.Fragment>
            <div className='main-container'>
            
                <div className='header'>
                    <Header/>
                </div>

                <div className='main-protection-elements-container'>
                    <form className='main-form-container' action="" onSubmit={handleSubmit(onSubmit)}>
                        <div className='protection-elements-section'>
                            <h3 className='protection-elements-title'>lleva elementos de prevención</h3>
                            <div className='protection-options-container'>
                                <div className='main-checkbox-container'>
                                    <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.tapabocas ? true : false} id="tapabocas" name="tapabocas" />
                                    <label className='s-element' htmlFor="tapabocas">Tapabocas</label>
                                </div>
                                
                                <div className='main-checkbox-container  m-top-mobile'>
                                
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.mascarilla ? true : false} id="mascarilla" name="mascarilla"/>
                                 
                                    <label className='s-element' htmlFor="mascarilla">Mascarilla Protectora</label>
                                </div>
                                
                                <div className='main-checkbox-container  m-top-mobile'>
                                   
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.guantes ? true : false} id="guantes" name="guantes"/>
                              
                                    <label className='s-element' htmlFor="guantes">Guantes</label>
                                </div>
                            </div>
                        </div>

                        <div className='protection-elements-section'>
                            <h3 className='protection-elements-title m-top'>Seleccione las opciones que apliquen en su caso</h3>
                            <div className='container-preguntas'>
                                <div className='main-checkbox-container'>
                              
                                    <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.pregunta1_c ? true : false} id="pregunta1_c" name="pregunta1_c" />
                                  
                                    <label className='s-element' htmlFor="sintoma1">He presentado algún síntoma la última semana (tos, fiebre, malestar general)</label>
                                </div>
                                
                                <div className='main-checkbox-container  m-top-mobile'>
                                   
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.pregunta2_c ? true : false} id="pregunta2_c" name="pregunta2_c"/>
                                 
                                    <label className='s-element' htmlFor="sintoma2">Estuve en contacto con personas que presentaron alguno de esos síntomas</label>
                                </div>
                        
                                <div className='main-checkbox-container  m-top-mobile'>
                                   
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.pregunta3_c ? true : false} id="pregunta3_c" name="pregunta3_c"/>
                                   
                                    <label className='s-element' htmlFor="sintoma3">Hice un viaje internacional en los últimos 30 días</label>
                                </div>
                                <div className='main-checkbox-container  m-top-mobile'>
                                    
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.pregunta4_c ? true : false} id="pregunta4_c" name="pregunta4_c"/>
                                
                                    <label className='s-element' htmlFor="sintoma4">Hice un viaje nacional en los últimos 30 días</label>
                                </div>
                                <div className='main-checkbox-container  m-top-mobile'>
                                   
                                        <input className='radio-elements' type="checkbox" onChange={e => handleChange(e)} ref={register} checked={dataForm.pregunta5_c ? true : false} id="pregunta5_c" name="pregunta5_c"/>
                                
                                    <label className='s-element' htmlFor="sintoma5">Soy trabajador de la salud</label>
                                </div>
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

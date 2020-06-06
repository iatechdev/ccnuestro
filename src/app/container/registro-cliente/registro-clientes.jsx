import React, { useState,useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Header from '../../components/Header/header.jsx';
import Footer2 from '../../components/Footer2/footer2.jsx';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import './registro-clientes.css';
import axios from 'axios';

const RegistroClientes = ({ history }) =>{

    const [datastorange] = useState(JSON.parse(localStorage.getItem("Token")));
    const { register, handleSubmit,errors,reset} = useForm()
    const [authdata, setAuth] = useState({});

    const onSubmit = (data) =>{updateClient(data)} 

    function handleChange(e) {
        setAuth({...authdata, [e.target.name] : e.target.value })
    }

    async function updateClient(data){
        
        console.log(datastorange)
        await axios.put(`https://formnuestros.iatech.com.co:4002/api/auth/data/${datastorange.id}`, 
        {
            name: data.name,
	        celular_c : data.celular_c ,
	        email_name: data.email_name,
	        ia_mall_id_c : data.ia_mall_id_c 

        }).then((response)=>{
            console.log(response)
            if(response.status === 200){
                history.push("/registrodeproteccion")
            }
        }).catch((error)=>{
            console.log(error)
        })


    }

  
    return(
       
        <React.Fragment>
            <div className='main-container'>
            <img className='ovalos' src={OvalosHome} alt=""/>
                <div className='header'>
                    <Header/>
                </div>

                <div className='personal-data-container'>
                    <h3 className='personal-data-title'>Datos personales</h3>
                    <form className='main-form-container' onSubmit={handleSubmit(onSubmit)}>
                        <div className='form-container'>
                            <input className='item1 data-id' type="text" value={datastorange.tipo} />
                  
                            <input className='item5 personal-data-field' type="email" onChange={e => handleChange(e)} name="email_name" ref={register}  id="email_name" placeholder="Email"/>
                            
                            <input className='item2 data-id' type="text" value= {datastorange.sic} placeholder="457869090"/>

                            <select className='item6' name="ia_mall_id_c" defaultValue="none" onChange={e => handleChange(e)}  ref={register}  id="ia_mall_id_c" >
                                <option className='option-cities' value="none" disabled >Centro Comercial</option>
                                <option value="Nuestro Monteria">Nuestro Monteria</option>
                                <option value="Nuestro Atlantico">Nuestro Atlántico</option>
                                <option value="Nuestro Uraba">Nuestro Uraba</option>
                                <option value="Nuestro Cartago">Nuestro Cartago</option>
                            </select>
                            
                            
                            <input className='item3 personal-data-field' type="text" onChange={e => handleChange(e)} name="name"  ref={register}  id="name"  placeholder="Nombre Completo"/>

                            <input className='item4 personal-data-field' type="text"  onChange={e => handleChange(e)} name="celular_c"  ref={register}  id="celular_c" placeholder="Teléfono / Celular"/>
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
import React, { useState }  from 'react';
import { useForm } from 'react-hook-form'
import FooterHome from '../../components/FooterHome/footer-home.jsx';
import Logo from '../../../assets/images/logo-nuestro.svg';
import OvalosHome from '../../../assets/images/ovalos-home.svg';
import asiaticGirl from '../../../assets/images/asiatic-girl.png';
import axios from "axios";
import './home-page.css';


const Home = ({ history, data }) =>{
  
    localStorage.clear();
    const { register, handleSubmit, errors} = useForm(0);
    const [login, setLogin] = useState(0);
    const [stateButton, setStateButton] = useState(true);
    const [stateDOM, setStateDOM] = useState(false);
    let dataValue = undefined;
    const [module, setModule] = useState(false);

    document.addEventListener("change", () => {setStateDOM(true)});

    const onSubmit = dataForm => {
        if(stateButton){
            setStateButton(false);
            dataValue = dataForm;
            console.log(dataValue);
            if(!module) {
                alert('Debe escojer el tipo de usuario');
                setStateButton(true);
                return;
            }
            if(dataValue.tipo === 'none') {
                alert('Debe escojer el tipo de documento');
                setStateButton(true);
                return;
            }
            Auth(dataValue);
        } else if(!stateButton){
            alert("espere un momento por favor");
            return;
        }
    };

    function handleChange(event) {
        setModule(true);
    }

    

    async function Auth(dataValue) {
        await axios.post('https://formnuestros.iatech.com.co:4002/api/personalData/createUser',
        {sic : dataValue.sic, tipo : dataValue.tipo }).then((response)  => {
            console.log(response)
             if(response.status === 200 && response.data && response.data.Userexist){
                 console.log(response)
                 console.log(response.data.Userexist[0].id)
                 const token = {auth : true, sic : dataValue.sic, tipo : dataValue.tipo, id:response.data.Userexist[0].id}
                 setStateButton(true);
                 localStorage.setItem("Token", JSON.stringify(token));
                 history.push('/registro');           
             }else if(response.status === 204){
                 setStateButton(true);              
                 setLogin(1);
             }
         }).catch((error)=>{
             console.log(error);
         });
     }

 


    return(
        <React.Fragment>
            <div className="Box">
                <img className='ovalos' src={OvalosHome} alt=""/>
                <img className='asiatic-girl' src={asiaticGirl} alt=""/>
                <div className='HomePage'>
                    <img className='logoNuestro' src={Logo} alt="LOGO Nuestro" title="Logo Nuestro"/>
                    <form className="form" onSubmit={handleSubmit(onSubmit)}>
                        <div className='radial-container'>
                            <div className="container-user">
                                <label className="content-input">
                                    <input className="s-radial" onChange={() => handleChange()} type="radio"  id="cliente" name="module" value="client"/>
                                    <i></i>
                                </label>
                                <label className="style-font m-client cliente" htmlFor="cliente">Cliente</label>
                            </div>

                            <div className="container-user">
                                <label className="content-input">
                                    <input className="s-radial" type="radio" onChange={() => handleChange()}  id="empleado" name="module" value="employee"/>
                                    <i></i>
                                </label>
                                <label className="style-font empleado" htmlFor="empleado">Empleado</label>
                            </div>
                        </div>

                    
                        <select className='id-select' name="tipo" defaultValue="none" ref={register({required:true})} id="">
                            <option className='select-place' value="none" disabled>Tipo de documento</option>
                            <option className='border-option' value="CC">Cédula de ciudadania</option>
                            <option className='border-option' value="CEX">Cédula de extranjería</option>
                            <option className='border-option' value="NIT">NIT</option>
                            <option className='border-option' value="PAS">Pasaporte</option>
                            <option className='border-option' value="NIUP">NIUP</option>
                        </select>
                        <input className='id-number' type="text" autoComplete="off" name="sic" ref={register({required:true})} placeholder="Número de documento"/>
                        <div className ="errorRequired"> { errors.nit && 'Debe ingresar su NIT'} </div> 
                    
                        <button> ingresar </button>
                    </form>
                    <div className='footer-home'>
                        <FooterHome/>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}
export default Home;
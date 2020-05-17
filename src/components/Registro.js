import React,{useState,useEffect} from 'react';
import {useHistory} from "react-router-dom";

import firebase from '../Config/firebase';

import {Form, Button, Col} from 'react-bootstrap';

function Registro() {
    const history = useHistory();

    const [validated, setValidated] = useState(false);

    const [datos, setDatos] = useState({nombres:"",apellidos:"",email:"",password1:"",password2:""})

    const [emailsReg, setEmailsReg] = useState([]);
    const [emailRepetido,setEmailRepetido] = useState(false);
    const [passwordRepetida,setPasswordRepetida]=useState(false);

    /* Traigo todos los emails registrados y los guardo en el state 'emailsReg' */
    useEffect(
        () => {
            firebase.database().ref('usuarios/').once('value').then(function(snapshot) {
            if (snapshot.val() !== null){
                var pasadoAArray = Object.values(snapshot.val())
                var emailsRegistrados = pasadoAArray.map (user => user.email)

                setEmailsReg(emailsRegistrados)
            }
            
            })
        }    
    , [])
    
    function handleChange(e) {
        const {name,value}=e.target
        setDatos(prevDatos => ({
            ...prevDatos,
            [name]:value
        }) )
    }

    const handleSubmit = (event) => {
      const form = event.currentTarget;
      if (form.checkValidity() === false) {
        event.preventDefault();
        event.stopPropagation();
      } 
      if (form.checkValidity() === true) {
        event.preventDefault();
        if (emailsReg.includes(datos.email)) {
            //console.log('EMAIL YA REGISTRADO')
            setEmailRepetido(true);
            setDatos({nombres:datos.nombres ,apellidos:datos.apellidos, email:"",password1:"",password2:""})
        } else if(datos.password1 !== datos.password2){
            setPasswordRepetida(true);
            setDatos({nombres:datos.nombres ,apellidos:datos.apellidos, email:datos.email,password1:"",password2:""})
        } else {
            registrar();
        }
        
      }

      setValidated(true);
        
    };
    
    function registrar(){
        firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password1)
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
        });
        firebase.database().ref('usuarios/').push({
            nombres: datos.nombres,
            apellidos: datos.apellidos,
            email: datos.email,
            password: datos.password1
        })
        
        //setEmailRepetido(false);

        history.push("/login") 
    } 

    return (
        <div className="form-registro">
            <h2>Formulario de Registro</h2>
            <Form  noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} md="6" controlId="validationCustom01">
                    <Form.Label>Nombres</Form.Label>
                    <Form.Control
                        onChange={handleChange} 
                        value={datos.nombres}  
                        name="nombres"
                        placeholder="Nombres" 
                        type="text" 
                        required
                    />
                    <Form.Control.Feedback>Campo válido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="6" controlId="validationCustom02">
                    <Form.Label>Apellidos</Form.Label>
                    <Form.Control
                        onChange={handleChange} 
                        value={datos.apellidos} 
                        name="apellidos"
                        placeholder="Apellidos" 
                        type="text" 
                        required
                    />
                    <Form.Control.Feedback>Campo válido</Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustomEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        onChange={handleChange} 
                        value={datos.email} 
                        name="email"
                        placeholder="Email" 
                        type="email" 
                        required
                    />
                    <Form.Control.Feedback type="invalid">
                    Introduzca un email válido
                    </Form.Control.Feedback>
                
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control 
                        onChange={handleChange} 
                        value={datos.password1} 
                        name="password1"
                        placeholder="Contraseña" 
                        type="password" 
                        required
                        pattern=".{6,}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Minimo 6 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group as={Col} md="12" controlId="validationCustom04">
                    <Form.Label>Repita Contraseña</Form.Label>
                    <Form.Control 
                        onChange={handleChange} 
                        value={datos.password2} 
                        name="password2"
                        placeholder="Contraseña" 
                        type="password" 
                        required 
                        pattern=".{6,}"
                    />
                    <Form.Control.Feedback type="invalid">
                        Minimo 6 caracteres.
                    </Form.Control.Feedback>
                </Form.Group>
            </Form.Row>

            <Form.Group>
                <Form.Check
                    required
                    label="Acepto términos y condiciones"
                    feedback="Debe aceptar términos y condiciones."
                />
            </Form.Group>

            {/* Aca va el input que aparece en caso de que el email ya estuviera registrado */}
            <div> <h3 style={{color:'red',display: emailRepetido ? 'inline' : 'none'}} >EMAIL YA REGISTRADO</h3> </div> 
            
            {/* Aca va el input que aparece en caso de que las contraseñas no coincidan */}
            <div> <h3 style={{color:'red',display: passwordRepetida ? 'inline' : 'none'}} >LAS CONTRASEÑAS DEBEN COINCIDIR</h3> </div>   
            
            
            <br/>
            <Button variant="dark" type="submit">Registrarme</Button>
        </Form>
    </div>
    );
  }
  
export default Registro;
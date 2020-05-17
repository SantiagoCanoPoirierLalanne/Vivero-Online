import React, { useState } from 'react';
import {useHistory} from "react-router-dom";

import firebase from '../Config/firebase';

import {Form, Col, Row, Button } from 'react-bootstrap';

function Login () {
    const history = useHistory();

    const [datos, setDatos]= useState({email:"",password:""})
    const [mostrarError, setmostrarError] = useState(false)
    

    function handleChange(e) {
        const {name,value}=e.target
        setDatos(prevDatos => ({
            ...prevDatos,
            [name]:value
        }) )
    }

    function handleSubmit(e){
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(datos.email, datos.password)
        .then(() =>{ 
            observador();
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);

            setmostrarError(true);

            // ...
        });
        
    }
    
    function observador(){
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                // console.log('SI existe usuario activo');
                
                var email = user.email;
                var index= email.indexOf('@');
                var username = email.substr(0,index); 
                //var displayName = user.displayName;
                //var emailVerified = user.emailVerified;
                //var photoURL = user.photoURL;
                //var isAnonymous = user.isAnonymous;
                //var uid = user.uid;
                //var providerData = user.providerData; 
                //console.log(user);

                setmostrarError(false);
                setDatos({email:"",password:""})
                localStorage.setItem('usuarioLogeado',JSON.stringify(username))
                
                /* si hay cosas en el carrito, vas directo a él, sino vas a la home para poder ver los productos */
                if(sessionStorage.getItem('total')){
                    history.push("/carrito")
                } else {
                    history.push("/")
                }
                 
                //window.location.reload(true);
                // ...
            } else {
                // User is signed out.
                // ...
                console.log('NO existe usuario activo');
                //alert('Usuario/contraseña INVALIDES'); 
            }
        });
    }

    function irAregistro(){
        history.push('/registro')
    }

    /* function cambiarPassword() {
        var auth = firebase.auth();
        var emailAddress = datos.email;

        auth.sendPasswordResetEmail(emailAddress).then(function() {
        // Email sent.
        alert('Se le ha enviado un email a su cuenta de correo para reestablecer su contraseña. Actualicela y vuelva a loggearse en la web');
        

        }).catch(function(error) {
        // An error happened.
        });
        setDatos({email:"",password:""}) 
    } */
 
    return (
        <Form className="form-login">
            <h2 className="form-login-title">Iniciar Sesión</h2>
            <Form.Group as={Row} controlId="formHorizontalEmail">
                <Form.Label column sm={12}>
                Email
                </Form.Label>
                <Col sm={12}>
                <Form.Control 
                    onChange={handleChange} 
                    value={datos.email} 
                    name="email" 
                    type="email" 
                    placeholder="Email"  
                    required />
                </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="formHorizontalPassword">
                <Form.Label column sm={12}>
                Password
                </Form.Label>
                <Col sm={12}>
                <Form.Control 
                    onChange={handleChange} 
                    value={datos.password} 
                    name="password"
                    type="password" 
                    placeholder="Password"  
                    required />
                </Col>
            </Form.Group>

            <div> <h3 style={{color:'red',display: mostrarError ? 'inline' : 'none'}} >Usuario/Contraseña INVALIDOS</h3> </div>
            <br/>

            <Form.Group as={Row}>
                <Col>
                <Button onClick={handleSubmit} variant="dark" type="submit">Iniciar Sesión</Button>
                </Col>
            </Form.Group>
            <br></br>
            <Form.Group as={Row}>
                <Col>
                    <a> Si no estas registrado... </a>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Col>
                    <Button onClick={irAregistro} variant="dark" type="submit">Crear Cuenta</Button>
                </Col>
            </Form.Group>   
        </Form>

    )
}

export default Login


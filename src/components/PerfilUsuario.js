import React, { useState, useEffect } from 'react';

import firebase from '../Config/firebase';

import {useHistory} from "react-router-dom";

function PerfilUsuario(){
    const [isLoaded,setisLoaded]= useState(false);
    const [key, setKey] = useState ();;
    const [user,setUser] = useState([]);

    const history = useHistory();

    useEffect(
        () => {
            var emailLogeado = JSON.parse(localStorage.getItem('emailLogeado'));
            console.log (emailLogeado);
            setisLoaded(false)
            firebase.database().ref('usuarios/').once('value').then(function(snapshot) {
            console.log(snapshot.val())
            var arrayConvert = Object.entries(snapshot.val())
            console.log(arrayConvert)
            var filtrado = arrayConvert.filter(dato => dato[1].email === emailLogeado)
            var segundoFiltro = filtrado[0]
            console.log(segundoFiltro);
            
            setUser(segundoFiltro[1])
            setKey(segundoFiltro[0])
            
            setisLoaded(true)  
            })
        }    
    , [])
    
    localStorage.setItem('key',key);

    function verHistorial(){
        history.push("/historial")
    }
    


    if (isLoaded === false) {
        return (<div className="loading-container"><h2 className="loading">Cargando...</h2></div>)
    } else if (isLoaded === true) {
        return (
            <div className="perfil-usuario">
                <h2>Mi Perfil</h2>
                <p>Nombres: {user.nombres} </p>
                <p>Apellidos: {user.apellidos} </p>
                
                <button onClick={verHistorial} >Ver Historial de Compras</button>
                
            </div>
        ) 
    }
    
}

export default PerfilUsuario;
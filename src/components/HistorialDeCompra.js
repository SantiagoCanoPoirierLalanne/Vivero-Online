import React, { useState, useEffect } from 'react';

import firebase from '../Config/firebase';

import {useHistory} from "react-router-dom";

function HistorialDeCompra(){

    const [mapeado,setMapeado]=useState();
    const history = useHistory()
    
    var key = localStorage.getItem('key');

    useEffect(
        () => {
            firebase.database().ref(`usuarios/${key}/pedidos`).once('value').then(function(snapshot) {
                var arrayConvert = Object.entries(snapshot.val())
                console.log(arrayConvert)
                setMapeado(arrayConvert);

            })
        }    
    , [])

    function volver(){
        history.push("/perfilUsuario")
    }
    
    if(mapeado !== undefined) {
        var cero = mapeado.map ( p => {
            var fecha= p[0];
            var uno = Object.values(p[1])
            var dos= uno[0]
            var tot = uno[1]
            console.log(uno)
            console.log(dos)
            var tres = dos.map(p => {
                return(
                    <div>
                        Producto: <a>{p.prod} </a>
                        - Cantidad: <a>{p.cantidad} </a>
                        - Precio unitario:€ <a>{p.precio} </a>
                        - Total:€ <a>{p.total} </a>
                    </div>  )
            })
            
    
            return(
                <div>
                    <li>
                        {fecha} 
                        {tres} 
                        Precio Total: € {tot}
                    </li><br/>
                </div>
            )
            
        }) 
    }  
    

    return (
        <div>
            <h2 style={{margin:"20px"}} >Historial de Compras</h2>
            <ul>
                {cero}
            </ul> 
            <div><button className="historial-btn" onClick={volver} >Volver</button></div>
        </div>
    )
}

export default HistorialDeCompra;
import React from 'react';

import {useHistory} from "react-router-dom";

import {Table} from 'react-bootstrap';

function Carrito() {

    const history = useHistory();
    
    if (!sessionStorage.getItem('total')) {
        return (
            <Table striped bordered hover size="sm">
            <thead class="carrito-tabla">
                <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>€ unitario</th>
                    <th>€ total</th>
                </tr>
            </thead>
            <tbody class="carrito-tabla"> 
                <tr>
                    <td colSpan="3">TOTAL</td>
                    <td>0</td> 
                    <th></th>
                </tr>
            </tbody>
        </Table>
        )
    } else {
        function eliminarUno(e){
            //console.log(e.target.value)
            let index=parseInt(e.target.value)
            pedido.splice((index),1)
            sessionStorage.setItem('total', JSON.stringify(pedido)) 

            if (sessionStorage.getItem('total') === '[]' ){
                sessionStorage.removeItem('total')
            }
            window.location.reload(true);   
        }
        
        let pedido= JSON.parse(sessionStorage.getItem('total'));
        console.log(pedido);
        let pedidoConIndex = Object.entries(pedido);

        var pedidoSeparado = pedidoConIndex.map(p => {
            let a=parseInt(p[1].cantidad);
            let b=parseFloat(p[1].precio).toFixed(2);
            let total = parseFloat(a*b).toFixed(2);
            
            return (
                <tr>
                    <td>{p[1].prod} </td>
                    <td>{p[1].cantidad} </td>
                    <td>{p[1].precio} </td>
                    <td>{total} </td>
                    <td>
                        <button className="carrito-btn" onClick={eliminarUno} value={p[0]} >eliminar</button>
                    </td>
                </tr>
            )
        })

        var totales = pedido.map(p => {
            return (parseFloat(p.precio * p.cantidad).toFixed(2))
        } )
        
        var numbers = totales.map(p => {
            return parseFloat(p)
        })
        
        var sumaTotal = 0;
        numbers.forEach(function(n){
            sumaTotal+= n
        } );
        console.log(sumaTotal) 
    }

    function comprar(){
        if(!localStorage.getItem('usuarioLogeado')){
            alert("Debe estar logeado en la pagina para finalizar su compra!")
            history.push("/login")
        } else {
            sessionStorage.setItem('precioTotal',sumaTotal)
            history.push("/compra")
        }
    }

    return(
        <div>
            <Table  striped bordered hover size="sm">
                <thead class="carrito-tabla">
                    <tr >
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>€ unitario</th>
                        <th>€ total</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody class="carrito-tabla">
                    {pedidoSeparado}  
                    <br/>
                    <tr>
                        <td colSpan="3">TOTAL</td>
                        <td>€{sumaTotal}</td>
                        <td>
                            {sumaTotal !== 0 && <button className="carrito-btn" onClick={comprar} >COMPRAR</button> }
                        </td>
                    </tr>
                </tbody>
            </Table>
            
        </div>
    )
}
export default Carrito;
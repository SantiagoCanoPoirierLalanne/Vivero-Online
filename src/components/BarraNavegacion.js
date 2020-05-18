import React, { useState } from 'react';
import {Switch, Route} from "react-router-dom";
import Login from './Login';
import Registro from './Registro';
import Home from './Home';
import DetalleProducto from './DetalleProducto';
import Carrito from './Carrito';
import Compra from './Compra';
import CompraFinalizada from './CompraFinalizada';
import PerfilUsuario from './PerfilUsuario';
import HistorialDeCompra from './HistorialDeCompra';


import firebase from '../Config/firebase';

import {Nav, Form, Navbar, FormControl, Button } from 'react-bootstrap';

import {useHistory} from "react-router-dom";


function BarraNavegacion() {
    const history = useHistory();

    function cerrarSesion() {
        firebase.auth().signOut()
        .then(function(){
            localStorage.removeItem('usuarioLogeado');
            history.push("/login")
        })
        .catch(function(error) {
            console.log(error);
        }) 
    }

    function irAPerfil(){
        history.push("/perfilUsuario")
    }

    return (  
        <div>
            <>
                <Navbar bg="dark" variant="dark">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">HOME</Nav.Link>
                        {!localStorage.getItem('usuarioLogeado') && <Nav.Link href="/login">LOGIN</Nav.Link> } 
                        {!localStorage.getItem('usuarioLogeado') && <Nav.Link href="/registro">REGISTRO</Nav.Link> } 
                    </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Buscar" className="mr-sm-2 float-left" />
                            <Button variant="outline-info">Buscar</Button>
                        </Form> */}
                    <div>
                        {localStorage.getItem('usuarioLogeado') && <div> <a style={{color:"white"}} >¡Bienvenide {JSON.parse(localStorage.getItem('usuarioLogeado'))}! </a> <button className="salir-btn" onClick={irAPerfil}>Mi Perfil</button> <button className="salir-btn" onClick={cerrarSesion}>Salir</button> </div>} 
                    </div>
                 </Navbar>
            </> 

            <Switch>
                <Route exact path="/login"> <Login /> </Route>
                <Route exact path="/registro"> <Registro /> </Route>
                <Route exact path="/"> <Home /> </Route>
                <Route exact path="/productos/:id"> <DetalleProducto /> </Route>
                <Route exact path="/carrito"> <Carrito /> </Route>
                <Route exact path="/compra"> <Compra /> </Route>
                <Route exact path="/compraFinalizada"> <CompraFinalizada /> </Route>
                <Route exact path="/perfilUsuario"> <PerfilUsuario /> </Route>
                <Route exact path="/historial"> <HistorialDeCompra /> </Route>
                
            </Switch>
                
        </div>
    );
}
export default BarraNavegacion;
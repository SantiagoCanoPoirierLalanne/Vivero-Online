import React, { Component } from 'react';
import Logo from '../images/arbol.jpg';
import {Link} from 'react-router-dom';

import { FiShoppingCart } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";


class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() { 
        return (  
            <header className="header">
                <div className="header-container">
                    <img src={Logo} className="header-logo"/>
                    <h1 className="header-title">VIVERO SANTIAGO</h1>
                    {!sessionStorage.getItem('total') && <Link to="/carrito"><FiShoppingCart size={30} className="carrito" /></Link>} 
                    {sessionStorage.getItem('total') && <Link to="/carrito"><FaShoppingCart size={30} className="carrito" /></Link>} 
                </div>
            </header>
        );
    }
}
 
export default Header;
import React from 'react';

import PaymentForm from './PaymentForm';
import 'react-credit-cards/es/styles-compiled.css';

function Compra() {
    return(
        <div className="compra">
            <h2> Finalizar Compra </h2>
            <h3> Total: € {sessionStorage.getItem('precioTotal')} </h3>
            <PaymentForm/>
            
        </div>
    )
}

export default Compra;



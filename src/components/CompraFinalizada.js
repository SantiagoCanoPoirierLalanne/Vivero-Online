import React from 'react';
import {useHistory} from "react-router-dom";

import {Alert} from 'react-bootstrap';

function CompraFinalizada() {

    const history = useHistory();
    function volverAHome() {
        history.push('/');
    }
    return(
        <div>
            <Alert variant="success">
                <p>¡Su compra ha sido exitosa! ¡Recibirá su pedido en 3 días hábiles!</p>
                <p>¡Muchas Gracias!</p>
                <button onClick={volverAHome} >ok</button>
            </Alert>
        </div>
    )  
}

export default CompraFinalizada;


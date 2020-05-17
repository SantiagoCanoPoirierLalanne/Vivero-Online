import React from 'react';

import {Link} from "react-router-dom";

export default class Producto extends React.Component {
    constructor(props){
        super(props);
        this.state = {  

        }
    }
    
    render() {
        return (
            <div className="producto-card" >
                <img className="producto-img" src={this.props.datos.img} />
                <div className="producto-info" >
                    <h2>{this.props.datos.name}</h2>
                    <h2> €{this.props.datos.price} </h2>
                    <button className="card-btn" ><Link className="card-btn-link" to={`/productos/${this.props.datos.id}`} >VER DETALLE</Link></button>
                </div>
            </div> 
        )
    }
}


import React from 'react';
import Cards from 'react-credit-cards';

import { Redirect } from 'react-router-dom'

import firebase from '../Config/firebase';
 
export default class PaymentForm extends React.Component {
  state = {
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
    redirect: false
  };

  componentDidMount(){
    let key = localStorage.getItem('key');
    console.log(key); 
  }

  handleInputFocus = (e) => {
    this.setState({ focus: e.target.name });
  }
  
  handleInputChange = (e) => {
    const { name, value } = e.target;
    
    this.setState({ [name]: value });
  }

  finalizarCompra = (e) => {
    
    var hoy = new Date();
    var fecha = hoy.getDate() + '-' + (hoy.getMonth()+1) + '-' + hoy.getFullYear();
    var hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    var fechaYHora= fecha + ' ' + hora;
  
    let key = localStorage.getItem('key');
    let precioTotal=sessionStorage.getItem('precioTotal');

    var pedido= JSON.parse(sessionStorage.getItem('total'));

    firebase.database().ref(`usuarios/${key}/pedidos/${fechaYHora}`).set({
      pedido: pedido,
      total: precioTotal
    })
    
    sessionStorage.clear();

    this.setState({
      redirect: true
    });

  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/compraFinalizada' />
    }
  }

  render() {
    return (
      <div id="PaymentForm">
        {this.renderRedirect()}
        <Cards
          cvc={this.state.cvc}
          expiry={this.state.expiry}
          focused={this.state.focus}
          name={this.state.name}
          number={this.state.number}
        />
        <br/>
        <h4>Complete los datos de su tarjeta</h4>
        <form onSubmit={this.finalizarCompra}>
          <input
                type="tel"
                name="number"
                placeholder="Card Number"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                required
                className="payment-form-input"
            /><br/>
            <input
                type="text"
                name="name"
                placeholder="Card Name"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                required
                className="payment-form-input"
            /><br/>
            <input
                type="tel"
                name="expiry"
                placeholder="Expiry Date"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                required
                className="payment-form-input"
            /> <br/>
            <input
                type="tel"
                name="cvc"
                placeholder="cvc"
                onChange={this.handleInputChange}
                onFocus={this.handleInputFocus}
                required
                className="payment-form-input"
            /> <br/><br/>
            <button className="payment-form-btn" type="submit" >COMPRAR</button>       
        </form>
      </div>
    );
  }
}
import React, { Component } from 'react';
import Producto from './Producto';
import { Container, Col, Row} from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            error: null,
            isLoaded: false,
            productos:[],
            categorias:["Todas", "Aromáticas","Frutales","Flores"],
            categoriaSeleccionada:("Todas")
        }
        this.verCategoria=this.verCategoria.bind(this);
    }

    componentDidMount(){
        fetch("https://my-json-server.typicode.com/motita2310/viveroProductos/posts")
        .then(res => res.json())
        .then(
            (result) => {
                console.log(result)
                this.setState({
                    isLoaded:true,
                    productos:result
                });
            },
            (error) => {
                console.log(error.message)
                this.setState({
                    isLoaded:true,
                    error:error
                });
            }
        )
    }

    verCategoria(e) {
        let categ = e.target.value;
        this.setState({categoriaSeleccionada:categ}) 
    }
    
    render() { 
        
        let buttons = this.state.categorias.map (cate => {
            return (
                <button className="categorias-btn" onClick={this.verCategoria} value={cate} >
                    {cate.toUpperCase()}
                </button>
            )
        })

        let prods = this.state.productos.map (prod => {
            return (
                <Col sm="6">
                    <Producto key={prod.id} datos={prod}/>
                </Col>
            )
        })

        let arom = this.state.productos.filter ( prod => prod.category === "Aromáticas");
        let aromaticas = arom.map (ar => {
            return (
                <Col sm="6">
                    <Producto key={ar.id} datos={ar}/>
                </Col>
            )
        })

        let frut = this.state.productos.filter ( prod => prod.category === "Frutales");
        let frutales = frut.map (fr => {
            return (
                <Col sm="6">
                    <Producto key={fr.id} datos={fr}/>
                </Col>
            )
        })

        let flor = this.state.productos.filter ( prod => prod.category === "Flores");
        let flores = flor.map (fl => {
            return (
                <Col sm="6">
                    <Producto key={fl.id} datos={fl}/>
                </Col>
            )
        })
        

        const{error,isLoaded,productos}=this.state;
        if (error) {
            return (<div>Error: {error} </div>)
        } else if (!isLoaded) {
            return (<div /* className="loading-container" */><h2 /* className="loading" */>Loading...</h2></div>)
        } else {
            return (  
                <div>
                    <h2 className="home-title">NUESTROS PRODUCTOS</h2> 
                    <h3 className="home-subtitle">Categorias</h3>
                    <div className="categorias-btn-container">
                        <div className="categorias-btn-container2">{buttons}</div>
                    </div>
                     
                    <Container>
                        {this.state.categoriaSeleccionada === "Todas" && <Row> {prods} </Row> }
                        {this.state.categoriaSeleccionada === "Aromáticas" && <Row> {aromaticas} </Row> }
                        {this.state.categoriaSeleccionada === "Frutales" && <Row> {frutales} </Row> }
                        {this.state.categoriaSeleccionada === "Flores" && <Row> {flores} </Row> }
                    </Container>
                    
                </div>
            )
        }  
    }
    
}
 
export default Home;

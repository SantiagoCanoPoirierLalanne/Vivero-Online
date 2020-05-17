import React,{useState, useEffect}  from 'react';
import {useParams,useHistory} from "react-router-dom";

function DetalleProducto() {
    const [datos,setDatos]=useState({});
    const {id} = useParams();
    const history = useHistory();

    const [isLoaded,setisLoaded]= useState(false);

    const [cantidad, setCantidad] = useState()

    const [pedidoHecho,setPedidoHecho]= useState(/* {prod:"",precio:"", cantidad:""} */)

    const [pedidoTotal,setPedidoTotal] = useState();

    useEffect(
        () => {
            fetch(`https://my-json-server.typicode.com/motita2310/viveroProductos/posts/${id}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setDatos(result)
                    setisLoaded(true)
                },
                (error) => {
                    console.log(error.message)
                }
            )       
        }
    )

    useEffect(
        () => {
            if (sessionStorage.getItem('total')) {
                setPedidoTotal(JSON.parse(sessionStorage.getItem('total')))
                console.log(pedidoTotal)
            }  
        }
    , [])
    
    function handleClick() {
        history.push("/")  
    }

    function handleChange(e) {
        const cantidad = parseInt(e.target.value)
        setCantidad(parseInt(cantidad))
        setPedidoHecho({prod:datos.name,precio:datos.price, cantidad:cantidad})
    }

    function agregarAlCarrito() {
        if (cantidad >= 1) {
            var array = [];
            if (pedidoTotal) {
                console.log(pedidoTotal);
                pedidoTotal.map(p => {
                    array.push(p)
                })
                //console.log("entro")
            }
            array.push(pedidoHecho)
            console.log(array)
            sessionStorage.setItem('total',JSON.stringify(array));
            
            //recargo la pagina para que se actualice el color del carrito
            window.location.reload(true);
        } else{
            alert('debe introducir una cantidad mayor a 0')
        } 
    }

    if (isLoaded === false) {
        return (<div><h2 >Loading...</h2></div>)
    } else if (isLoaded === true) {
        return (
            <div className="detalle-prod-container">
                <img className="detalle-prod-img" src={datos.img} />
                <div className="detalle-prod-info">
                    <h2>{datos.name} - {datos.category} </h2>
                    <h2>€{datos.price} </h2>
                    <p>{datos.description} </p>
                    <p>sku:{datos.sku} </p>
                    <div className="detalle-prod-carrito">
                        <label>Cantidad: </label>
                        <input className="detalle-prod-input" type="number" min="1" required value={cantidad} onChange={handleChange} name="cantidad"/>
                        <button className="detalle-prod-btn detalle-prod-btn-carrito" onClick={agregarAlCarrito}>AGREGAR AL CARRITO</button>
                    </div>
                    <button className="detalle-prod-btn" onClick={handleClick} >Volver</button>
                </div>
            </div>
        )
    }
}

export default DetalleProducto;
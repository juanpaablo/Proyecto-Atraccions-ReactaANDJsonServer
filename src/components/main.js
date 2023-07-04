import React, {useState, useEffect} from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import "C:/Users/pablo/react/final-prog-01/src/styles/main.css"

function Listado (){
    const Url= "http://localhost:3005/atracciones"
    let username=sessionStorage.emailusuario
    const Getlist = async () =>{
        const response = await axios.get(Url)
        return response

    }
const cerrarsession =() =>{
  sessionStorage.clear()
  window.location.reload()
}
    const [List, setNewList]= useState([])
    useEffect(() =>{
      Getlist().then((response) =>{
        setNewList(response.data)
      });
    }, []);
    <Link to="Login" > <button>Login</button></Link>
    const content = List.map((card) =>

    
  <div className='container' key={card.id}>
    <div className='card' key={card.id}>
      <h3>{card.name}</h3>
      <img alt='notFOUND' width='100%' src={card.img}></img>
      <p>{card.direccion}</p>
      <button onClick={
        (del) =>{
          axios.delete(Url+'/'+card.id).then((response)=>
          { if (response.status=== 200){
            alert(card.name + " se borro exitosamente ")
            window.location.reload()
          } })
        }
      } > borrar </button>
      <Link to={`/atracciones/${card.id}`  } > <button>mostrar atraccion</button></Link>
      <Link to={"/Edit"}>
  <button>editar</button>
</Link>
 
      
      <br></br>
      
    </div>
  </div>)
  return <div> <h1> bienvenido {username}  </h1> <button onClick={cerrarsession} >cerrar session</button> <div> <Link to="/atraccion" > <button>agregar atraccion</button> </Link>
     <Link to="/Register" > <button>registrar usuarios</button> </Link>
     <Link to="/Login2" > <button>login</button> </Link>
     
   {content}</div></div>
}

export default Listado;
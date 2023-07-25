import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import "../styles/atraccion.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Atraccion (){
 const url= "http://localhost:3005/atracciones"
 const [NewAtraccion, setNewAtraccion] = useState({
   name:"",
   direccion:"",
   img:"",
   latitud:"",
   longitud:"",
   pais:""
 });
 //el e.target.name hace referencia a la propiedad del input del html basicamente captura lo que haya en ese input con el nombre y lo pasa a la database
const handleChange= (e) =>{
setNewAtraccion({
    ...NewAtraccion,
    [e.target.name]: e.target.value,
})}
const addAtraccion = async (e) =>{
    e.preventDefault();
    if (NewAtraccion.name === "" || NewAtraccion.direccion === "" || NewAtraccion.img === ""|| NewAtraccion.pais === "") {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return
    }
const response = await axios.post(url,NewAtraccion);
console.log(response);
if(response.status === 201){
    toast.success(NewAtraccion.name + " se agrego correctamente ")
    resetform()
} else{
    toast.error("error al crear una nueva atraccion")
    toast.error("intente nuevamente mas tarde")
}

}
const resetform =() =>{
    setNewAtraccion({
        name:"",
        direccion:"",
        img:"",
        latitud:"",
        longitud:"",
        pais:""
    })
}
return (
    <div className="container-atraccion">
      <form className="form-insert-atraccion" onSubmit={addAtraccion}>
        <div className="form-group">
          <label className="label-atraccion"> Name: </label>
          <input
            className="input"
            placeholder="insert the name of the attraction"
            type="text"
            name="name"
            onChange={handleChange}
            value={NewAtraccion.name}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> direccion: </label>
          <input
            className="input"
            placeholder="Insert direccion"
            type="text"
            name="direccion"
            value={NewAtraccion.direccion}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> image: </label>
          <input
            className="input"
            placeholder="insert image url"
            type="text"
            //hace referencia a esto
            name="img"
            value={NewAtraccion.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> latitud: </label>
          <input
            className="input"
            placeholder="insert latitud"
            type="text"
            //hace referencia a esto
            name="latitud"
            value={NewAtraccion.latitud}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> longitud: </label>
          <input
            className="input"
            placeholder="insert longitud"
            type="text"
            //hace referencia a esto
            name="longitud"
            value={NewAtraccion.longitud}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> pais: </label>
          <input
            className="input"
            placeholder="insert el pais de la atraccion"
            type="text"
            //hace referencia a esto
            name="pais"
            value={NewAtraccion.pais}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="button">
          ADD
        </button>
        <br/> 
        <br/> 
        
        
        <ToastContainer/>
        <Link to="/"> <button className="simple" > ver las atrraciones registradas</button> </Link>
      </form>

      
      
    </div>
    
  );


}


export default Atraccion;
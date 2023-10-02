import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import "../styles/atraccion.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Locales (){
 const url= "http://localhost:3005/locales"
 const [NewLocal, setNewLocal] = useState({
   name:"",
   direccion:"",
   img:"",
   pais:"",
   referencias:""
 });
 //el e.target.name hace referencia a la propiedad del input del html basicamente captura lo que haya en ese input con el nombre y lo pasa a la database
const handleChange= (e) =>{
setNewLocal({
    ...NewLocal,
    [e.target.name]: e.target.value,
})}
const addAtraccion = async (e) =>{
    e.preventDefault();
    if (NewLocal.name === "" || NewLocal.direccion === "" || NewLocal.img === ""|| NewLocal.pais === "") {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return
    }
const response = await axios.post(url,NewLocal);
console.log(response);
if(response.status === 201){
    toast.success(NewLocal.name + " se agrego correctamente ")
    resetform()
} else{
    toast.error("error al crear una nueva atraccion")
    toast.error("intente nuevamente mas tarde")
}

}
const resetform =() =>{
    setNewLocal({
        name:"",
        direccion:"",
        img:"",
        pais:"",
        referencias:""
    })
}
return (
    <div className="container-atraccion">
      <form className="form-insert-atraccion" onSubmit={addAtraccion}>
        <div className="form-group">
          <label className="label-atraccion"> Name: </label>
          <input
            className="input"
            placeholder="insert the name of the local"
            type="text"
            name="name"
            onChange={handleChange}
            value={NewLocal.name}
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
            value={NewLocal.direccion}
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
            value={NewLocal.img}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> referencias: </label>
          <input
            className="input"
            placeholder="insert referencias"
            type="text"
            //hace referencia a esto
            name="referencias"
            value={NewLocal.referencias}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> pais: </label>
          <input
            className="input"
            placeholder="insert el pais del local"
            type="text"
            //hace referencia a esto
            name="pais"
            value={NewLocal.pais}
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


export default Locales;
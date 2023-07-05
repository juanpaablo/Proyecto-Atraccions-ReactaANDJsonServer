import React, { useState } from "react";
import {Link} from "react-router-dom"
import axios from "axios";
function Atraccion (){
 const url= "http://localhost:3005/atracciones"
 const [NewAtraccion, setNewAtraccion] = useState({
   name:"",
   direccion:"",
   img:"",
   latitud:"",
   longitud:""
 });
 //el e.target.name hace referencia a la propiedad del input del html basicamente captura lo que haya en ese input con el nombre y lo pasa a la database
const handleChange= (e) =>{
setNewAtraccion({
    ...NewAtraccion,
    [e.target.name]: e.target.value,
})}
const addAtraccion = async (e) =>{
    e.preventDefault();
const response = await axios.post(url,NewAtraccion);
console.log(response);
if(response.status === 201){
    alert(NewAtraccion.name + " se agrego correctamente ")
    resetform()
} else{
    alert("error al crear una nueva atraccion")
    alert("intente nuevamente mas tarde")
}

}
const resetform =() =>{
    setNewAtraccion({
        name:"",
        direccion:"",
        img:"",
        latitud:"",
        longitud:""
    })
}
return (
    <div className="container">
      <form onSubmit={addAtraccion}>
        <div className="form-group">
          <label className="label"> Name: </label>
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
          <label className="label"> direccion: </label>
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
          <label className="label"> image: </label>
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
          <label className="label"> latitud: </label>
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
          <label className="label"> longitud: </label>
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

        <button type="submit" className="button">
          ADD
        </button>
        <br/> 
        <br/> 
        
        

        
      </form>

      <Link to="/Login2"> <button> Login</button> </Link>
      <Link to="/"> <button> ver las atrraciones registradas</button> </Link>
      
    </div>
    
  );


}


export default Atraccion;
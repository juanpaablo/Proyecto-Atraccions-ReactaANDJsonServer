import React, { useState } from "react";
import axios from "axios";
import {  Link } from 'react-router-dom';
import "../styles/register.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//esta funcion se encargara de setear cada nuevo registro que pondremos
function Register() {
  const Url = "http://localhost:3005/users";
  

  const [newRegister, setNewRegister] = useState({
    name: "",
    lastname: "",
    dni: "",
    email: "",
  });
//aqui solo usaremos el name por que repetiremos la funcion para cada input
//esta funcion capturara los registros y los guardara segun lo que digamos.
  const handleChange = (e) => {
    setNewRegister({
      ...newRegister,
      [e.target.name]: e.target.value,
    });
  };

  const addRegister = async (e) => {
    e.preventDefault(); //para que el navegador no se actualice con el sumbit
    if (newRegister.name === "" || newRegister.lastname === "" || newRegister.dni === ""|| newRegister.email === "") {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return;
    }
    const response = await axios.post(Url, newRegister);
    console.log(response);
    if (response.status === 201) {
      alert(newRegister.name + " se agregó exitosamente");
      
      console.log("se agrego correctamente")
     Resetform()
    } else {
      alert("No se pudo agregar");
    }
  };
  const Resetform = () => {
    setNewRegister ({
        name: "",
    lastname: "",
    dni: "",
    email: "",

    })
  }


  return (
    <div className="container">
      <form  className="form-insert-atraccion" onSubmit={addRegister}>
        <div className="form-group">
          <label className="label-atraccion"> Name: </label>
          <input
            className="input"
            placeholder="Insert name"
            type="text"
            name="name"
            onChange={handleChange}
            value={newRegister.name}
            required
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Last Name: </label>
          <input
            className="input"
            placeholder="Insert last name"
            type="text"
            name="lastname"
            value={newRegister.lastname}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Email: </label>
          <input
            className="input"
            placeholder="Insert email"
            type="text"
            name="email"
            value={newRegister.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Dni: </label>
          <input
            className="input"
            placeholder="Insert Dni"
            type="decimal"
            name="dni"
            value={newRegister.dni}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="button">
          ADD
        </button>
        <br/> <br/>
        

        <ToastContainer/>
      </form>
      <Link to="/atraccion"> <button className="simple"> agregar atracion</button> </Link>
    </div>
    
  );
  
}

export default Register;

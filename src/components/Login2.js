import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import Register from "./register";

function Login2() {
    //almacenare la database en una variable llamada url
  const Url = "http://localhost:3005/users";
  //creare states que usare
  const [email, setEmail] = useState('');
  const [dni, setDni] = useState('');
  //const [name, setname]= useState('')
//esta funcion se encargara de obtener los datos exactos que usare, especificamente el email y el dni
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(Url, {
        //guardara los datos del state email y dni y luego confiramara si existen en la base de datos
        params: {
          email,
          dni,
        }
      });
//si la variable response obtiene los datos solicitados esta sera de valor 1 entonces signficara que existe este usuario y si es 0 significa que no existe
      if (response.data.length === 1  ) {
        alert("Inicio de sesión correcto");
        resetEmail();
        resetDni();
        sessionStorage.setItem("emailusuario", email)
      }
       else if (response.data.length >= 2) {
        alert("hay 2 usuarios iguales");
      }
      else{
        alert("credenciales invalidas")
      }
    } catch (error) {
      console.error(error);
    }
  };
//esta funcion sirve para setear los inputs a su forma original y que queden vacios
  const resetEmail = () => {
    setEmail("");
  };
  const resetDni = () => {
    setDni("");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label"> Email </label>
          <input
            type="text"
            className="input"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="label"> DNI </label>
          <input
            type="text"
            className="input"
            placeholder="DNI"
            value={dni}
            //esta funcion actuliazara el valor en el estado del componente segun lo que escribamos
            //basicamente sirve para hacer la comparacion entre lo que ingresemos y lo que esta en el response
            //si lo borramos no se podra comparar
            onChange={(e) => setDni(e.target.value)}
          />
        </div>
        <button type="submit" className="button">Iniciar sesión</button>
      </form>
      <Link to="/Register" className="link"> Registrarse </Link>
    </div>
  );
}

export default Login2;

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import axios from "axios";
import "../styles/dropdown.css"
import "../styles/dropdowlogin.css"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
  function Dropdownlogin() {
  const [Dropdown1, setdropdown] = useState(false);
  const [dropdownInputFocused, setDropdownInputFocused] = useState(false); // Nuevo estado para rastrear el enfoque del campo de entrada
  const [Usuario, setUsuario] = useState ('')
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
          toast.success("Inicio de sesión correcto",{
            position: toast.POSITION.TOP_CENTER
          });
          resetEmail();
          resetDni();
          sessionStorage.setItem("emailusuario", email)
          setUsuario(email)
        }
         else if (response.data.length >= 2) {
          alert("hay 2 usuarios iguales");
        }
        else{
          toast.warning('credenciales invalidas',{
            theme:"colored",
            position:toast.POSITION.TOP_CENTER
          })
         // alert("credenciales invalidas")
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

  const cerrarsession = () => {
    sessionStorage.clear();
    window.location.reload();

  };


  const abrircerrardropdown = () => {
    if (!dropdownInputFocused) {
      setdropdown(!Dropdown1);
    }
  };
  //este input basicamente lo que hace es que verifica si el enfoque esta en el input y si es asi no se cerrara
  const handleInputFocus = () => {
    setDropdownInputFocused(true);
  };
  //si puerde el enfoque este se activara y cerrara
  const handleInputBlur = () => {
    setDropdownInputFocused(false);
  };
  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
      <Dropdown  isOpen={Dropdown1} toggle={abrircerrardropdown}>
        <DropdownToggle caret className="dropbtn" >Login</DropdownToggle>
        <DropdownMenu container="body">
          <DropdownItem header>bienvenido {Usuario}</DropdownItem>
          <DropdownItem>
            <input
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
                type="text"
                name="email"
                placeholder="Email"
                className="input-login"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
          </DropdownItem>
          <input
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
              type="text"
              placeholder="dni"
              className="input-login"
              name="dni"
              value={dni}
              onChange={(e) => setDni(e.target.value)}
          />
          <DropdownItem >
            <button className="simple"
             onClick={handleSubmit} 
              type="submit"
              name="submit"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}>
                Iniciar sesion
               </button>
               
               <button 
               className="simple"
               onClick={cerrarsession}
               onFocus={handleInputFocus}
               onBlur={handleInputBlur}>
                cerrar sesion
               </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ToastContainer/>
      </form>
    </div>
    
    
  );
}

export default Dropdownlogin;
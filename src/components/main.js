import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Busqueda from "./barrabuscadora";

import "C:/Users/pablo/react/final-prog-01/src/styles/main.css";

function Listado() {
  const Url = "http://localhost:3005/atracciones";
  let username = sessionStorage.emailusuario;

  const [Filteredlist, setFilteredlist]= useState([])
  const [List, setNewList] = useState([]);

  const Getlist = async () => {
    try {
      const res = await axios.get(Url);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };
  

  const cerrarsession = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  

  useEffect(() => {
    Getlist().then((data) => {
      setNewList(data);
    });
  }, []);
  
  const filtrarAtracciones = (termino) => {
    const resBusqueda = List.filter((atraccion) =>
      atraccion.name.toLowerCase().includes(termino.toLowerCase())
    );
    setFilteredlist(resBusqueda);
  };
  
//hago un ternario que dice que si filtered list captura algo que se muestre sino que se muestre todo
  const content = (Filteredlist.length > 0 ? Filteredlist : List).map((card) => (
    <div className="card" key={card.id}>
      <h3>{card.name}</h3>
      <img alt="notFOUND" width="100%" src={card.img}></img>
      <p className="direccions">{card.direccion}</p>
      <button
        onClick={(del) => {
          axios.delete(Url + '/' + card.id).then((response) => {
            if (response.status === 200) {
              alert(card.name + " se borró exitosamente");
              window.location.reload();
            }
          });
        }}
      >
        borrar
      </button>
      <Link to={`/atracciones/${card.id}`}>
        <button>mostrar atracción</button>
      </Link>
      <Link to="/Edit">
        <button>editar</button>
      </Link>
      <br></br>
    </div>
  ));

  return (
    <div>
      <h1>bienvenido {username}</h1>
      <Busqueda onFiltrar={filtrarAtracciones} />

      <button className="cerrarsesion" onClick={cerrarsession}>cerrar sesión</button>
      <div className="botones-sup">

      
      
      <Link to="/atraccion">
          <button>agregar atracción</button>
        </Link>
        <Link to="/Register">
          <button>registrar usuarios</button>
        </Link>
        <Link to="/Login2">
          <button>login</button>
        </Link>
        <Link to="/barrabuscadora">
          <button>prueba de busqueda</button>
        </Link>
        </div>
      <div className="container-principal">
        
        {content}
      </div>
    </div>
  );
}

export default Listado;

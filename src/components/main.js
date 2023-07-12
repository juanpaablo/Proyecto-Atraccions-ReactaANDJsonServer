import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, } from "react-router-dom";
import Busqueda from "./barrabuscadora";
import Dictaphone from "./busquedaporvoz";

import "C:/Users/pablo/react/final-prog-01/src/styles/main.css";

function Listado() {
  const Url = "http://localhost:3005/atracciones";
  let username = sessionStorage.emailusuario;

  const [Filteredlist, setFilteredlist]= useState([])
  const [List, setNewList] = useState([]);
  const [Selectoption, setSelectoption]= useState ("")
  const [Filteredvoice, setFilteredvoice]= useState ("")

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
      setFilteredlist(data)
    });
  }, []);
  useEffect(() => {
    const filtered = List.filter((item) => {
      if (Selectoption === "italia") {
        return item.pais === "italia";
      } else if (Selectoption === "argentina") {
        return item.pais === "argentina";
      } else {
        return true; // Si no se selecciona ninguna opción, mostrar todos los elementos
      }
    });
    setFilteredlist(filtered);
    //estos arreglos se aseguran de que se actualice cada vez que haya cambio en esos estados
  }, [List, Selectoption]);
  
  const filtrarAtracciones = (termino) => {
    const resBusqueda = List.filter((atraccion) =>
      atraccion.name.toLowerCase().includes(termino.toLowerCase())
    );
    setFilteredvoice(termino)
    // Filtrar también por búsqueda por voz
    const resBusquedaVoz = resBusqueda.filter((atraccion) =>
      atraccion.name.toLowerCase().includes(Filteredvoice.toLowerCase())
    );
  
    setFilteredlist(resBusquedaVoz);
  };
  
  const filtrarvoz= (e) => {
    setFilteredvoice(e)
  }
  
//hago un ternario que dice que si filtered list captura algo que se muestre sino que se muestre todo
  const content = (Filteredlist.length > 0 ? Filteredlist : List).map((card) => (
    <div className="card" key={card.id}>
      <h3>{card.name}</h3>
      <img alt="notFOUND" width="100%" src={card.img}></img>
      <p className="direccions">{card.direccion}</p>
      <button
      className="simple"
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
        <button className="simple">mostrar atracción</button>
      </Link>
      <Link to="/Edit">
        <button className="simple">editar</button>
      </Link>
      <br></br>
    </div>
  ));

  return (
    <section id="barrabuscadora">
      <h1>bienvenido {username}</h1>
      <Busqueda onFiltrar={filtrarAtracciones} />
      <Dictaphone  onfiltrar1={filtrarAtracciones} busquedaVoz={Filteredvoice} />

      <section>
  <label htmlFor="filterSelect">Filtrar por:</label>
  <select id="filterSelect" value={Selectoption} onChange={(e) => setSelectoption(e.target.value)}>
    <option value="">Todos</option>
    <option value="argentina">argentina</option>
    <option value="italia">italia</option>
  </select>
</section>

      <button  className="simple" onClick={cerrarsession}>cerrar sesión</button>
      <div className="botones-sup">

      
      
      <Link to="/atraccion">
          <button className="simple">agregar atracción</button>
        </Link>
        <Link to="/Register">
          <button className="simple">registrar usuarios</button>
        </Link>
        <Link to="/Login2">
          <button className="simple" >login</button>
        </Link>
        <Link to="/busquedaporvoz">
          <button className="simple" >prueba de busqueda por voz</button>
        </Link>
        </div>
      <div className="container-principal">
        
        {content}
      </div>
    </section>
  );
}

export default Listado;

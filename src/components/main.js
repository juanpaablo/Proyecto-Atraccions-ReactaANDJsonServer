import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Busqueda from "./barrabuscadora";
import Dictaphone from "./busquedaporvoz";
import Dropdownlogin from "./dropdowlogin";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/main.css"

function Listado() {
  const Url = "http://localhost:3005/atracciones";

  const [Filteredlist, setFilteredlist] = useState([]);
  const [List, setNewList] = useState([]);
  const [Selectoption, setSelectoption] = useState("");
  const [Filteredvoice, setFilteredvoice] = useState("");
  const [Usevoice, setUsevoice] = useState(false);
  const [UniqueCountries, setUniqueCountries] = useState([]);

  const Getlist = async () => {
    try {
      const res = await axios.get(Url);
      return res.data;
    } catch (error) {
      console.log(error);
      return [];
    }
  };


  useEffect(() => {
    Getlist().then((data) => {
      setNewList(data);
      setFilteredlist(data);
    });
  }, []);
  console.log(Filteredlist)
  useEffect(() => {
    const countries = new Set(List.map((atraccion) => atraccion.pais));
    setUniqueCountries(Array.from(countries));
  }, [List]);

  useEffect(() => {
    const filtered = List.filter((item) => {
      if (Selectoption !== "" && Selectoption !== "Todos") {
        return item.pais === Selectoption;
      } else {
        return true;  // Si no se selecciona ninguna opción o se selecciona "Todos", mostrar todos los elementos
      }
    });
    setFilteredlist(filtered);
  }, [List, Selectoption]);

  const filtrarAtracciones = (termino) => {
    const resBusqueda = List.filter((atraccion) =>
      atraccion.name.toLowerCase().includes(termino.toLowerCase())
    );

    // Filtrar también por búsqueda por voz
    const resBusquedaVoz = resBusqueda.filter((atraccion) =>
      atraccion.name.toLowerCase().includes(Filteredvoice.toLowerCase())
    );

    setFilteredlist(resBusquedaVoz);
  };

  const filtrarvoz = (e) => {
    setFilteredvoice(e);
  };
  const togleusevoice = () => {
    setUsevoice(!Usevoice);
    setFilteredlist("")
  };
console.log(filtrarvoz)
  const content = (Filteredlist.length > 0 ? Filteredlist : List).map((card) => (
    <div className="card" key={card.id}>
      <h3 className="texth3">{card.name}</h3>
      <img alt="notFOUND" width="100%" src={card.img}></img>
      <p className="direccions">{card.direccion}</p>
      <div className="botones-atraccions">
      <button
        className="simple"
        onClick={(del) => {
          axios.delete(Url + "/" + card.id).then((response) => {
            if (response.status === 200) {
              toast.success(card.name + " se borró exitosamente");
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
    </div>
  ));

  return (
    <div>
      <section id="barra-superior">
        <Dropdownlogin />
        <div id="buscadores" >
        {Usevoice ? (
          <Dictaphone onfiltrar1={filtrarAtracciones} busquedaVoz={Filteredvoice} />
        ) : (
          <Busqueda onFiltrar={filtrarAtracciones} />
        )}
        <button className="simple" onClick={togleusevoice}>
          Voice
        </button>
        </div>
        <label htmlFor="filterSelect">Filtrar por:</label>
        <select
          id="filterSelect"
          value={Selectoption}
          onChange={(e) => setSelectoption(e.target.value)}
        >
          <option value="">Todos</option>
          {UniqueCountries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </section>
      
      <section id="section-botones">
        
          <Link to="/atraccion">
            <button className="simple">agregar atracción</button>
          </Link>
          <Link to="/Register">
            <button className="simple">registrar usuarios</button>
          </Link>
          <Link to="/locales">
        <button className="simple">agregar local</button>
      </Link>
      <Link to="/localescarrusel">
        <button className="simple">mostrar local</button>
      </Link>
        </section>
        <ToastContainer/>
        <div className="container-principal">{content}</div>
      
    </div>
  );
}

export default Listado;
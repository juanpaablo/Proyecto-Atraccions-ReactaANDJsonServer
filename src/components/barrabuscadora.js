import React, { useState, useRef } from "react";
import "../styles/barrabuscadora.css"

function Busqueda({onFiltrar}) {
  const contadoref = useRef(null);
  const [busquedaBarra, setBusquedaBarra] = useState("");


  const handleChange = (e) => {
    const termino = e.target.value;
    setBusquedaBarra(termino);

    if (contadoref.current) {
      clearTimeout(contadoref.current);
    }

    contadoref.current = setTimeout(() => {
        onFiltrar(termino);
      }, 350);
  };



  return (
    <div className="search-container">
      <input 
        
        type="text"
        className="form-control"
        placeholder="Buscar lugares"
        onChange={handleChange}
        
      />
    </div>
  );
}

export default Busqueda;

import React, {  useRef } from "react";
import "../styles/barrabuscadora.css"

function Busqueda({onFiltrar}) {
  const contadoref = useRef(null);
  


  const handleChange = (e) => {
    const termino = e.target.value;

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
        className="form-search"
        placeholder="Buscar lugares"
        onChange={handleChange}
        
      />
    </div>
  );
}

export default Busqueda;

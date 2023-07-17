import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/carrusel.css";
import { useSearchParams } from "react-router-dom";

function Carrusel({ imagenes }) { 
  const [ImagenActual, setImagenActual] = useState(0);
  const cantidad = imagenes?.length;

  if (!Array.isArray(imagenes) || cantidad === 0) {
    return <div>No hay imágenes disponibles.</div>;
  }

  const siguienteimagen = () => {
    setImagenActual((prevImagenActual) => (prevImagenActual + 1) % cantidad);
  };

  const anteriorimagen = () => {
    setImagenActual((prevImagenActual) => (prevImagenActual - 1 + cantidad) % cantidad);
  };
console.log(ImagenActual)
  return (
    <div className="container">
      <button onClick={anteriorimagen}>atras</button>
      {imagenes.map((imagen, index) => (
        <div className={ImagenActual === index ? `${Carrusel.slide} ${Carrusel.active}` : Carrusel.slide} key={index}>
          {ImagenActual === index && <img src={imagen} alt="imagen actual" />}
        </div>
      ))}
      <button onClick={siguienteimagen}>adelante</button>
    </div>
  );
}

export default Carrusel;

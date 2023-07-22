import React, { useState } from "react";

import "../styles/carrusel.css";


function Carrusel({ imagenes }) { 
  const [ImagenActual, setImagenActual] = useState(0);
  const cantidad = Array.isArray(imagenes) && imagenes.length > 0 ? imagenes.length : 0;


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
  <div className="container-carrusel">
    <button className="simple" onClick={anteriorimagen}>←</button>
    {imagenes.map((imagen, index) => (
      <div
      
        className={`slide ${ImagenActual === index ? 'active slide-transition' : ''}`}
        key={index}
      >
        {ImagenActual === index && <img className="img-carrusel" src={imagen} alt="imagen actual" />}
        
      </div>
    ))}
    <button className="simple" onClick={siguienteimagen}>→</button>
    
  </div>
);


}

export default Carrusel;

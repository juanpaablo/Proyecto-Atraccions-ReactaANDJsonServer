import React from "react";
import axios from "axios";
import "../styles/carrusel.css"
function carrusel ({imagenes}){
  return  <div className="container" >
    <button> atras </button>
    {imagenes.map((imagen, index) =>{
      return <img key={index} src={imagen} alt="imagen" ></img>
    })}
    <button> adelante </button>
  </div>

}
export default carrusel;
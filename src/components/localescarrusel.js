import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Localcarrusel({imagenlocal}) {
  const {id} = useParams
  const [Filteredlist, setnewfilteredlist] = useState([]);
  const [list, setnewlist] = useState([]);
  const [imagenestest, setimagenestest] = useState(null)
  const [imagenestest1, setimagenestest1] = useState(null)
  const url = "http://localhost:3005/locales";

  const getlist = async () => {
    try {
      const res = await axios.get(url);
      return res.data;
    } catch (error) {
      alert("No se puede mostrar nada");
      return [];
    }
  };

  useEffect(() => {
    getlist().then((data) => {
      setnewfilteredlist(data);
      setnewlist(data)
      setimagenestest1(data.img)
    });
  }, []);
  useEffect(() => {
    if (Filteredlist.length > 0) {
      const images = Filteredlist.map((item) => item.img);
      setimagenestest(images)
    }
  }, [Filteredlist]);
  console.log(imagenestest)
  const getDetalles = async () =>{
    try {
      //hace la peticion para obtener de la tabla images en la bd las imagenes restantes
      const imagenesResponse = await axios.get(`http://localhost:3005/locales?atraccionid=${id}`);
      const imagenes = imagenesResponse.data[2];
      //conviete un objeto a array para que se manejable
      const imagenesArray = Object.values(imagenes).slice(0);
      setimagenestest(imagenesArray);
      setimagenestest1(imagenesArray[3])
    } catch (error) {
      
    }
  }

  console.log(Filteredlist);

  const content = (Filteredlist.length > 0 ? Filteredlist : list).map((card) => (
    <div className="card" key={card.id}>
      <h3 className="texth3">{card.name}</h3>
      <img alt="notFOUND" width="100%" src={card.img}></img>
      <p className="direccions">{card.direccion}</p>
      <div className="botones-atraccions"> {/* Aquí falta cerrar esta etiqueta */}
      </div>
    </div>
  ));

  return <div>{content}</div>;
}

export default Localcarrusel;

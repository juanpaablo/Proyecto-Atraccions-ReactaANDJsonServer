import React, { useEffect, useState } from "react";
import axios from "axios";

function Localcarrusel() {
  const [Filteredlist, setnewfilteredlist] = useState([]);
  const [list, setnewlist] = useState([]);
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
    });
  }, []);

  useEffect(() => {
    if (Filteredlist.length > 0) {
      const nombres = Filteredlist.map((item) => item.name);
      console.log(nombres);
    }
  }, [Filteredlist]);

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

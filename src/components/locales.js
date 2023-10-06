import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/atraccion.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Locales() {
  const url = "http://localhost:3005/locales";
  const urlatraccion = "http://localhost:3005/atracciones";
  const [NewLocal, setNewLocal] = useState({
    name: "",
    direccion: "",
    img: "",
    pais: "",
    referencias: "",
    id:""
  });
  const [listatraccion, setlistatraccion] = useState([]);
  const [selectedAtraccion, setSelectedAtraccion] = useState({});
  const [selectedoption, setselectoption] = useState ("")

  const Getlist = async () => {
    const response = await axios.get(urlatraccion);
    return response;
  };

  const handleChange = (e) => {
    setNewLocal({
      ...NewLocal,
      [e.target.id]: e.target.value,
    });
  };

  const handleselect = (e) => {
    const selectedAtraccionName = e.target.value;
    const selectedAtraccion = listatraccion.find(
      (atraccion) => atraccion.name === selectedAtraccionName
    );
    setSelectedAtraccion(selectedAtraccion)
    setNewLocal({
      ...NewLocal,
      referencias:selectedAtraccionName
    })
    setselectoption(selectedAtraccionName)
  };
console.log(selectedAtraccion)
  const addAtraccion = async (e) => {
    e.preventDefault();
    if (
      NewLocal.name === "" ||
      NewLocal.direccion === "" ||
      NewLocal.img === "" ||
      NewLocal.pais === ""
    ) {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return;
    }
    const response = await axios.post(url, NewLocal);
    console.log(response);
    if (response.status === 201) {
      toast.success(NewLocal.name + " se agregó correctamente ");
      resetform();
    } else {
      toast.error("Error al crear una nueva atracción");
      toast.error("Intente nuevamente más tarde");
    }
  };

  const resetform = () => {
    setNewLocal({
      name: "",
      direccion: "",
      img: "",
      pais: "",
      referencias: ""
    });
    setSelectedAtraccion("");
    setselectoption("")

  };
  
console.log(selectedoption)
  useEffect(() => {
    Getlist().then((response) => {
      setlistatraccion(response.data);
    });
  }, []);
  return (
    <div className="container-atraccion">
      <form className="form-insert-atraccion" onSubmit={addAtraccion}>
        <div className="form-group">
          <label className="label-atraccion"> Name: </label>
          <input
            className="input"
            placeholder="Insert the name of the local"
            type="text"
            name="name"
            onChange={handleChange}
            value={NewLocal.name}
            required
            id="name"
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Direccion: </label>
          <input
            className="input"
            placeholder="Insert direccion"
            type="text"
            name="direccion"
            value={NewLocal.direccion}
            onChange={handleChange}
            id="direccion"
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Image: </label>
          <input
            className="input"
            placeholder="Insert image url"
            type="text"
            name="img"
            value={NewLocal.img}
            onChange={handleChange}
            id="img"
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Seleccionar atracción: </label>
          <select
            className="input"
            name="atraccion"
            onChange={handleselect}
            value={selectedoption}
          >
            <option value="">Seleccionar atracción</option>
            {listatraccion.map((atraccion) => (
              <option key={atraccion.id} value={atraccion.name}>
                {atraccion.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Referencias: </label>
          <input
            className="input"
            placeholder="Insert referencias"
            type="text"
            name="referencias"
            value={NewLocal.referencias}
            onChange={handleChange}
            id="referencias"
          />
        </div>
        <div className="form-group">
          <label className="label-atraccion"> Pais: </label>
          <input
            className="input"
            placeholder="Insert el pais del local"
            type="text"
            name="pais"
            value={NewLocal.pais}
            onChange={handleChange}
            id="pais"
          />
        </div>

        <button type="submit" className="button">
          ADD
        </button>
        <br />
        <br />

        <ToastContainer />
        <Link to="/">
          <button className="simple">Ver las atracciones registradas</button>
        </Link>
      </form>
    </div>
  );
}

export default Locales;

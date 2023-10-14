import React, { useEffect, useState } from "react";
import { Await, Link } from "react-router-dom";
import axios from "axios";
import "../styles/atraccion.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Dropwdownlocales from "./dropdowlocal";

function Locales() {
  const url = "http://localhost:3005/locales";
  const urlatraccion = "http://localhost:3005/atracciones";
  const urlimage = `http://localhost:3005/imageslocal`
  const [idselected, setidselected] = useState("");
  const [idlocal, setidlocal] = useState("")
  const [NewLocal, setNewLocal] = useState({
    name: "",
    direccion: "",
    img: "",
    pais: "",
    referencias: "",
    id: "",
    atraccionid:"",
  });
  const [imagesdata1, setimageadata1]= useState ()
  const [listatraccion, setlistatraccion] = useState([]);
  const [selectedAtraccion, setSelectedAtraccion] = useState({});
  const [selectedoption, setselectoption] = useState("");
  const Getidlocal = async () => {
    try {
      const response = await axios.get(url);
      if (response.data.length > 0) {
        // Obtener el último registro y sumar 1 al ID para obtener el siguiente ID
        const lastLocal = response.data[response.data.length - 1];
        const nextLocalId = lastLocal.id + 1;
        setidlocal(nextLocalId);
      } else {
        // Si no hay registros, establecer el ID en 1 (u otro valor predeterminado si es necesario)
        setidlocal(1);
      }
    } catch (error) {
      console.error("Error al obtener los datos", error);
    }
  }
  
    useEffect(() => {
      Getlist().then((response) => {
        setlistatraccion(response.data);
        Getidlocal(); // Llama a Getidlocal para obtener el id de locales
      });
    }, []);
console.log(idlocal)
  // OBTENGO LOS DATOS DE URLATRACCION Y LO GUARDO EN GETLIST
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
    // GUARDO LOS DATOS DEL INPUT EN SELECTED
    const selectedAtraccionName = e.target.value;
    // BUSCO LOS DATOS DE LISTAATRCCION Y COMPARO CON SELECTEDATRRACIONNAME
    const selectedAtraccion = listatraccion.find(
      (atraccion) => atraccion.name === selectedAtraccionName
    );
    // GUARDO EN EL STATE SELECTEDATRACCION LA FUNCION SELECTEDATRACCION
    setSelectedAtraccion(selectedAtraccion);
    setNewLocal({
      ...NewLocal,
      referencias: selectedAtraccionName,
       atraccionid:selectedAtraccion.id,
    });
    
    setselectoption(selectedAtraccionName);
    setidselected(selectedAtraccion.id);
  };
  console.log(selectedAtraccion);
  //todos los datos de newimage estan en handleimagedata y despues se guardan en setimagedata1
  const handleimagesdata = (imagesdata) =>{

    setimageadata1(imagesdata)

  }
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
    setNewLocal({
      ...NewLocal,
      localid:idlocal,
    })
    const response = await axios.post(url, NewLocal);
    const imageresponse = await axios.post (urlimage, imagesdata1)
    console.log(response);
    if (response.status === 201 && imageresponse.status ===201) {
      toast.success(NewLocal.name + " se agregó correctamente ");
      sendImagesToServer(); // Llama a la función para enviar imágenes al servidor
      resetform();
      window.location.reload()
    } else {
      toast.error("Error al crear una nueva atracción");
      toast.error("Intente nuevamente más tarde");
    }
  };
  console.log(NewLocal)
  const resetform = () => {
    setNewLocal({
      name: "",
      direccion: "",
      img: "",
      pais: "",
      referencias: "",
    });
    setSelectedAtraccion("");
    setselectoption("");
  };

  console.log(selectedoption);
  console.log(idlocal)

  // Función para enviar imágenes al servidor
  const sendImagesToServer = async (images) => {
    // Aquí puedes implementar la lógica para enviar las imágenes al servidor
    // Utiliza los datos de NewLocal y idselected según tus necesidades
    console.log("Imágenes a enviar:", images);
  };

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
        <div>
          <Dropwdownlocales idselected={idselected} onimagedata={handleimagesdata} idlocal={idlocal} />
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

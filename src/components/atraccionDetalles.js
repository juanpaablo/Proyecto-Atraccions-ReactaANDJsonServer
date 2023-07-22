import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Mapeado from "./maps";
import {IoChevronBackSharp} from 'react-icons/io5'
import Carrusel from "./carrusel";
import "../styles/atracciondetalles.css"

const AtraccionDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const usuarios = sessionStorage.getItem("emailusuario");
  const [comentarios, setComentarios] = useState([]);
  const [commentsActuales, setCommentsActuales] = useState({
    comments: ""
  });
  const [coordenadas, setcoordenadas]= useState(null)
  const [imagenestest, setimagenestest] = useState(null)
  const [imagenestest1, setimagenestest1] = useState(null)
  const [imagenestest2, setimagenestest2] = useState(null)
  const [statusimage, setstatusimage]= useState(false)
  const [newImage, setnewImage]= useState ({
    img1:"",
    img2:"",
    img3:"",
    atraccionid:id
  })
  const bd = "http://localhost:3005/comentarios";
  const Url = "http://localhost:3005/comentarios";
  const imagesurl= `http://localhost:3005/images`
  const addimage = async (e) =>{
    e.preventDefault()
    // Verificar si los campos de imágenes están vacíos
  if (newImage.img1 === "" || newImage.img2 === "" || newImage.img3 === "") {
    alert("Por favor, complete todos los campos de imágenes.");
    return;
  }
  const response = await axios.post(imagesurl,newImage)
  console.log(response);
if(response.status === 201){
    alert( " se agrego correctamente la imagen ")
} else{
  }}
const handleChangeimage = (e) =>{
  setnewImage({...newImage, [e.target.name]: e.target.value})
}
const togleuseimage = () =>{
  setstatusimage(!statusimage)
}
//esta funcion sirve para traer los comentarios especificos de cada atraccion
  const getComentarios = async () => {
    const response = await axios.get(`${bd}?atraccionId=${id}`);
    return response.data;
  };
//con este usseefect almacenare los datos obtenidos en getcomentarios en el state comentarios
  useEffect(() => {
    getComentarios().then((data) => {
      setComentarios(data);
    });
  },[getComentarios]);
//con esta funcion guardare los datos que obtengo del input
  const handleChange = (e) => {
    setCommentsActuales({
      ...commentsActuales,
      [e.target.name]: e.target.value,
      email: usuarios
    });
  };
//esta funcion subira lo que puse en el state comments actuales a la base de datos
  const addComment = async (e) => {
    e.preventDefault();
    const response = await axios.post(Url, {
      ...commentsActuales,
      atraccionId: id
    });
    if (response.status === 201) {
      alert("Se agregó exitosamente el comentario");
      clearForms();
      getComentarios().then((data) => {
        setComentarios(data);
      });
    } else {
      alert("No se pudo agregar el comentario");
    }
  };

  const clearForms = () => {
    setCommentsActuales({
      comments: "",
      email: usuarios
    });
  };

  const esconderInput = () => {
    setShowInput(sessionStorage.length > 0);
  };
//esta funcion sirve para traer los datos de cada atraccion en especifico
  useEffect(() => {
    const url = `http://localhost:3005/atracciones/${id}`;

    const getDetalles = async () => {
      try {
        const response = await axios.get(url);
        setDetalles(response.data);
        const lat = parseFloat(response.data.latitud);
        const lng = parseFloat(response.data.longitud);

      //hace la peticion para obtener de la tabla images en la bd las imagenes restantes
      const imagenesResponse = await axios.get(`http://localhost:3005/images?atraccionid=${id}`);
      const imagenes = imagenesResponse.data[0];
      //conviete un objeto a array para que se manejable
      const imagenesArray = Object.values(imagenes).slice(0);
      setimagenestest(imagenesArray);
      setimagenestest1(imagenesArray[1])
      setimagenestest2(imagenesArray[2])

      setcoordenadas({ lat, lng });
      } catch (error) {
        console.error("Error al obtener los detalles de la atracción:", error);
      }
    };

    getDetalles();
  }, [id]);

  useEffect(() => {
    esconderInput();
  }, []);
  console.log(detalles)
  console.log(imagenestest)
  console.log(coordenadas)
  const imagenesprueba = [
    imagenestest,
    imagenestest1,
    imagenestest2
  ]

  const commentContent = comentarios.map((comment) => (
    <div key={comment.id}>
      <h3>{comment.comments}</h3>
    </div>
  ));

  return (
  
    <div className="container-principal">
      <div className="barra-sup" >
      {statusimage ? (
        <form onSubmit={addimage} >
        <div className="botones-sup">

          <button type="submit" className="simple" onChange={handleChangeimage}  >agregar imagenes</button>
        <input name="img1" type="text" value={newImage.img1} onChange={handleChangeimage}/>
      <input name="img2" type="text" value={newImage.img2} onChange={handleChangeimage}/>
      <input name="img3" type="text" value={newImage.img3} onChange={handleChangeimage}/>
        </div>
        </form>
      ) : (
        <button className="simple" onClick={togleuseimage} >agregar imagenes</button>
      )}
      </div>
      {detalles ? (
        <div >
          <h1>Detalles de la atracción: {detalles.name}</h1>
          <h2 className="name-atraccion">{detalles.name}</h2>
          <Carrusel imagenes={imagenesprueba} />
          <p className="name-atraccion" >{detalles.direccion}</p>
          <Mapeado center={coordenadas}  />
          {showInput && coordenadas && (
            <div className="container">
              <form onSubmit={addComment}>
                <input
                  onChange={handleChange}
                  value={commentsActuales.comments}
                  name="comments"
                />
                <button type="submit">Agregar Comentario</button>

              </form>
              {commentContent}
            </div>
            
          )}
        </div>
      ) : (
        <p>Cargando detalles...</p>
      )}
      <Link to="/"> <IoChevronBackSharp/> </Link>
    </div>
  );
};

export default AtraccionDetalles;

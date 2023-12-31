import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Mapeado from "./maps";
import {IoChevronBackSharp} from 'react-icons/io5'
import Carrusel from "./carrusel";
import Dropwdown from "./dropdow";
import "../styles/atracciondetalles.css"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AtraccionDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [Detalleslocal, setDetalleslocal] = useState([]);
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
  const [imageneslocal, setimageneslocal] = useState(null)
  const [imageneslocal1, setimageneslocal1] = useState(null)
  const [imageneslocal2, setimageneslocal2]= useState(null)
  const bd = "http://localhost:3005/comentarios";
  const Url = "http://localhost:3005/comentarios";
//esta funcion sirve para traer los comentarios especificos de cada atraccion
  const getComentarios = useCallback(async () => {
    try {
      const response = await axios.get(`${bd}?atraccionId=${id}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener comentarios:', error);
      return []; // Retorna un array vacío o un valor por defecto en caso de error
    }
  }, [bd, id]);
  
  useEffect(() => {
    getComentarios().then((data) => {
      setComentarios(data);
    });
  }, [getComentarios]);
  
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
      toast.success("Se agregó exitosamente el comentario");
      clearForms();
      getComentarios().then((data) => {
        setComentarios(data);
      });
    } else {
      toast.error("error al agregar comentario")
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
    //const urldetalleslocal = `http://localhost:3005/locales/${id}`

    const getDetalles = async () => {
      try {
        const response = await axios.get(url);
        setDetalles(response.data);
        //const res = await axios.get(urldetalleslocal)
        //setDetalleslocal(res.data)
        const lat = parseFloat(response.data.latitud);
        const lng = parseFloat(response.data.longitud);
      //hace la peticion para obtener de la tabla images en la bd las imagenes restantes
      const imagenesResponse = await axios.get(`http://localhost:3005/images?atraccionid=${id}`);
      const imagenesResponselocales = await axios.get(`http://localhost:3005/imageslocal?atraccionid=${id}`);
      const imagenes = imagenesResponse.data[0];
      const imageneslocal = imagenesResponselocales.data[0];
      //conviete un objeto a array para que se manejable
      const imagenesArray = Object.values(imagenes).slice(0);
const imagenesArraylocal = Object.values(imageneslocal).slice(0);
setimagenestest(imagenesArray);
setimagenestest1(imagenesArray[1]);
setimagenestest2(imagenesArray[2]);

setimageneslocal(imagenesArraylocal);
setimageneslocal1(imagenesArraylocal[1]);
setimageneslocal2(imagenesArraylocal[2]);

      setcoordenadas({ lat, lng });
      console.log("Respuesta de imagenesResponse:", imagenesResponse.data);
console.log("Respuesta de imagenesResponselocales:", imagenesResponselocales.data);

      } catch (error) {
        console.error("Error al obtener los detalles de la atracción:", error);
      }
    };
    
    getDetalles();
  }, [id]);
  useEffect(() => {
    esconderInput();
  }, [Detalleslocal]);
  
  useEffect(() =>{
    const urldetalleslocal =(`http://localhost:3005/locales?atraccionid=${id}`)
    const getDetalleslocal = async () =>{
      try {
        const response = await axios.get(urldetalleslocal)
        setDetalleslocal(response.data)
      } catch (error) {
        console.error("error al obtener los datos ", error ) 
      }
    }
    getDetalleslocal()
  },[id])
  console.log(imageneslocal)
  console.log(detalles)
  console.log(imagenestest)
  console.log(Detalleslocal)
  const imagenesprueba = [
    imagenestest,
    imagenestest1,
    imagenestest2
  ]
const imageneslocales = [
  imageneslocal,
  imageneslocal1,
  imageneslocal2
]
  const commentContent = comentarios.map((comment) => (
    <div key={comment.id}>
      <h3>{comment.comments}</h3>
    </div>
  ));

  return (
  
    <div className="container-principal-detalles">
      
      <div className="barra-sup" >
        <Dropwdown></Dropwdown>
      </div>
      {detalles  ? (
        <div >
          <h1 className="name-atraccion-h1">Detalles de la atracción: {detalles.detallesAtraccion}</h1>
          <h2 className="name-atraccion-h2">{detalles.name}</h2>
          <Carrusel imagenes={imagenesprueba} />
          <p className="name-atraccion" >{detalles.direccion}</p>
          <br></br>
          <br></br>
          {Detalleslocal && Detalleslocal.length > 0 && Detalleslocal[0] && (
          <div>
          <Carrusel imagenes={imageneslocales}/>
          <h3 className="localdetalles" >Nombre Local: {Detalleslocal[0].name}</h3>

          <p className="localdetalles" >Dirección: {Detalleslocal[0].direccion}</p>

          <p className="localdetalles" >Detalles: {Detalleslocal[0].localDetalles}</p>
          </div>
)}

          <div  className="mapeado-conteiner">
          <Mapeado center={coordenadas}  />
          </div>
          {showInput && coordenadas && (
            <div className="container-comentarios">
              <form onSubmit={addComment}>
                <input
                  onChange={handleChange}
                  value={commentsActuales.comments}
                  name="comments"
                />
                <button type="submit" className="simple" >Agregar Comentario</button>

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

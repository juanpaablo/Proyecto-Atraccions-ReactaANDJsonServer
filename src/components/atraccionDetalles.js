import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const AtraccionDetalles = () => {
  const { id } = useParams();
  const [detalles, setDetalles] = useState(null);
  const [showInput, setShowInput] = useState(false);
  const usuarios = sessionStorage.getItem("emailusuario");
  const [comentarios, setComentarios] = useState([]);
  const [commentsActuales, setCommentsActuales] = useState({
    comments: ""
  });

  const bd = "http://localhost:3005/comentarios";
  const Url = "http://localhost:3005/comentarios";
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
  }, [id]);
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
      } catch (error) {
        console.error("Error al obtener los detalles de la atracción:", error);
      }
    };

    getDetalles();
  }, [id]);

  useEffect(() => {
    esconderInput();
  }, []);

  const commentContent = comentarios.map((comment) => (
    <div key={comment.id}>
      <h3>{comment.comments}</h3>
    </div>
  ));

  return (
    <div>
      {detalles ? (
        <div>
          <h1>Detalles de la atracción: {detalles.name}</h1>
          <h2>{detalles.name}</h2>
          <img src={detalles.img} alt="Imagen de la atracción" />
          <p>{detalles.direccion}</p>
          {showInput && (
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
      <Link to="/">Volver a la lista de atracciones</Link>
    </div>
  );
};

export default AtraccionDetalles;

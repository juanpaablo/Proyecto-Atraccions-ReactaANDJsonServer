import React,{useState, useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/edit.css"
import { toast, ToastContainer } from "react-toastify"
function EditarAtraccion(){
    const url = "http://localhost:3005/atracciones";
    const Getlist = async () =>{
        const response = await axios.get(url);
        return response
    }
    const [list, setlist]= useState([])
    const [atraccion, setatraccion] = useState({
        name:"",
        img:"",
        direccion:"",
        id:"",
        pais:"",
        latitud:"",
        longitud:""
    })
    useEffect(() => {
        Getlist().then((response) => {
          setlist(response.data);
        });
      }, []);
      //handleselect sirve para encontrar los datos de atraccion y plasmarlos para poder editarlos
    const handleselect = (e) =>{
        const select = list.find(atraccion =>atraccion.name === e.target.value )
        setatraccion({
            id:select.id,
            name:select.name,
            direccion:select.direccion,
            img:select.img,
            pais:select.pais,
            longitud:select.longitud,
            latitud:select.latitud
        })
        return console.log(select)
    }
    const handleChange = (e) =>{
        setatraccion ({...atraccion, [e.target.id]: e.target.value, })
    }

    const edit = async (e) =>
  { e.preventDefault();
    const res = await axios.put(url+'/'+atraccion.id,atraccion)
    if(res.status === 200){toast.success('atraccion editada'); window.location.reload() } else if(res.status===404){
        toast.error("para poder editar necesita seleccionar una atraccion")
    }
  } 

  return (
    <div className='conteiner'>
      <select className='select-atraccion' onChange={handleselect}>
        {list.map(atraccion => <option key={atraccion.id}>{atraccion.name}</option>)}
      </select>

    <form className="form-insert-atraccion" onSubmit={edit}>
    <br></br>
    <label>name: </label>
    <input value={atraccion.name} className="input" type='text' name='name' id="name" onChange={handleChange}></input>
    <br></br>
    <label>direccion: </label>
    <input value={atraccion.direccion} className="input" type='text' name='direccion' id="direccion" onChange={handleChange}></input>
    <br></br>
    <label>imagen: </label>
    <input value={atraccion.img} className="input" type='text' name='img' id="img" onChange={handleChange}></input>
    <br></br>
    <label>pais: </label>
    <input value={atraccion.pais} className="input" type='text' name='pais' id="pais" onChange={handleChange}></input>
    <br></br>
    <label>latitud: </label>
    <input value={atraccion.latitud} className="input" type='text' name='latitud' id="latitud" onChange={handleChange}></input>
    <br></br>
    <label>longitud: </label>
    <input value={atraccion.longitud} className="input" type='text' name='longitud' id="longitud" onChange={handleChange}></input>
    <br></br>
    <br></br>
    <button type='submit' className="button" id="button-edit" >EDIT</button>
    <Link to={"/"}> <button className="button"> volver a la pagina principal</button>   </Link>
    <ToastContainer/>
    </form>
    </div>
  )
    }
    export default EditarAtraccion
    


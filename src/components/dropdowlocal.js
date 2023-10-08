import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import axios from "axios";
import "../styles/dropdown.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dropwdownlocales(props) {
  const [Dropdown1, setdropdown] = useState(false);
  const [dropdownInputFocused, setDropdownInputFocused] = useState(false); // Nuevo estado para rastrear el enfoque del campo de entrada

  const { idselected } = props;
  const imagesurl = `http://localhost:3005/imageslocal`;
  
  const [newImage, setnewImage] = useState({
    img: "",
    img2: "",
    img3: "",
    atraccionid:idselected
  });
  const Resetform = () => {
    setnewImage({
      img: "",
      img2: "",
      img3: "",
    });
  };

  const addimage = async (e) => {
    e.preventDefault();
    // Verificar si los campos de imágenes están vacíos
    if (newImage.img === "" || newImage.img2 === "" || newImage.img3 === "") {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return;
    }
    const response = await axios.post(imagesurl, newImage);
    console.log(response);
    if (response.status === 201) {
      toast.success("se agrego la imagen correctamente")
      alert("Se agregó correctamente la imagen.");
      Resetform();
      window.location.reload()
      setdropdown(!Dropdown1)
    } else {
      toast.error("Error al cargar las imágenes, inténtelo nuevamente.");
      Resetform();
      window.location.reload();
    }
  };

  const handleChangeimage = (e) => {
    setnewImage({ ...newImage, [e.target.name]: e.target.value });
  };
  const abrircerrardropdown = () => {
    if (!dropdownInputFocused) {
      setdropdown(!Dropdown1);
    }
  };
  //este input basicamente lo que hace es que verifica si el enfoque esta en el input y si es asi no se cerrara
  const handleInputFocus = () => {
    setDropdownInputFocused(true);
    setnewImage({...newImage, atraccionid:idselected})
  };
  //si puerde el enfoque este se activara y cerrara
  const handleInputBlur = () => {
    setDropdownInputFocused(false);
  };
console.log(newImage)
  return (
    <div className="app">
      <Dropdown onSubmit={addimage} isOpen={Dropdown1} toggle={abrircerrardropdown}>
        <DropdownToggle caret className="dropbtn" >Inserte imagenes!</DropdownToggle>
        <DropdownMenu container="body">
          <DropdownItem header>Inserte las imágenes</DropdownItem>
          <DropdownItem>
            <input
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name="img"
              value={newImage.img}
              onChange={handleChangeimage}
            />
          </DropdownItem>
          <DropdownItem>
            <input
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name="img2"
              value={newImage.img2}
              onChange={handleChangeimage}
            />
          </DropdownItem>
          <DropdownItem>
            <input
              type="text"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              name="img3"
              value={newImage.img3}
              onChange={handleChangeimage}
            />
          </DropdownItem>
          <DropdownItem >
            <button className="simple" type="submit"
              name="submit"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur} onClick={addimage} >
                agregar imagenes
               </button>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <ToastContainer/>
    </div>
  );
}

export default Dropwdownlocales;

/*const { idselected } = props;
  const imagesurl = `http://localhost:3005/imageslocales`;
  const [newImage, setnewImage] = useState({
    img: "",
    img2: "",
    img3: "",
    atraccionid: idselected,
  });*/
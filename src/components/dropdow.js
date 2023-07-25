import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/dropdown.css"

function Dropwdown() {
  const [Dropdown1, setdropdown] = useState(false);
  const [dropdownInputFocused, setDropdownInputFocused] = useState(false); // Nuevo estado para rastrear el enfoque del campo de entrada

  const { id } = useParams();
  const imagesurl = `http://localhost:3005/images`;
  const [newImage, setnewImage] = useState({
    img1: "",
    img2: "",
    img3: "",
    atraccionid: id,
  });

  const Resetform = () => {
    setnewImage({
      img1: "",
      img2: "",
      img3: "",
    });
  };

  const addimage = async (e) => {
    e.preventDefault();
    // Verificar si los campos de imágenes están vacíos
    if (newImage.img1 === "" || newImage.img2 === "" || newImage.img3 === "") {
      alert("Por favor, complete todos los campos de imágenes.");
      return;
    }
    const response = await axios.post(imagesurl, newImage);
    console.log(response);
    if (response.status === 201) {
      alert("Se agregó correctamente la imagen.");
      Resetform();
      window.location.reload()
      setdropdown(!Dropdown1)
    } else {
      alert("Error al cargar las imágenes, inténtelo nuevamente.");
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
  };
  //si puerde el enfoque este se activara y cerrara
  const handleInputBlur = () => {
    setDropdownInputFocused(false);
  };

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
              name="img1"
              value={newImage.img1}
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
    </div>
  );
}

export default Dropwdown;

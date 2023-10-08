import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import axios from "axios";
import "../styles/dropdown.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Dropwdownlocales(props) {
  const [Dropdown1, setdropdown] = useState(false);
  const [dropdownInputFocused, setDropdownInputFocused] = useState(false);
  const { idselected } = props;
  const imagesurl = `http://localhost:3005/imageslocales`;
  const [newImage, setnewImage] = useState({
    img: "",
    img2: "",
    img3: "",
    atraccionid: idselected,
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
    if (newImage.img1 === "" || newImage.img2 === "" || newImage.img3 === "") {
      toast.error("Por favor, complete todos los campos de imágenes.");
      return;
    }
    const response = await axios.post(imagesurl, newImage);
    console.log(response);
    
    if (response.status === 201 && props.onSubmit) {
      props.onSubmit(); // Llama a la función onSubmit pasada como prop
      toast.success("Se agregó correctamente la imagen");
      Resetform();
      window.location.reload();
      setdropdown(!Dropdown1);
    } else {
      toast.error("Error al cargar las imágenes, inténtelo nuevamente.");
      Resetform();
      window.location.reload();
    }
  };

  console.log(idselected);
  const handleChangeimage = (e) => {
    setnewImage({ ...newImage, [e.target.name]: e.target.value });
  };

  const abrircerrardropdown = () => {
    if (!dropdownInputFocused) {
      setdropdown(!Dropdown1);
    }
  };

  const handleInputFocus = () => {
    setDropdownInputFocused(true);
  };

  const handleInputBlur = () => {
    setDropdownInputFocused(false);
  };

  return (
    <div className="app">
      <form onSubmit={addimage}>
        <Dropdown isOpen={Dropdown1} toggle={abrircerrardropdown}>
          <DropdownToggle caret className="dropbtn">Inserte imágenes</DropdownToggle>
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
            <DropdownItem>
              <button
                className="simple"
                type="submit"
                name="submit"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              >
                Agregar imágenes
              </button>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Dropwdownlocales;

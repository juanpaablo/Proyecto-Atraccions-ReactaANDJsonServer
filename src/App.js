import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactDOM } from 'react';
//import Login from './components/login';
import Register from './components/register';
import Login2 from './components/Login2';
import Atraccion from './components/atraccion';
import Listado from './components/main';
import AtraccionDetalles from './components/atraccionDetalles';
import EditarAtraccion from './components/Edit';
import Busqueda from './components/barrabuscadora';
import BusquedaporVoz from './components/busquedaporvoz'
import Maps from "./components/maps";
import Carrusel from './components/carrusel';
function App() {
  const imagenesprueba = [
    "https://picsum.photos/201/300",
    "https://picsum.photos/200/300",
    "https://picsum.photos/203/300"
  ]
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/Login2" element={<Login2 />} />
        <Route path="/atraccion" element={<Atraccion />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/atracciones/:id" element={<AtraccionDetalles/>} />
        <Route path="/Edit" element={<EditarAtraccion/>} />
        <Route path="/maps" element={<Maps/>} />
        <Route path="/barrabuscadora" element={<Busqueda/>} />
        <Route path="/busquedaporvoz" element={<BusquedaporVoz/>} />

      </Routes>
    </Router>
    
  );
  
}

export default App;
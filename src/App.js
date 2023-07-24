import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/login';
import Register from './components/register';
import Atraccion from './components/atraccion';
import Listado from './components/main';
import AtraccionDetalles from './components/atraccionDetalles';
import EditarAtraccion from './components/Edit';
import Busqueda from './components/barrabuscadora';
import BusquedaporVoz from './components/busquedaporvoz'
import Maps from "./components/maps";
import Dropdownlogin from './components/dropdowlogin';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/atraccion" element={<Atraccion />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/atracciones/:id" element={<AtraccionDetalles/>} />
        <Route path="/Edit" element={<EditarAtraccion/>} />
        <Route path="/maps" element={<Maps/>} />
        <Route path="/barrabuscadora" element={<Busqueda/>} />
        <Route path="/busquedaporvoz" element={<BusquedaporVoz/>} />
        <Route path="/dropdowlogin" element={<Dropdownlogin/>} />
      </Routes>
    </Router>
    
  );
  
}

export default App;
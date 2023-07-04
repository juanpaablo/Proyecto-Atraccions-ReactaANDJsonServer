import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//import Login from './components/login';
import Register from './components/register';
import Login2 from './components/Login2';
import Atraccion from './components/atraccion';
import Listado from './components/main';
import AtraccionDetalles from './components/atraccionDetalles';
import EditarAtraccion from './components/Edit';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Listado />} />
        <Route path="/Login2" element={<Login2 />} />
        <Route path="/atraccion" element={<Atraccion />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/atracciones/:id" element={<AtraccionDetalles/>} />
        <Route path="/Edit" element={<EditarAtraccion/>} />
      </Routes>
    </Router>
  );
}

export default App;
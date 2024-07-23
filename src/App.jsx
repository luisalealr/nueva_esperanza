// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Route, Routes, /*Navigate*/ } from 'react-router-dom';
import Inicio from './Inicio';
import SideBar from './componentes/admin/templates/Sidebar';
import SideBarVendedor from './componentes/vendedor/templates/SidebarVendedor';
import CrearCategoria from './componentes/admin/CrearCategoria';

function App() {
  //const { user } = useUser();
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/menu" element={<SideBar />} />
          <Route path="/menu_vendedor" element={<SideBarVendedor />} />
          <Route path="/CrearCategoria" element={<CrearCategoria />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App

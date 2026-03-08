import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProjectOrdely from './pages/ProjectOrdely';
import ProjectVillaCarmela from './pages/ProjectVillaCarmela';
import ProjectCatalogo from './pages/ProjectCatalogo';
import NotFound from './pages/NotFound';
import './index.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/ordely" element={<ProjectOrdely />} />
          <Route path="/project/villa-carmela" element={<ProjectVillaCarmela />} />
          <Route path="/project/catalogo" element={<ProjectCatalogo />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <footer className="footer app-footer">
          <div className="container app-footer-container">
            <div className="logo text-gradient app-footer-logo">&lt;ExeRS/&gt;</div>
            <p className="app-footer-description">Construyendo experiencias web que importan.</p>
            <p className="app-footer-copyright">
              &copy; {new Date().getFullYear()} ExeRS. Todos los derechos reservados. <br />
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;

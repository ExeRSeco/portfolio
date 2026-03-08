import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Database, Component, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { FALLBACK_IMAGE_CATALOG } from '../constants';

function ProjectCatalogo() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="project-detail-page">
            <section className="project-header container project-header-container">
                <Link to="/#projects" className="back-link project-back-link">
                    <ArrowLeft size={18} /> Volver a proyectos
                </Link>

                <h1 className="text-gradient project-title">Catálogo Online</h1>
                <p className="project-description">
                    Plataforma de catálogo digital diseñada para exhibir productos de forma dinámica y atractiva. Interfaz intuitiva, filtros de búsqueda avanzados y diseño optimizado para conversión.
                </p>
            </section>

            <section className="project-gallery container project-gallery-container">
                <div className="glass-panel project-gallery-panel">
                    <img
                        src="/projects/catalogo.png"
                        alt="Catálogo Online Preview"
                        className="project-gallery-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = FALLBACK_IMAGE_CATALOG;
                        }}
                    />
                </div>
            </section>

            <section className="project-details container project-details-container">
                <div className="tech-stack glass-panel tech-stack-panel">
                    <h3 className="tech-stack-title">Tecnologías Aplicadas</h3>
                    <ul className="tech-stack-list">
                        <li className="tech-stack-item"><Component className="text-gradient" /> React & TypeScript (Frontend)</li>
                        <li className="tech-stack-item"><ShoppingBag className="text-gradient" /> UI/UX enfocado en E-commerce</li>
                        <li className="tech-stack-item"><Database className="text-gradient" /> Gestión de Productos Dinámica</li>
                    </ul>
                </div>

                <div className="project-links glass-panel project-links-panel">
                    <h3 className="project-links-title">Enlace del Proyecto</h3>
                    <p className="project-links-description">
                        Descubre la plataforma interactiva y navega por el catálogo de productos con una experiencia fluida.
                    </p>
                    <a href="https://catalogo-giumi-deportiva.vercel.app/catalogo" target="_blank" rel="noopener noreferrer" className="btn-primary project-live-link">
                        Ver sitio en vivo <ExternalLink size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
}

export default ProjectCatalogo;

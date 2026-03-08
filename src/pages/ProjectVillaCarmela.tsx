import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Code2, Paintbrush, Zap, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import { VILLA_PREVIEW } from '../constants';

function ProjectVillaCarmela() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="project-detail-page">
            <section className="project-header container project-header-container">
                <Link to="/#projects" className="back-link project-back-link">
                    <ArrowLeft size={18} /> Volver a proyectos
                </Link>

                <h1 className="text-gradient project-title">Villa Carmela Cerca</h1>
                <p className="project-description">
                    Guía local de comercios y servicios. Un directorio digital rápido, moderno y enfocado en la usabilidad tanto para los comerciantes que publican como para los vecinos que buscan.
                </p>
            </section>

            <section className="project-gallery container project-gallery-container">
                <div className="glass-panel project-gallery-panel">
                    <img
                        src="/projects/villacarmela.png"
                        alt="Villa Carmela Preview"
                        className="project-gallery-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = VILLA_PREVIEW;
                        }}
                    />
                </div>
            </section>

            <section className="project-details container project-details-container">
                <div className="tech-stack glass-panel tech-stack-panel">
                    <h3 className="tech-stack-title">Tecnologías Aplicadas</h3>
                    <ul className="tech-stack-list">
                        <li className="tech-stack-item"><Code2 className="text-gradient" /> React (Frontend)</li>
                        <li className="tech-stack-item"><Zap className="text-gradient" /> Vite (Build Tool & Performance)</li>
                        <li className="tech-stack-item"><Paintbrush className="text-gradient" /> CSS & Glassmorphism UI</li>
                        <li className="tech-stack-item"><Smartphone className="text-gradient" /> Diseño 100% Responsive</li>
                    </ul>
                </div>

                <div className="project-links glass-panel project-links-panel">
                    <h3 className="project-links-title">Enlace del Proyecto</h3>
                    <p className="project-links-description">
                        Visitá la guía local y probá su buscador inteligente, optimizado para carga rápida y excelente rendimiento SEO.
                    </p>
                    <a href="https://villacarmelacerca.com.ar/" target="_blank" rel="noopener noreferrer" className="btn-primary project-live-link">
                        Ver sitio en vivo <ExternalLink size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
}

export default ProjectVillaCarmela;

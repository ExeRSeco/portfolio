import { useEffect } from 'react';
import { ArrowLeft, ExternalLink, Database, Server, Component, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ORDELY_PREVIEW } from '../constants';

function ProjectOrdely() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="project-detail-page">
            <section className="project-header container project-header-container">
                <Link to="/#projects" className="back-link project-back-link">
                    <ArrowLeft size={18} /> Volver a proyectos
                </Link>

                <h1 className="text-gradient project-title">Ordely</h1>
                <p className="project-description">
                    Sistema SaaS completo de gestión de pedidos e inventario. Multi-tenant, con autenticación segura, panel de administración, control de stock en tiempo real y suscripciones integradas.
                </p>
            </section>

            <section className="project-gallery container project-gallery-container">
                <div className="glass-panel project-gallery-panel">
                    <img
                        src="/projects/ordely.png"
                        alt="Ordely Dashboard Preview"
                        className="project-gallery-image"
                        onError={(e) => {
                            (e.target as HTMLImageElement).src = ORDELY_PREVIEW;
                        }}
                    />
                </div>
            </section>

            <section className="project-details container project-details-container">
                <div className="tech-stack glass-panel tech-stack-panel">
                    <h3 className="tech-stack-title">Tecnologías Aplicadas</h3>
                    <ul className="tech-stack-list">
                        <li className="tech-stack-item"><Component className="text-gradient" /> React & TypeScript (Frontend)</li>
                        <li className="tech-stack-item"><Database className="text-gradient" /> Supabase & PostgreSQL (Base de datos)</li>
                        <li className="tech-stack-item"><Shield className="text-gradient" /> RLS & Auth (Seguridad)</li>
                        <li className="tech-stack-item"><Server className="text-gradient" /> Edge Functions (Backend lógico)</li>
                    </ul>
                </div>

                <div className="project-links glass-panel project-links-panel">
                    <h3 className="project-links-title">Enlace del Proyecto</h3>
                    <p className="project-links-description">
                        Explorá el sistema en vivo. Podés crear una cuenta de prueba y ver el panel de administración completo en acción.
                    </p>
                    <a href="https://ordelyapp.vercel.app/" target="_blank" rel="noopener noreferrer" className="btn-primary project-live-link">
                        Ver sitio en vivo <ExternalLink size={18} />
                    </a>
                </div>
            </section>
        </main>
    );
}

export default ProjectOrdely;

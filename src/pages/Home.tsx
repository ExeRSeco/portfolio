import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Github, Linkedin, Download, ExternalLink, Quote, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { FALLBACK_IMAGE_ORDELY, FALLBACK_IMAGE_VILLA, FALLBACK_IMAGE_CATALOG, FALLBACK_IMAGE_AVATAR } from '../constants';
import { testimonialsData } from '../data/testimonials';

const contactSchema = z.object({
    name: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
    email: z.string().email('Por favor ingresa un correo válido'),
    message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
});

type ContactFormValues = z.infer<typeof contactSchema>;

function Home() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const nextTestimonial = useCallback(() => setCurrentTestimonial((prev) => (prev + 1) % testimonialsData.length), []);
    const prevTestimonial = () => setCurrentTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);


    useEffect(() => {
        const interval = setInterval(nextTestimonial, 5000); // Auto-slide every 5s
        return () => clearInterval(interval);
    }, [nextTestimonial]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        setSubmitError(null);
        try {
            const response = await fetch(import.meta.env.VITE_FORMSPREE_ID || "https://formspree.io/f/TU_FORMSPREE_ID", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                setSubmitSuccess(true);
                reset();
                setTimeout(() => setSubmitSuccess(false), 5000);
            } else {
                setSubmitError("Hubo un error al enviar el mensaje. Inténtalo más tarde.");
            }
        } catch {
            setSubmitError("Error de conexión. Revisa tu internet e intenta nuevamente.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const heroBgRef = useRef<HTMLDivElement>(null);
    const revealRefs = useRef<(HTMLElement | null)[]>([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.1 }
        );

        revealRefs.current.forEach((el) => {
            if (el) observer.observe(el);
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    // Parallax effect for the hero section
    useEffect(() => {
        const handleScroll = () => {
            if (heroBgRef.current) {
                const scrolled = window.scrollY;
                heroBgRef.current.style.transform = `translateY(${scrolled * 0.4}px)`;
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main>
            <section id="hero" className="hero-section container hero-section-relative">
                <div ref={heroBgRef} id="hero-parallax-bg" className="hero-parallax-bg"></div>
                <div className="hero-content animate-fade-in hero-content-relative">
                    <div className="hero-avatar">
                        <img src="/avatar.png" alt="ExeRS Perfil" onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMAGE_AVATAR; }} />
                    </div>
                    <h1>Hola, soy <span className="text-gradient">ExeRS</span></h1>
                    <p className="hero-subtitle">
                        Desarrollo aplicaciones web completas — desde la arquitectura del backend hasta cada pixel del frontend. Seguridad, rendimiento y diseño que impacta.
                    </p>
                    <div className="hero-actions home-hero-actions">
                        <a href="#projects" className="btn-primary">Ver mis proyectos</a>
                        <div className="home-hero-social-actions">
                            <a href="https://github.com/ExeRSeco" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="GitHub">
                                <Github size={24} />
                            </a>
                            <a href="https://www.linkedin.com/in/exers/" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn">
                                <Linkedin size={24} />
                            </a>
                            <a href="/cv.pdf" target="_blank" className="social-btn" aria-label="Descargar CV" title="Descargar CV">
                                <Download size={24} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee Divider */}
            <div className="marquee-container">
                <div className="marquee-content">
                    <span>🚀 FRONTEND REACT</span>
                    <span className="marquee-separator">·</span>
                    <span>🔒 SEGURIDAD WEB</span>
                    <span className="marquee-separator">·</span>
                    <span>⚙️ BACKEND NODEJS</span>
                    <span className="marquee-separator">·</span>
                    <span>🎨 DISEÑO NEO-BRUTALISTA</span>
                    <span className="marquee-separator">·</span>
                    <span>🚀 FRONTEND REACT</span>
                    <span className="marquee-separator">·</span>
                    <span>🔒 SEGURIDAD WEB</span>
                    <span className="marquee-separator">·</span>
                    <span>⚙️ BACKEND NODEJS</span>
                    <span className="marquee-separator">·</span>
                    <span>🎨 DISEÑO NEO-BRUTALISTA</span>
                </div>
            </div>

            <section id="about" className="about-section container">
                <h2 className="section-title">Sobre mí</h2>
                <div className="about-content glass-panel reveal" ref={el => { revealRefs.current[0] = el; }}>
                    <p>
                        Soy desarrollador full-stack con foco en crear productos reales que la gente usa.
                        No me quedo en lo teórico — construyo sistemas completos, desde la base de datos
                        hasta la interfaz, con seguridad de verdad y código limpio. Si algo se puede
                        mejorar, lo mejoro. Si algo no funciona, lo arreglo hasta que funcione perfecto.
                    </p>
                    <div className="skills-grid">
                        <span className="skill-tag">React</span>
                        <span className="skill-tag">TypeScript</span>
                        <span className="skill-tag">Supabase</span>
                        <span className="skill-tag">Node.js</span>
                        <span className="skill-tag">Vite</span>
                        <span className="skill-tag">UI/UX Design</span>
                        <span className="skill-tag">Seguridad Web</span>
                        <span className="skill-tag">PostgreSQL</span>
                    </div>
                </div>
            </section>

            <section id="experience" className="timeline-section container">
                <h2 className="section-title" style={{ transform: 'rotate(1deg)' }}>Trayectoria</h2>
                <div className="timeline">
                    <div className="timeline-item reveal" ref={el => { revealRefs.current[1] = el; }}>
                        <div className="timeline-marker"></div>
                        <div className="timeline-content glass-panel" style={{ background: 'var(--bg-color)' }}>
                            <h3 className="text-gradient">2024 - Inicios</h3>
                            <h4>Freelance & Trabajos Pequeños</h4>
                            <p>
                                Comencé a pulir mis habilidades haciendo trabajos freelance más pequeños:
                                arreglando bugs visuales, construyendo componentes aislados (botones, menús)
                                y empezando a entender a fondo la web. Cada pequeño arreglo sentó las
                                bases de lo que hago hoy.
                            </p>
                        </div>
                    </div>

                    <div className="timeline-item reveal" ref={el => { revealRefs.current[2] = el; }}>
                        <div className="timeline-marker" style={{ background: 'var(--neon-accent)' }}></div>
                        <div className="timeline-content glass-panel" style={{ background: '#ffffff', borderColor: 'var(--neon-accent)' }}>
                            <h3 style={{ color: 'var(--neon-accent)' }}>2025/2026 - Presente</h3>
                            <h4>Proyectos Completos & SaaS</h4>
                            <p>
                                Di el salto a crear sistemas reales desde cero. Arquitectura de bases de datos,
                                autenticación segura, Edge Functions y UI/UX complejas. Pasé de arreglar botones
                                a construir plataformas como <strong>Ordely</strong> para resolver problemas del mundo real.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="projects" className="projects-section container">
                <h2 className="section-title">Proyectos</h2>
                <div className="projects-grid">
                    {/* Ordely */}
                    <div className="project-card glass-panel reveal" ref={el => { revealRefs.current[3] = el; }}>
                        <div className="project-img-placeholder" style={{ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src="/projects/ordely.png"
                                alt="Ordely Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_ORDELY;
                                }}
                            />
                        </div>
                        <div className="project-info">
                            <h3>Ordely</h3>
                            <p>
                                Sistema SaaS completo de gestión de pedidos e inventario. Multi-tenant,
                                con autenticación segura, panel de administración, control de stock en
                                tiempo real y suscripciones integradas. React + Supabase + Edge Functions.
                            </p>
                            <div className="project-links">
                                <a href="https://ordelyapp.vercel.app/" target="_blank" rel="noopener noreferrer" className="project-demo-link">Ver Demo <ExternalLink size={16} /></a>
                                <Link to="/project/ordely" className="project-github-link">Detalles</Link>
                            </div>
                        </div>
                    </div>
                    {/* Villa Carmela Cerca */}
                    <div className="project-card glass-panel reveal" ref={el => { revealRefs.current[4] = el; }}>
                        <div className="project-img-placeholder" style={{ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src="/projects/villacarmela.png"
                                alt="Villa Carmela Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_VILLA;
                                }}
                            />
                        </div>
                        <div className="project-info">
                            <h3>Villa Carmela Cerca</h3>
                            <p>
                                Este sitio que estás viendo. Diseño premium con glassmorphism,
                                animaciones fluidas y paleta de colores personalizada.
                                React + TypeScript + Vite.
                            </p>
                            <div className="project-links">
                                <a href="https://villacarmelacerca.com.ar/" target="_blank" rel="noopener noreferrer" className="project-demo-link">Ver Demo <ExternalLink size={16} /></a>
                                <Link to="/project/villa-carmela" className="project-github-link">Detalles</Link>
                            </div>
                        </div>
                    </div>
                    {/* Catálogo Online */}
                    <div className="project-card glass-panel reveal" ref={el => { revealRefs.current[5] = el; }}>
                        <div className="project-img-placeholder" style={{ padding: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <img
                                src="/projects/catalogo.png"
                                alt="Catálogo Online Preview"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                onError={(e) => {
                                    (e.target as HTMLImageElement).src = FALLBACK_IMAGE_CATALOG;
                                }}
                            />
                        </div>
                        <div className="project-info">
                            <h3>Catálogo Online</h3>
                            <p>
                                Plataforma de catálogo digital dinámica y atractiva.
                                Interface enfocada en la exhibición de productos y conversión.
                            </p>
                            <div className="project-links">
                                <a href="https://catalogo-giumi-deportiva.vercel.app/catalogo" target="_blank" rel="noopener noreferrer" className="project-demo-link">Ver Demo <ExternalLink size={16} /></a>
                                <Link to="/project/catalogo" className="project-github-link">Detalles</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" className="contact-section container">
                <h2 className="section-title">Hablemos</h2>
                <div className="contact-container">
                    <div className="contact-card glass-panel reveal" ref={el => { revealRefs.current[6] = el; }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Enviame un mensaje</h3>
                        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group">
                                <label htmlFor="name">Nombre completo</label>
                                <input
                                    type="text"
                                    id="name"
                                    placeholder="Tu nombre"
                                    className={errors.name ? 'input-error' : ''}
                                    {...register('name')}
                                />
                                {errors.name && <span className="error-message">{errors.name.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Correo electrónico</label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="tu@email.com"
                                    className={errors.email ? 'input-error' : ''}
                                    {...register('email')}
                                />
                                {errors.email && <span className="error-message">{errors.email.message}</span>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="message">Mensaje</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    placeholder="¿En qué te puedo ayudar?"
                                    className={errors.message ? 'input-error' : ''}
                                    {...register('message')}
                                />
                                {errors.message && <span className="error-message">{errors.message.message}</span>}
                            </div>
                            <button type="submit" className="btn-primary home-submit-button" disabled={isSubmitting}>
                                {isSubmitting ? <Loader2 className="spinner" size={24} /> : 'Enviar mensaje'}
                            </button>
                            {submitError && (
                                <p className="error-message submit-error-message">
                                    {submitError}
                                </p>
                            )}
                            {submitSuccess && (
                                <p className="success-message submit-success-message">
                                    ¡Mensaje enviado con éxito! Te responderé pronto.
                                </p>
                            )}
                        </form>
                    </div>

                    <div className="contact-info glass-panel reveal" ref={el => { revealRefs.current[7] = el; }}>
                        <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Contacto Directo</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>
                            ¿Tenés un proyecto en mente o necesitás un sistema a medida? Escribime por WhatsApp y lo hacemos realidad más rápido.
                        </p>

                        <a
                            href="https://wa.me/5493815055831?text=Hola,%20me%20gustaría%20hablar%20sobre%20un%20proyecto"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-whatsapp"
                        >
                            <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                            Chatear por WhatsApp
                        </a>
                    </div>
                </div>
            </section>

            {/* Testimonios */}
            <section id="testimonials" className="testimonials-section container">
                <h2 className="section-title" style={{ transform: 'rotate(-1deg)' }}>Testimonios</h2>

                <div className="testimonials-carousel reveal" ref={el => { revealRefs.current[8] = el; }}>
                    <div className="carousel-inner" style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}>
                        {testimonialsData.map((test, index) => (
                            <div key={index} className="testimonial-slide">
                                <div className="testimonial-card glass-panel">
                                    <Quote size={32} />
                                    <p>"{test.quote}"</p>
                                    <div className="testimonial-author">{test.author}</div>
                                    <div className="testimonial-role">{test.role}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="carousel-controls">
                        <button onClick={prevTestimonial} className="carousel-btn" aria-label="Anterior testimonio">
                            <ChevronLeft size={24} />
                        </button>
                        <div className="carousel-dots">
                            {testimonialsData.map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`dot ${idx === currentTestimonial ? 'active' : ''}`}
                                    onClick={() => setCurrentTestimonial(idx)}
                                    aria-label={`Ir al testimonio ${idx + 1}`}
                                />
                            ))}
                        </div>
                        <button onClick={nextTestimonial} className="carousel-btn" aria-label="Siguiente testimonio">
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </section>

        </main >
    );
}

export default Home;

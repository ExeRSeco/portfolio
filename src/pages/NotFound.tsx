import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

function NotFound() {
    const eye1Ref = useRef<HTMLDivElement>(null);
    const eye2Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            [eye1Ref.current, eye2Ref.current].forEach(eye => {
                if (eye) {
                    const rect = eye.getBoundingClientRect();
                    const x = (e.clientX - rect.left) / 10;
                    const y = (e.clientY - rect.top) / 10;
                    eye.style.transform = `translate(${x}px, ${y}px)`;
                }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return (
        <main className="not-found-page" style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '8rem',
            textAlign: 'center'
        }}>
            <div className="container">
                <div style={{
                    display: 'inline-block',
                    background: 'var(--neon-yellow)',
                    border: 'var(--brutal-border)',
                    boxShadow: 'var(--brutal-shadow-hover)',
                    borderRadius: '24px',
                    padding: '4rem 2rem',
                    maxWidth: '600px',
                    width: '100%',
                    transform: 'rotate(-2deg)'
                }}>
                    <h1 style={{
                        fontSize: 'clamp(4rem, 10vw, 8rem)',
                        lineHeight: 1,
                        marginBottom: '1rem',
                        color: 'var(--text-primary)',
                        textShadow: '4px 4px 0px var(--neon-blue)'
                    }}>404</h1>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', margin: '2rem 0' }}>
                        {/* Funny eyes following cursor */}
                        <div style={{ width: '60px', height: '60px', background: 'white', border: 'var(--brutal-border)', borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
                            <div ref={eye1Ref} className="eye-pupil" style={{ width: '20px', height: '20px', background: 'var(--neon-accent)', borderRadius: '50%', position: 'absolute', top: '20px', left: '20px', transition: 'transform 0.1s' }}></div>
                        </div>
                        <div style={{ width: '60px', height: '60px', background: 'white', border: 'var(--brutal-border)', borderRadius: '50%', position: 'relative', overflow: 'hidden' }}>
                            <div ref={eye2Ref} className="eye-pupil" style={{ width: '20px', height: '20px', background: 'var(--neon-accent)', borderRadius: '50%', position: 'absolute', top: '20px', left: '20px', transition: 'transform 0.1s' }}></div>
                        </div>
                    </div>

                    <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>¡Ups! Te perdiste...</h2>
                    <p style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                        La página que estás buscando fue secuestrada por ninjas del ciberespacio o simplemente no existe.
                    </p>

                    <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'white' }}>
                        <Home size={20} />
                        Volver al Inicio
                    </Link>
                </div>
            </div>
        </main>
    );
}

export default NotFound;

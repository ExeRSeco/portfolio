import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';
    const [isOpen, setIsOpen] = useState(false);
    const headerRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (headerRef.current) {
                if (window.scrollY > 50) {
                    headerRef.current.classList.add('scrolled');
                } else {
                    headerRef.current.classList.remove('scrolled');
                }
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Menu is closed directly via onClick on the Links.

    const toggleMenu = () => setIsOpen(!isOpen);
    const closeMenu = () => setIsOpen(false);

    return (
        <header ref={headerRef} className="navbar">
            <div className="container nav-content">
                <Link to="/" className="logo text-gradient" onClick={closeMenu}>&lt;ExeRS/&gt;</Link>

                <button className="mobile-menu-btn" onClick={toggleMenu} aria-label="Toggle menu">
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
                    <a href={isHome ? '#about' : '/#about'} onClick={closeMenu}>Sobre mí</a>
                    <a href={isHome ? '#projects' : '/#projects'} onClick={closeMenu}>Proyectos</a>
                    <a href={isHome ? '#contact' : '/#contact'} onClick={closeMenu}>Contacto</a>
                </nav>
            </div>
        </header>
    );
}

export default Navbar;

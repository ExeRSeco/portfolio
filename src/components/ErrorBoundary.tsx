import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        // Actualiza el estado para que el siguiente renderizado muestre la IU de repuesto.
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        // También puedes registrar el error en un servicio de reporte de errores
        console.error("Uncaught error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // Puedes renderizar cualquier IU de repuesto
            return (
                <div style={{
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '2rem',
                    textAlign: 'center',
                    backgroundColor: 'var(--bg-color)'
                }}>
                    <div className="glass-panel" style={{ padding: '3rem', maxWidth: '600px', border: 'var(--brutal-border)', boxShadow: 'var(--brutal-shadow-hover)' }}>
                        <AlertTriangle size={64} style={{ color: 'var(--neon-accent)', marginBottom: '1.5rem' }} />
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>¡Uy! Algo se rompió.</h1>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                            Ha ocurrido un error inesperado en la aplicación. Revisa la consola o intenta recargar la página.
                        </p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn-primary"
                        >
                            Recargar Página
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;

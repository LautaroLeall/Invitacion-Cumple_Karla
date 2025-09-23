// src/components/MapModal/MapModal.jsx
import { useEffect, useRef } from 'react';
import './MapModal.css';

// - Modal que muestra un mapa embebido (iframe) y link para abrir en Maps
export default function MapModal({
    isOpen,
    onClose,
    title = 'Lugar del evento',
    address = 'Camino a San Agustin, Una Casa',
    embedUrl = 'https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3711.826706659622!2d-65.4157778!3d-24.945083299999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjTCsDU2JzQyLjMiUyA2NcKwMjQnNTYuOCJX!5e1!3m2!1ses-419!2sar!4v1758635634544!5m2!1ses-419!2sar',
    mapsLink = 'https://maps.app.goo.gl/iiQjTyivvQUzFi238',
}) {
    const closeRef = useRef(null);
    const previouslyFocused = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        // Guardar foco anterior y enfocar botón cerrar
        previouslyFocused.current = document.activeElement;
        setTimeout(() => closeRef.current && closeRef.current.focus(), 60);

        // Lock scroll
        const original = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        // keydown listener para ESC
        const onKey = (e) => {
            if (e.key === 'Escape') {
                onClose && onClose();
            }
        };
        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = original;
            // restore focus si existe
            if (previouslyFocused.current && typeof previouslyFocused.current.focus === 'function') {
                previouslyFocused.current.focus();
            }
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleOpenMaps = () => {
        // Intentar abrir en nueva pestaña; fallback same-tab (útil en móviles)
        const newWin = window.open(mapsLink, '_blank', 'noopener,noreferrer');
        // intentamos de nuevo (útil en desktop con popup bloqueado)
        if (!newWin) window.open(mapsLink, '_blank', 'noopener,noreferrer');
    };

    return (
        <div className="map-backdrop" role="dialog" aria-modal="true" aria-labelledby="mapTitle">
            <div className="map-modal" role="document">
                <button
                    ref={closeRef}
                    className="map-close"
                    aria-label="Cerrar mapa"
                    onClick={onClose}
                >
                    ×
                </button>

                <header className="map-header">
                    <h2 id="mapTitle">{title}</h2>
                    {address && <p className="map-address">{address}</p>}
                </header>

                <div className="map-body">
                    {/* Lazy-load iframe: sólo renderizamos cuando el modal está abierto */}
                    {embedUrl ? (
                        <div className="map-iframe-wrapper" aria-hidden={false}>
                            <iframe
                                title={`Mapa de ${title}`}
                                src={embedUrl}
                                width="100%"
                                height="320"
                                style={{ border: 0, borderRadius: 10 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    ) : (
                        <div className="map-placeholder">Mapa no disponible</div>
                    )}
                </div>

                <footer className="map-footer">
                    <button className="btn-primary" onClick={handleOpenMaps} aria-label="Abrir en Maps">
                        Abrir en Maps
                    </button>
                    <button className="btn-outline" onClick={onClose} aria-label="Cerrar">
                        Cerrar
                    </button>
                </footer>
            </div>
        </div>
    );
}

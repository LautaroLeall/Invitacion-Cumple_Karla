// src/components/InfoModal/InfoModal.jsx
import { useEffect, useRef } from 'react';
import './InfoModal.css';
import { copyToClipboard } from '../../utils/clipboard';

export default function InfoModal({
    isOpen,
    onClose,
    tips = [
        '¡Por favor ser puntuales!',
        '¡Confirmar asistencia a la brevedad!',
        '¡Llevar traje de baño!',
    ],
    contact = '3874579414',
}) {
    const closeRef = useRef(null);
    const prevFocus = useRef(null);

    useEffect(() => {
        if (!isOpen) return;
        prevFocus.current = document.activeElement;
        setTimeout(() => {
            if (closeRef.current && typeof closeRef.current.focus === 'function') closeRef.current.focus();
        }, 60);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
            if (prevFocus.current && typeof prevFocus.current.focus === 'function') prevFocus.current.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleCopyNumber = async () => {
        const ok = await copyToClipboard(contact);
        // simple feedback: alert (could be toast). Keep simple here:
        if (ok) alert('Número copiado al portapapeles');
        else alert('No se pudo copiar el número');
    };

    return (
        <div className="info-backdrop" role="dialog" aria-modal="true" aria-labelledby="infoTitle">
            <div className="info-modal">
                <button ref={closeRef} className="info-close" aria-label="Cerrar" onClick={onClose}>×</button>
                <h2 id="infoTitle">Tips y Notas</h2>

                <ul className="info-list">
                    {tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>

                <div className="info-contact">
                    <div className="info-key">Contacto Carlos</div>
                    <div className="info-value">{contact}</div>
                    <button className="btn-copy-small" onClick={handleCopyNumber}>Copiar</button>
                </div>

                <div className="info-footer">
                    <button className="btn-outline" onClick={onClose}>Cerrar</button>
                </div>
            </div>
        </div>
    );
}

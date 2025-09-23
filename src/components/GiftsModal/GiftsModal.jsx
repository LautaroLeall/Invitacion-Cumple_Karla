// src/components/GiftsModal/GiftsModal.jsx
import { useEffect, useRef, useState } from 'react';
import './GiftsModal.css';
import { copyToClipboard } from '../../utils/clipboard';

// - copia al portapapeles los datos que se soliciten
// - muestra toast breve con confirmación
export default function GiftsModal({
    isOpen,
    onClose,
    data = {
        cuenta: 'Mercado Pago',
        alias: 'karla.alias',
        cbu: '0000003100025232322858',
        titular: 'Karla Barrionuevo',
    },
}) {
    const closeRef = useRef(null);
    const prevFocus = useRef(null);
    const [toast, setToast] = useState(null);

    useEffect(() => {
        if (!isOpen) return;

        prevFocus.current = document.activeElement;
        setTimeout(() => {
            if (closeRef.current && typeof closeRef.current.focus === 'function') closeRef.current.focus();
        }, 60);

        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        const onKey = (e) => {
            if (e.key === 'Escape') onClose && onClose();
        };
        window.addEventListener('keydown', onKey);

        return () => {
            window.removeEventListener('keydown', onKey);
            document.body.style.overflow = prevOverflow;
            if (prevFocus.current && typeof prevFocus.current.focus === 'function') prevFocus.current.focus();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const handleCopy = async (label, value) => {
        const ok = await copyToClipboard(value);
        setToast(ok ? `Copiado: ${label}` : `No se pudo copiar ${label}`);
        setTimeout(() => setToast(null), 2500);
    };

    return (
        <div className="gifts-backdrop" role="dialog" aria-modal="true" aria-labelledby="giftsTitle">
            <div className="gifts-modal">
                <button ref={closeRef} className="gifts-close" aria-label="Cerrar" onClick={onClose}>×</button>
                <h2 id="giftsTitle">Regalos</h2>
                <p className="gifts-sub">Si deseas regalar algo además de tu hermosa presencia, te dejo mis datos:</p>

                <div className="gifts-list">
                    <div className="gift-row">
                        <div className="gift-key">Cuenta</div>
                        <div className="gift-value">{data.cuenta}</div>
                    </div>

                    <div className="gift-row">
                        <div className="gift-key">Alias</div>
                        <div className="gift-value">{data.alias}</div>
                        <button className="btn-copy" onClick={() => handleCopy('Alias', data.alias)}>Copiar</button>
                    </div>

                    <div className="gift-row">
                        <div className="gift-key">CBU</div>
                        <div className="gift-value">{data.cbu}</div>
                        <button className="btn-copy" onClick={() => handleCopy('CBU', data.cbu)}>Copiar</button>
                    </div>

                    <div className="gift-row">
                        <div className="gift-key">Titular</div>
                        <div className="gift-value">{data.titular}</div>
                    </div>
                </div>

                <div className="gifts-footer">
                    <button className="btn-outline" onClick={onClose}>Cerrar</button>
                </div>

                {toast && <div className="gifts-toast" role="status">{toast}</div>}
            </div>
        </div>
    );
}

// src/components/FormModal/FormModal.jsx
import { useEffect, useRef, useState } from 'react';
import './FormModal.css';
import { openWhatsApp } from '../../utils/whatsapp';

// - valida nombre/apellido y selección (Asistir / No asistir)
// - al submit arma el mensaje y redirige a WhatsApp (openWhatsApp)
export default function FormModal({ isOpen, onClose, phone }) {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [asistira, setAsistira] = useState(null); // true = sí, false = no, null = no seleccionado
    const [error, setError] = useState(null);
    const firstInputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            setError(null);
            // foco al primer input
            setTimeout(() => firstInputRef.current && firstInputRef.current.focus(), 60);
        } else {
            // limpiar campos si querés al cerrar
            // setNombre(''); setApellido(''); setAsistira(null);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const validate = () => {
        if (!nombre.trim() || nombre.trim().length < 2) {
            setError('Por favor ingresá tu nombre (mín. 2 caracteres).');
            return false;
        }
        if (!apellido.trim() || apellido.trim().length < 2) {
            setError('Por favor ingresá tu apellido (mín. 2 caracteres).');
            return false;
        }
        if (asistira === null) {
            setError('Por favor indicá si podrás asistir o no.');
            return false;
        }
        setError(null);
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // armar y abrir WhatsApp con el util
        openWhatsApp({
            phone: phone || '5493874579414',
            nombre: nombre.trim(),
            apellido: apellido.trim(),
            asistira: Boolean(asistira),
            // extraText: puedes pasar más info si quisieras
        });

        // Opcional: cerramos el modal (aunque al abrir WhatsApp generalmente cambia la ventana)
        if (typeof onClose === 'function') onClose();
    };

    return (
        <div className="rsvp-backdrop" role="dialog" aria-modal="true" aria-labelledby="rsvpTitle">
            <div className="rsvp-modal">
                <button className="rsvp-close" onClick={onClose} aria-label="Cerrar invitación">×</button>
                <h2 id="rsvpTitle">Confirmar asistencia</h2>
                
                <form onSubmit={handleSubmit} className="rsvp-form">
                    <label className="rsvp-label">
                        Nombre
                        <input
                            ref={firstInputRef}
                            type="text"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            placeholder="Tu nombre"
                            aria-required="true"
                        />
                    </label>

                    <label className="rsvp-label">
                        Apellido
                        <input
                            type="text"
                            value={apellido}
                            onChange={(e) => setApellido(e.target.value)}
                            placeholder="Tu apellido"
                            aria-required="true"
                        />
                    </label>

                    <fieldset className="rsvp-fieldset">
                        <legend>¿Podrás asistir?</legend>
                        <label className="rsvp-radio">
                            <input
                                type="radio"
                                name="asistira"
                                value="si"
                                checked={asistira === true}
                                onChange={() => setAsistira(true)}
                            />
                            Sí
                        </label>
                        <label className="rsvp-radio">
                            <input
                                type="radio"
                                name="asistira"
                                value="no"
                                checked={asistira === false}
                                onChange={() => setAsistira(false)}
                            />
                            No
                        </label>
                    </fieldset>

                    {error && <div className="rsvp-error" role="alert">{error}</div>}

                    <div className="rsvp-actions">
                        <button type="submit" className="btn-primary">Enviar por WhatsApp</button>
                        <button type="button" className="btn-outline" onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

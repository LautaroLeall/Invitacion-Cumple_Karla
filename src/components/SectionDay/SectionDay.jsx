// src/components/SectionDay/SectionDay.jsx
import { useState } from 'react';
import { buildGoogleCalendarLink } from '../../utils/calendar';
import './SectionDay.css';

// SectionDay
// - Muestra la fecha del evento y permite "Agendar"
export default function SectionDay({
    title = "Dia",
    startDate = '2025-10-11T11:00:00',
    durationMinutes = 420,
    location = 'Camino a San Agustin - Una Casa',
}) {
    const [toast, setToast] = useState(null);

    const start = new Date(startDate);
    const end = new Date(start.getTime() + durationMinutes * 60000);

    function isMobileDevice() {
        return /android|iphone|ipad|ipod|windows phone/i.test(navigator.userAgent);
    }

    const handleAgendar = () => {
        try {
            const titleForCalendar = `15 años de Karla`;
            const detailsForCalendar = [
                `Dirección: ${location}`,
                `Contacto: 3874579414`,
                '¡Llevá traje de baño!'
            ].join('\n');

            const gcal = buildGoogleCalendarLink({
                title: titleForCalendar,
                details: detailsForCalendar,
                location,
                startDate: start,
                endDate: end,
                tz: 'America/Argentina/Tucuman',
            });

            // En móviles suele funcionar mejor abrir en la misma pestaña
            if (isMobileDevice()) {
                window.location.href = gcal;
            } else {
                window.open(gcal, '_blank', 'noopener,noreferrer');
            }

            setToast('Se abrió el calendario. Seguí los pasos para guardar el evento.');
            setTimeout(() => setToast(null), 3000);

        } catch (err) {
            console.error(err);
            setToast('Ocurrió un error al generar el evento. Reintenta.');
            setTimeout(() => setToast(null), 3000);
        }
    };

    return (
        <section className="section-day" id="section-day" aria-labelledby="dayTitle">
            <div className="day-card">
                <h2 id="dayTitle">{title}</h2>
                <p className="day-datetime">
                    {start.toLocaleDateString()} — {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
                <p className="day-location">{location}</p>

                <div className="day-actions">
                    <button className="btn-primary" onClick={handleAgendar} aria-label="Agendar evento en mi calendario">
                        Agendar
                    </button>
                </div>

                {toast && <div className="toast">{toast}</div>}
            </div>
        </section>
    );
}

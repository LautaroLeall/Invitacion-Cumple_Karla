// src/components/SectionPlace/SectionPlace.jsx
import React from 'react';
import './SectionPlace.css';

export default function SectionPlace({
    title = 'Lugar',
    placeName = 'Camino a San Agustin',
    address = 'Una Casa',
    onOpenRsvp,
}) {
    return (
        <section className="section-place" aria-labelledby="placeTitle">
            <div className="place-card">
                <h2 id="placeTitle">{title}</h2>
                <p className="place-name">{placeName}</p>
                <p className="place-address">{address}</p>

                <div className="place-actions">
                    <button className="btn-primary" onClick={onOpenRsvp}>Confirmar Asistencia</button>
                </div>
            </div>
        </section>
    );
}

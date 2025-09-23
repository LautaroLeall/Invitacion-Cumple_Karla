// src/components/SectionPlace/SectionLocation.jsx
import React from 'react';
import './SectionLocation.css';

export default function SectionPlace({
    title = 'Ubicación',
    placeName = 'Camino a San Agustin',
    address = 'Una Casa',
    onOpenMap
}) {
    return (
        <section className="section-location" aria-labelledby="placeTitle">
            <div className="location-card">
                <h2 id="placeTitle">{title}</h2>
                <p className="location-name">{placeName}</p>
                <p className="location-address">{address}</p>

                <div className="location-actions">
                    <button className="btn-primary" onClick={onOpenMap} rel="noopener noreferrer">
                        ¿Cómo llegar?
                    </button>
                </div>
            </div>
        </section>
    );
}

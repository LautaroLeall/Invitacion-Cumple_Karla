// src/components/SectionPlace/SectionPlace.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './SectionPlace.css';

export default function SectionPlace({
    title = 'Lugar',
    placeName = 'Camino a San Agustin',
    address = 'Una Casa',
    onOpenRsvp,
}) {
    return (
        <motion.section 
            className="section-place" 
            aria-labelledby="placeTitle"
            initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
            <div className="place-card">
                <h2 id="placeTitle">{title}</h2>
                <p className="place-name">{placeName}</p>
                <p className="place-address">{address}</p>

                <div className="place-actions">
                    <button className="btn-primary" onClick={onOpenRsvp}>Confirmar Asistencia</button>
                </div>
            </div>
        </motion.section>
    );
}

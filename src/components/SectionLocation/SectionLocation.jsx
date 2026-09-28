// src/components/SectionPlace/SectionLocation.jsx
import React from 'react';
import { motion } from 'framer-motion';
import './SectionLocation.css';

export default function SectionPlace({
    title = 'Ubicación',
    placeName = 'Camino a San Agustin',
    address = 'Una Casa',
    onOpenMap
}) {
    return (
        <motion.section 
            className="section-location" 
            aria-labelledby="placeTitle"
            initial={{ opacity: 0, y: 60, scale: 0.9, rotateX: 20 }}
            whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, type: 'spring', bounce: 0.4 }}
        >
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
        </motion.section>
    );
}

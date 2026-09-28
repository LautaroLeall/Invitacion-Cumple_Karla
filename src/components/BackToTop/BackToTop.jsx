// src/components/BackToTop/BackToTop.jsx
import React from 'react';
import { FaArrowUp } from 'react-icons/fa';
import './BackToTop.css';

// - Botón para volver arriba con smooth scroll
export default function BackToTop() {
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            className="back-to-top"
            onClick={handleClick}
            aria-label="Volver arriba"
            title="Volver arriba"
        >
            <FaArrowUp style={{ marginRight: '6px' }} /> Arriba
        </button>
    );
}

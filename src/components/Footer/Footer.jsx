// src/components/Footer/Footer.jsx
import React from 'react';
import { FaWhatsapp, FaHeart } from 'react-icons/fa';
// eslint-disable-next-line
import { motion } from 'framer-motion';
import BackToTop from '../BackToTop/BackToTop';
import './Footer.css';

export default function Footer({
    phone = '+54 9 3874 57-9414',
    copyright = '© 2025 Karla',
    onOpenGifts = () => { },
    onOpenInfo = () => { }
}) {

    const footerVariants = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
    };

    // normalizamos el teléfono para mostrar y para link
    const phoneDisplay = phone;
    const phoneForLink = phone.replace(/\D/g, '');

    return (
        <motion.div className="motion-footer" initial="hidden" animate="show" variants={footerVariants}>
            <footer className="site-footer" role="contentinfo" aria-label="Información del pie de página">
                <div className="footer-inner">
                    <div className="footer-col footer-brand">
                        <div className="brand-line">
                            <FaHeart className="brand-icon" aria-hidden="true" />
                            <strong className="brand-title">Karla — 15</strong>
                        </div>
                        <p className="footer-sub">Fiesta al mediodía</p>
                    </div>

                    <div className="footer-col footer-contact" aria-labelledby="contactTitle">
                        <h3 id="contactTitle" className="sr-only">Contacto</h3>
                        <a
                            className="footer-phone"
                            href={`https://wa.me/${phoneForLink}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Enviar mensaje por WhatsApp al ${phoneDisplay}`}
                        >
                            <FaWhatsapp aria-hidden="true" /> {phoneDisplay}
                        </a>

                        <div className="footer-actions">
                            <button className="btn-outline small" onClick={onOpenGifts} aria-label="Ver regalos">
                                Ver regalos
                            </button>
                            <button className="btn-outline small" onClick={onOpenInfo} aria-label="Mas información">
                                + Info
                            </button>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <small>{copyright}</small>
                    <BackToTop />
                </div>
            </footer>
        </motion.div>
    );
}
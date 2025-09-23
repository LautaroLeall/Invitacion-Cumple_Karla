// src/components/HeaderBanner/HeaderBanner.jsx
import { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import useCountdown from '../../hooks/useCountdown';
import './HeaderBanner.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin && gsap.registerPlugin(ScrollTrigger);

export default function HeaderBanner({
    name = 'Karla',
    dateString = '11 - 10 - 2025',
    subtitle = 'Se acerca el gran día, ¡no te lo pierdas!',
    targetDate = '2025-10-11T11:00:00',
    backgroundImage = '/banner-home.jpg',
}) {
    const { days, hours, minutes, seconds, finished } = useCountdown(targetDate);
    const heroRef = useRef(null);

    useEffect(() => {
        // Respeta prefers-reduced-motion
        const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduce) return;

        // Si gsap y ScrollTrigger están disponibles, usamos ellos para el fade-out al scrollear
        if (gsap && ScrollTrigger) {
            const ctx = gsap.context(() => {
                // animación: opacidad y translateY hacia arriba a medida que el usuario scrollea 0 -> 60% del hero
                gsap.to(heroRef.current, {
                    opacity: 0,
                    y: -60,
                    ease: 'power1.out',
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: 'top top',
                        end: 'bottom top+=60%', // cuando top de hero alcance 60% sobre top viewport
                        scrub: 0.6,
                    },
                });
            }, heroRef);

            return () => ctx.revert();
        }

        // fallback simple: IntersectionObserver que añade clase .scrolled para usar CSS transitions
        const obs = new IntersectionObserver(
            (entries) => {
                const ent = entries[0];
                if (!ent.isIntersecting) {
                    heroRef.current && heroRef.current.classList.add('scrolled');
                } else {
                    heroRef.current && heroRef.current.classList.remove('scrolled');
                }
            },
            { root: null, threshold: 0, rootMargin: '-20% 0px 0px 0px' }
        );
        if (heroRef.current) obs.observe(heroRef.current);
        return () => obs.disconnect();
    }, []);

    return (
        <header
            className="hero hero--full"
            ref={heroRef}
            role="banner"
            aria-label={`Invitación de ${name}`}
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >

            {/* overlay gradient */}
            <div className="hero-overlay" />

            <motion.div
                className="hero-inner"
                initial={{ opacity: 0, y: 10, scale: 0.995 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.9, ease: 'easeOut' }}
            >
                <h1 className="hero-name">{name}</h1>
                <p className="hero-date">{dateString}</p>
                <p className="hero-subtitle">{subtitle}</p>

                {/* Countdown */}
                <div className="countdown countdown--hero" aria-live="polite">
                    {finished ? (
                        <div className="countdown-finished">¡Hoy es el gran día! 🎉</div>
                    ) : (
                        <div className="countdown-grid">
                            <div className="countdown-box"><span>{days}</span><small>días</small></div>
                            <div className="countdown-box"><span>{hours}</span><small>hs</small></div>
                            <div className="countdown-box"><span>{minutes}</span><small>min</small></div>
                            <div className="countdown-box"><span>{seconds}</span><small>seg</small></div>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* CTA: pequeña flecha para scrollear (opcional) */}
            <button
                className="hero-scroll-down"
                aria-label="Bajar a contenido"
                onClick={() => {
                    const el = document.getElementById('sbanner');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
            >
                ↓
            </button>
        </header>
    );
}

// src/components/SecondaryBanner/SecondaryBanner.jsx
import React, { useEffect, useRef, useState } from 'react';
import './SecondaryBanner.css';


/**
* SecondaryBanner
* Minimal, self-contained banner with center circle, subtle wreath ring and two gold strokes.
* - No external libs
* - Small CSS footprint (~100 lines)
* - Uses IntersectionObserver to reveal
*/
export default function SecondaryBanner({
    title = '¡LLEGÓ EL GRAN DÍA!',
    subtitle = '15 de Karla',
}) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);


    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => setShow(e.isIntersecting));
        }, { threshold: 0.18 });
        io.observe(el);
        return () => io.disconnect();
    }, []);


    return (
        <section
            id="sbanner"
            ref={ref}
            className={`sbanner ${show ? 'sbanner--show' : ''}`}
            aria-label="Banner decorativo"
        >
            <div className="sbanner-inner">
                <div className="sb-wreath circle" aria-hidden="true" />


                <div className="sb-circle" role="img" aria-label={title}>
                    <h2 className="sb-title">{title}</h2>
                    {subtitle && <div className="sb-sub">{subtitle}</div>}
                </div>


                <svg className="sb-strokes" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <path d="M0 50 C300 20 600 80 1200 50" stroke="#d99b4c" strokeWidth="3" fill="none" opacity="0.95" />
                    <path d="M0 70 C250 40 650 100 1200 70" stroke="#d99b4c72" strokeWidth="1.6" fill="none" />
                </svg>
            </div>
        </section>
    );
}
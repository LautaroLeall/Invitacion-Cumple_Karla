// src/components/SecondaryBanner/SecondaryBanner.jsx
import { useEffect, useRef, useState } from 'react';
import './SecondaryBanner.css';

export default function SecondaryBanner({
    titleTop = 'MIS XV',
    titleMain = 'KARLA',
    titleBottom = '❤',
}) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => entries.forEach((e) => setShow(e.isIntersecting)),
            { threshold: 0.18 }
        );
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
                <div className="sb-wreath" aria-hidden="true" />

                <div className="sb-circle" role="img" aria-label={`${titleTop} ${titleMain}`}>
                    <div className="sb-top">{titleTop}</div>
                    <div className="sb-main">{titleMain}</div>
                    <div className="sb-heart" aria-hidden="true">{titleBottom}</div>
                </div>

                <div className="sb-strokes-wrap" aria-hidden="true">
                    <svg className="sb-strokes" viewBox="0 0 1200 120" preserveAspectRatio="xMidYMid meet">
                        <path d="M0 50 C300 20 600 80 1200 50" stroke="#d99b4c" strokeWidth="3" fill="none" opacity="0.95" />
                        <path d="M0 70 C250 40 650 100 1200 70" stroke="#d99b4c72" strokeWidth="1.6" fill="none" />
                    </svg>
                </div>
            </div>
        </section>
    );
}

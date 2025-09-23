// src/components/SectionGifts/SectionGifts.jsx
import React from 'react';
import './SectionGifts.css';

export default function SectionGifts({
    onOpen = () => { },
    headline = '¡Tu presencia es el regalo más importante!',
    sub = 'Pero si deseas hacerme un obsequio podrás depositar en la siguiente cuenta:',
    btnText = 'VER CUENTA BANCARIA',
}) {
    return (
        <section className="section-gifts" aria-labelledby="giftsTitle">
            <div className="section-gifts-card">
                <div className="gifts-icon" aria-hidden="true">
                    <img className='gifts-icon-img' src='/gifts-icon.jpg' alt='Regalo' />
                </div>
                <h2 className='title' id="giftsTitle">{headline}</h2>
                <p className="section-gifts-sub">{sub}</p>

                <div className="section-gifts-cta">
                    <button
                        className="section-gifts-btn"
                        onClick={onOpen}
                        aria-haspopup="dialog"
                        aria-controls="gifts-modal"
                    >
                        {btnText}
                    </button>
                </div>
            </div>
        </section>
    );
}

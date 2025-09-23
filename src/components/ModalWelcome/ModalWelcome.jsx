// src/components/ModalWelcome/ModalWelcome.jsx
import React from 'react';
import './ModalWelcome.css';

const ModalWelcome = ({ isOpen, onChooseMusic }) => {
    if (!isOpen) return null;

    return (
        <div className="backdrop">
            <div className="modal">
                <h2 className="title">Bienvenidos a la invitación de Karla</h2>
                <p className="description">La música de fondo es parte de la experiencia</p>
                <div className="buttons">
                    <button className="musicButton" onClick={() => onChooseMusic(true)}>Continuar con música</button>
                    <button className="musicButton" onClick={() => onChooseMusic(false)}>Continuar sin música</button>
                </div>
            </div>
        </div>
    );
};

export default ModalWelcome;

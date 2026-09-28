// src/components/ModalWelcome/ModalWelcome.jsx
import React from 'react';
import { FaMusic, FaVolumeMute } from 'react-icons/fa';
import './ModalWelcome.css';

const ModalWelcome = ({ isOpen, onChooseMusic }) => {
    if (!isOpen) return null;

    return (
        <div className="backdrop">
            <div className="modal">
                <h2 className="title">Bienvenidos a la invitación de Karla</h2>
                <p className="description">La música de fondo es parte de la experiencia. ¿Deseas activarla?</p>
                <div className="buttons">
                    <button className="btn-primary" onClick={() => onChooseMusic(true)}>
                        <FaMusic /> Con música
                    </button>
                    <button className="btn-outline" onClick={() => onChooseMusic(false)}>
                        <FaVolumeMute /> Sin música
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalWelcome;

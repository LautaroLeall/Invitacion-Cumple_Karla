// src/components/AudioPlayer/AudioPlayer.jsx
import React from 'react';
import './AudioPlayer.css';
import { FaPlay, FaPause } from 'react-icons/fa';

// AudioPlayer
// - Icono flotante para controlar reproducción de música
const AudioPlayer = ({ playing, toggle }) => {
    return (
        <button
            className="audioButton"
            onClick={toggle}
            aria-label={playing ? 'Pausar música' : 'Reproducir música'}
        >
            {playing ? <FaPause /> : <FaPlay />}
        </button>
    );
};

export default AudioPlayer;

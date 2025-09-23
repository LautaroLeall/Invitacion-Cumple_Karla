// src/hooks/useAudio.js
import { useState, useRef } from 'react';

// useAudio Hook
// - Controla la reproducción de audio global
// - Exposición: play, pause, toggle, setVolume, estado playing
// - Recibe src del audio
export default function useAudio(src) {
    const audioRef = useRef(new Audio(src));
    const [playing, setPlaying] = useState(false);

    const play = () => {
        audioRef.current.play().then(() => setPlaying(true)).catch(console.log);
    };

    const pause = () => {
        audioRef.current.pause();
        setPlaying(false);
    };

    const toggle = () => {
        if (playing) pause();
        else play();
    };

    const setVolume = (vol) => {
        audioRef.current.volume = vol; // 0.0 - 1.0
    };

    return { audioRef, playing, play, pause, toggle, setVolume };
}

// src/hooks/useCountdown.js
import { useEffect, useState, useCallback } from 'react';

// useCountdown
// - Calcula la diferencia entre ahora y una fecha objetivo
// - Devuelve días, horas, minutos, segundos y finished (bool)

export default function useCountdown(targetDate) {
    const target = new Date(targetDate).getTime();

    const calcDiff = useCallback(() => {
        const now = new Date().getTime();
        const diff = target - now;

        if (diff <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, finished: true };
        }

        return {
            days: Math.floor(diff / (1000 * 60 * 60 * 24)),
            hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((diff / 1000 / 60) % 60),
            seconds: Math.floor((diff / 1000) % 60),
            finished: false,
        };
    }, [target]);

    const [timeLeft, setTimeLeft] = useState(calcDiff);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calcDiff());
        }, 1000);

        return () => clearInterval(timer);
    }, [calcDiff]);

    return timeLeft;
}

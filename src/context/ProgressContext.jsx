import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ProgressContext = createContext();

const STORAGE_KEY = 'swiftspeech_progress';

const INITIAL_DATA = {
    xp: 0,
    level: 1
};

export const ProgressProvider = ({ children }) => {
    const [progress, setProgress] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    }, [progress]);

    const addXp = (amount) => {
        setProgress(prev => {
            const newXp = prev.xp + amount;
            const newLevel = Math.floor(newXp / 100) + 1;

            if (newLevel > prev.level) {
                // Level Up!
                confetti({
                    particleCount: 150,
                    spread: 100,
                    origin: { y: 0.6 },
                    colors: ['#FFD700', '#FFA500', '#FF4500']
                });
                alert(`Level Up! You are now level ${newLevel}!`);
            }

            return {
                xp: newXp,
                level: newLevel
            };
        });
    };

    return (
        <ProgressContext.Provider value={{ ...progress, addXp }}>
            {children}
        </ProgressContext.Provider>
    );
};

export const useProgress = () => {
    const context = useContext(ProgressContext);
    if (!context) {
        throw new Error('useProgress must be used within a ProgressProvider');
    }
    return context;
};

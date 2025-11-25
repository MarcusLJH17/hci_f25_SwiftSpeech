import React, { createContext, useContext, useState, useEffect } from 'react';

const FlashcardContext = createContext();

const STORAGE_KEY = 'swiftspeech_data';

const INITIAL_DATA = [
    {
        id: 'demo-set-1',
        title: 'Spanish Basics',
        description: 'Common phrases and words',
        cards: [
            { id: 'c1', front: 'Hola', back: 'Hello' },
            { id: 'c2', front: 'Gracias', back: 'Thank you' },
            { id: 'c3', front: 'Adios', back: 'Goodbye' },
        ]
    }
];

export const FlashcardProvider = ({ children }) => {
    const [sets, setSets] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        return saved ? JSON.parse(saved) : INITIAL_DATA;
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(sets));
    }, [sets]);

    const addSet = (title, description) => {
        const newSet = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            title,
            description,
            cards: []
        };
        setSets(prevSets => [...prevSets, newSet]);
        return newSet.id;
    };

    const addCardToSet = (setId, front, back) => {
        setSets(prevSets => prevSets.map(set => {
            if (set.id === setId) {
                return {
                    ...set,
                    cards: [...set.cards, { id: Date.now().toString() + Math.random().toString(36).substr(2, 9), front, back }]
                };
            }
            return set;
        }));
    };

    const deleteSet = (setId) => {
        setSets(prevSets => prevSets.filter(set => set.id !== setId));
    };

    const getSet = (setId) => {
        return sets.find(set => set.id === setId);
    };

    return (
        <FlashcardContext.Provider value={{ sets, addSet, addCardToSet, deleteSet, getSet }}>
            {children}
        </FlashcardContext.Provider>
    );
};

export const useFlashcards = () => {
    const context = useContext(FlashcardContext);
    if (!context) {
        throw new Error('useFlashcards must be used within a FlashcardProvider');
    }
    return context;
};

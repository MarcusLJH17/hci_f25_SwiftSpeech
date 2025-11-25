import React, { useState, useEffect } from 'react';
import '../styles/Flashcard.css';

const Flashcard = ({ front, back }) => {
    const [isFlipped, setIsFlipped] = useState(false);

    useEffect(() => {
        setIsFlipped(false);
    }, [front, back]);

    const handleClick = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div className={`flashcard-container ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
            <div className="flashcard-inner">
                <div className="flashcard-front glass-panel">
                    <div className="card-content">
                        {front}
                    </div>
                    <div className="card-hint">Click to flip</div>
                </div>
                <div className="flashcard-back glass-panel">
                    <div className="card-content">
                        {back}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Flashcard;

import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardContext';
import Flashcard from '../components/Flashcard';
import ProgressBar from '../components/ProgressBar';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const StudySet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getSet } = useFlashcards();
    const set = getSet(id);

    const [currentIndex, setCurrentIndex] = useState(0);

    if (!set) return <div className="container">Set not found</div>;

    const currentCard = set.cards[currentIndex];
    const hasNext = currentIndex < set.cards.length - 1;
    const hasPrev = currentIndex > 0;

    const nextCard = () => {
        if (hasNext) setCurrentIndex(currentIndex + 1);
    };

    const prevCard = () => {
        if (hasPrev) setCurrentIndex(currentIndex - 1);
    };

    return (
        <div className="container" style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate('/')} style={{ color: 'var(--color-text-muted)' }}>
                    <ArrowLeft />
                </button>
                <div>
                    <h2 style={{ margin: 0 }}>{set.title}</h2>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>{set.cards.length} cards</p>
                </div>
            </header>

            <div style={{ maxWidth: '600px', margin: '0 auto', width: '100%', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <ProgressBar current={currentIndex + 1} total={set.cards.length} label="Progress" />

                <div style={{ margin: '2rem 0' }}>
                    {currentCard ? (
                        <Flashcard front={currentCard.front} back={currentCard.back} />
                    ) : (
                        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>No cards in this set</div>
                    )}
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
                    <button
                        onClick={prevCard}
                        disabled={!hasPrev}
                        className="glass-panel"
                        style={{ padding: '1rem', borderRadius: '50%', opacity: hasPrev ? 1 : 0.5 }}
                    >
                        <ChevronLeft size={32} />
                    </button>

                    <span style={{ color: 'var(--color-text-muted)' }}>
                        {currentIndex + 1} / {set.cards.length}
                    </span>

                    <button
                        onClick={nextCard}
                        disabled={!hasNext}
                        className="glass-panel"
                        style={{ padding: '1rem', borderRadius: '50%', opacity: hasNext ? 1 : 0.5 }}
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudySet;

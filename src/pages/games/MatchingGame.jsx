import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../../context/FlashcardContext';
import { useProgress } from '../../context/ProgressContext';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

const MatchingGame = () => {
    const { sets } = useFlashcards();
    const { addXp } = useProgress();
    const [selectedSetId, setSelectedSetId] = useState(null);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [disabled, setDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [gameActive, setGameActive] = useState(false);

    // Initialize game when set is selected
    useEffect(() => {
        if (selectedSetId) {
            const set = sets.find(s => s.id === selectedSetId);
            if (set) {
                // Create pairs (front and back)
                const gameCards = [
                    ...set.cards.map(card => ({ ...card, content: card.front, type: 'front', matchId: card.id })),
                    ...set.cards.map(card => ({ ...card, content: card.back, type: 'back', matchId: card.id }))
                ]
                    .sort(() => Math.random() - 0.5)
                    .map((card) => ({ ...card, uniqueId: Math.random() }));

                setCards(gameCards);
                setMatched([]);
                setFlipped([]);
                setTimeLeft(60);
                setGameOver(false);
                setGameActive(true);
            }
        }
    }, [selectedSetId, sets]);

    // Timer effect
    useEffect(() => {
        let timer;
        if (gameActive && timeLeft > 0 && !gameOver) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setGameOver(true);
            setGameActive(false);
        }
        return () => clearInterval(timer);
    }, [gameActive, timeLeft, gameOver]);

    // Handle card click
    const handleClick = (card) => {
        if (disabled || gameOver || flipped.length === 2 || flipped.some(c => c.uniqueId === card.uniqueId) || matched.includes(card.matchId)) return;

        const newFlipped = [...flipped, card];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setDisabled(true);
            // Check match
            if (newFlipped[0].matchId === newFlipped[1].matchId) {
                setMatched(prev => {
                    const newMatched = [...prev, newFlipped[0].matchId];
                    // Check win
                    if (newMatched.length === cards.length / 2) {
                        setGameActive(false);
                        addXp(50); // Award 50 XP
                        confetti({
                            particleCount: 100,
                            spread: 70,
                            origin: { y: 0.6 }
                        });
                    }
                    return newMatched;
                });
                setFlipped([]);
                setDisabled(false);
            } else {
                setTimeout(() => {
                    setFlipped([]);
                    setDisabled(false);
                }, 1000);
            }
        }
    };

    if (!selectedSetId) {
        return (
            <div className="container" style={{ paddingTop: '4rem' }}>
                <header style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <Link to="/games" style={{ color: 'var(--color-text-muted)' }}><ArrowLeft /></Link>
                    <h1 className="text-gradient" style={{ margin: 0 }}>Select a Set</h1>
                </header>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
                    {sets.map(set => (
                        <button
                            key={set.id}
                            onClick={() => setSelectedSetId(set.id)}
                            className="glass-panel"
                            style={{ padding: '2rem', textAlign: 'left', cursor: 'pointer', transition: 'var(--transition-fast)', color: 'white' }}
                        >
                            <h3 style={{ margin: '0 0 0.5rem 0' }}>{set.title}</h3>
                            <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>{set.cards.length} cards</p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setSelectedSetId(null)} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft /> Back to Sets
                </button>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                        color: timeLeft < 10 ? 'var(--color-error)' : 'inherit',
                        fontWeight: 'bold',
                        fontSize: '1.2rem'
                    }}>
                        {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                    </span>
                    <span>Matches: {matched.length} / {cards.length / 2}</span>
                    <button onClick={() => setSelectedSetId(null)} style={{ padding: '0.5rem', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }}>
                        <RefreshCw size={20} />
                    </button>
                </div>
            </header>

            {gameOver && matched.length !== cards.length / 2 && (
                <div className="glass-panel" style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 10,
                    padding: '2rem',
                    textAlign: 'center',
                    background: 'rgba(15, 23, 42, 0.95)',
                    border: '1px solid var(--color-error)'
                }}>
                    <h2 className="text-gradient" style={{ fontSize: '2rem' }}>Time's Up!</h2>
                    <p>You found {matched.length} matches.</p>
                    <button onClick={() => setSelectedSetId(null)} className="btn-primary">Try Again</button>
                </div>
            )}

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '1rem',
                maxWidth: '1000px',
                margin: '0 auto'
            }}>
                {cards.map(card => {
                    const isFlipped = flipped.some(c => c.uniqueId === card.uniqueId) || matched.includes(card.matchId);
                    const isMatched = matched.includes(card.matchId);

                    return (
                        <div
                            key={card.uniqueId}
                            onClick={() => handleClick(card)}
                            className="glass-panel"
                            style={{
                                height: '120px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '1rem',
                                textAlign: 'center',
                                cursor: isMatched ? 'default' : 'pointer',
                                background: isMatched ? 'rgba(34, 197, 94, 0.2)' : isFlipped ? 'rgba(99, 102, 241, 0.3)' : 'var(--color-bg-card)',
                                border: isFlipped ? '1px solid var(--color-primary)' : 'var(--border-subtle)',
                                transform: isFlipped ? 'scale(1.02)' : 'scale(1)',
                                transition: 'all 0.3s ease',
                                opacity: isMatched ? 0.5 : 1
                            }}
                        >
                            <span style={{
                                fontSize: '1rem',
                                fontWeight: 600,
                                opacity: isFlipped || isMatched ? 1 : 0, // Hide text if not flipped
                                transition: 'opacity 0.2s'
                            }}>
                                {card.content}
                            </span>
                            {!isFlipped && !isMatched && (
                                <div style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                                    borderRadius: 'var(--radius-md)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}>
                                    <span style={{ fontSize: '2rem', opacity: 0.2 }}>?</span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MatchingGame;

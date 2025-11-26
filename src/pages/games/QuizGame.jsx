import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../../context/FlashcardContext';
import { useProgress } from '../../context/ProgressContext';
import ProgressBar from '../../components/ProgressBar';
import { ArrowLeft, RefreshCw, Check, X } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizGame = () => {
    const { sets } = useFlashcards();
    const { addXp } = useProgress();
    const [selectedSetId, setSelectedSetId] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    // Initialize game
    useEffect(() => {
        if (selectedSetId) {
            const set = sets.find(s => s.id === selectedSetId);
            if (set && set.cards.length >= 4) {
                const shuffledCards = [...set.cards].sort(() => Math.random() - 0.5);

                const gameQuestions = shuffledCards.map(card => {
                    // Get 3 random distractors
                    const distractors = set.cards
                        .filter(c => c.id !== card.id)
                        .sort(() => Math.random() - 0.5)
                        .slice(0, 3)
                        .map(c => c.back);

                    const options = [...distractors, card.back].sort(() => Math.random() - 0.5);

                    return {
                        question: card.front,
                        answer: card.back,
                        options
                    };
                });

                setQuestions(gameQuestions);
                setCurrentQuestionIndex(0);
                setScore(0);
                setShowResult(false);
                setSelectedOption(null);
                setIsCorrect(null);
            } else if (set) {
                alert("You need at least 4 cards in a set to play Quiz Mode!");
                setSelectedSetId(null);
            }
        }
    }, [selectedSetId, sets]);

    const handleOptionClick = (option) => {
        if (selectedOption) return; // Prevent multiple clicks

        setSelectedOption(option);
        const correct = option === questions[currentQuestionIndex].answer;
        setIsCorrect(correct);

        if (correct) {
            setScore(score + 1);
            addXp(10); // Award 10 XP per correct answer
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                setShowResult(true);
            }
        }, 1500);
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

    if (showResult) {
        return (
            <div className="container" style={{ paddingTop: '4rem', textAlign: 'center' }}>
                <div className="glass-panel" style={{ padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
                    <h2 className="text-gradient" style={{ fontSize: '3rem', marginBottom: '1rem' }}>Quiz Complete!</h2>
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
                        You scored {score} out of {questions.length}
                    </p>
                    <button onClick={() => setSelectedSetId(null)} className="btn-primary">
                        Play Again
                    </button>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem', maxWidth: '800px' }}>
            <header style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <button onClick={() => setSelectedSetId(null)} style={{ color: 'var(--color-text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <ArrowLeft /> Quit
                </button>
                <div style={{ width: '200px' }}>
                    <ProgressBar current={currentQuestionIndex + 1} total={questions.length} label="Progress" />
                </div>
            </header>

            <div style={{ marginBottom: '2rem' }}>
                <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', marginBottom: '2rem', minHeight: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <h2 style={{ fontSize: '2rem', margin: 0 }}>{currentQuestion?.question}</h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    {currentQuestion?.options.map((option, index) => {
                        let style = {};
                        if (selectedOption) {
                            if (option === currentQuestion.answer) {
                                style = { background: 'rgba(34, 197, 94, 0.3)', borderColor: 'var(--color-success)' };
                            } else if (option === selectedOption) {
                                style = { background: 'rgba(239, 68, 68, 0.3)', borderColor: 'var(--color-error)' };
                            } else {
                                style = { opacity: 0.5 };
                            }
                        }

                        return (
                            <button
                                key={index}
                                onClick={() => handleOptionClick(option)}
                                className="glass-panel"
                                style={{
                                    padding: '1.5rem',
                                    fontSize: '1.1rem',
                                    textAlign: 'center',
                                    transition: 'all 0.2s',
                                    color: 'white',
                                    ...style
                                }}
                                disabled={!!selectedOption}
                            >
                                {option}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default QuizGame;

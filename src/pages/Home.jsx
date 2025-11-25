import React from 'react';
import { Link } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardContext';
import LevelProgress from '../components/LevelProgress';
import { Brain, Play, Plus, BookOpen } from 'lucide-react';

const Home = () => {
    const { sets, deleteSet } = useFlashcards();

    return (
        <div className="container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h1 className="text-gradient" style={{ fontSize: '4rem', marginBottom: '1rem', fontWeight: 800 }}>
                    SwiftSpeech
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--color-text-muted)', maxWidth: '600px', margin: '0 auto' }}>
                    Master a new language with interactive flashcards and engaging minigames.
                </p>
            </div>

            <div style={{ maxWidth: '800px', margin: '0 auto', marginBottom: '3rem' }}>
                <LevelProgress />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <BookOpen className="text-gradient" /> Your Sets
                    </h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1.5rem' }}>
                        {sets.map(set => (
                            <div key={set.id} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '1rem',
                                borderRadius: 'var(--radius-sm)',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }}>
                                <div>
                                    <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem' }}>{set.title}</h3>
                                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--color-text-muted)' }}>{set.cards.length} cards</p>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <Link to={`/study/${set.id}`} className="btn-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                                        Study
                                    </Link>
                                    <button
                                        onClick={() => {
                                            if (window.confirm('Delete this set?')) deleteSet(set.id);
                                        }}
                                        style={{ padding: '0.5rem', color: 'var(--color-error)', opacity: 0.7 }}
                                    >
                                        ✕
                                    </button>
                                </div>
                            </div>
                        ))}
                        {sets.length === 0 && (
                            <p style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>No sets created yet.</p>
                        )}
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <Link to="/create" className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'var(--transition-fast)' }}>
                        <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '50%' }}>
                            <Plus size={32} color="var(--color-primary)" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>Create New Set</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Build custom flashcard decks</p>
                        </div>
                    </Link>

                    <Link to="/games" className="glass-panel" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', transition: 'var(--transition-fast)' }}>
                        <div style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '1rem', borderRadius: '50%' }}>
                            <Play size={32} color="var(--color-secondary)" />
                        </div>
                        <div>
                            <h3 style={{ margin: 0 }}>Game Hub</h3>
                            <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Play minigames to learn</p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Grid, HelpCircle } from 'lucide-react';

const GameHub = () => {
    return (
        <div className="container" style={{ paddingTop: '4rem' }}>
            <header style={{ marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <Link to="/" style={{ color: 'var(--color-text-muted)' }}>
                    <ArrowLeft />
                </Link>
                <h1 className="text-gradient" style={{ margin: 0 }}>Game Hub</h1>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <Link to="/games/matching" className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'var(--transition-fast)' }}>
                    <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '1rem', borderRadius: '50%', width: 'fit-content' }}>
                        <Grid size={32} color="var(--color-primary)" />
                    </div>
                    <h2 style={{ margin: 0 }}>Matching Game</h2>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Race against time to match terms with their definitions.</p>
                </Link>

                <Link to="/games/quiz" className="glass-panel" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', transition: 'var(--transition-fast)' }}>
                    <div style={{ background: 'rgba(6, 182, 212, 0.2)', padding: '1rem', borderRadius: '50%', width: 'fit-content' }}>
                        <HelpCircle size={32} color="var(--color-secondary)" />
                    </div>
                    <h2 style={{ margin: 0 }}>Quiz Mode</h2>
                    <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Test your knowledge with multiple choice questions.</p>
                </Link>
            </div>
        </div>
    );
};

export default GameHub;

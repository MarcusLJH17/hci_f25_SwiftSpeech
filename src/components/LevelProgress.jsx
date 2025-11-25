import React from 'react';
import { useProgress } from '../context/ProgressContext';
import { Trophy } from 'lucide-react';

const LevelProgress = () => {
    const { xp, level } = useProgress();

    const currentLevelXp = (level - 1) * 100;
    const nextLevelXp = level * 100;
    const progressInLevel = xp - currentLevelXp;
    const percentage = Math.min(100, Math.max(0, (progressInLevel / 100) * 100));

    return (
        <div className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
            }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a1a' }}>{level}</span>
            </div>

            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Trophy size={16} color="#FFD700" /> Level {level}
                    </span>
                    <span style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
                        {Math.floor(xp)} XP / {nextLevelXp} XP
                    </span>
                </div>

                <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                    <div
                        style={{
                            width: `${percentage}%`,
                            height: '100%',
                            background: 'linear-gradient(90deg, #FFD700, #FFA500)',
                            borderRadius: 'var(--radius-full)',
                            transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default LevelProgress;

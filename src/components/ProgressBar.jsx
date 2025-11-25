import React from 'react';

const ProgressBar = ({ current, total, label }) => {
    const percentage = Math.min(100, Math.max(0, (current / total) * 100));

    return (
        <div style={{ width: '100%', margin: '1rem 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
                <span>{label}</span>
                <span>{current} / {total}</span>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div
                    style={{
                        width: `${percentage}%`,
                        height: '100%',
                        background: 'var(--gradient-primary)',
                        borderRadius: 'var(--radius-full)',
                        transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                />
            </div>
        </div>
    );
};

export default ProgressBar;

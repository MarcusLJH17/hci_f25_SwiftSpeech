import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFlashcards } from '../context/FlashcardContext';
import { Plus, Save, ArrowLeft, Trash2 } from 'lucide-react';

const CreateSet = () => {
    const navigate = useNavigate();
    const { addSet, addCardToSet } = useFlashcards();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cards, setCards] = useState([{ id: Date.now(), front: '', back: '' }]);

    const handleAddCard = () => {
        setCards([...cards, { id: Date.now(), front: '', back: '' }]);
    };

    const handleCardChange = (id, field, value) => {
        setCards(cards.map(card => card.id === id ? { ...card, [field]: value } : card));
    };

    const handleRemoveCard = (id) => {
        if (cards.length > 1) {
            setCards(cards.filter(card => card.id !== id));
        }
    };

    const handleSave = () => {
        if (!title.trim()) return alert('Please enter a title');

        const setId = addSet(title, description);
        cards.forEach(card => {
            if (card.front.trim() && card.back.trim()) {
                addCardToSet(setId, card.front, card.back);
            }
        });

        navigate('/');
    };

    return (
        <div className="container" style={{ paddingBottom: '4rem' }}>
            <header style={{ padding: '2rem 0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button onClick={() => navigate('/')} style={{ color: 'var(--color-text-muted)' }}>
                    <ArrowLeft />
                </button>
                <h1 className="text-gradient" style={{ margin: 0 }}>Create New Set</h1>
            </header>

            <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Set Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g., Spanish Verbs"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'white',
                            fontSize: '1.1rem'
                        }}
                    />
                </div>
                <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--color-text-muted)' }}>Description (Optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="What is this set about?"
                        style={{
                            width: '100%',
                            padding: '1rem',
                            background: 'rgba(0,0,0,0.2)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: 'var(--radius-sm)',
                            color: 'white',
                            minHeight: '80px'
                        }}
                    />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cards.map((card, index) => (
                    <div key={card.id} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', gap: '1rem', alignItems: 'start' }}>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Term (Front)</label>
                            <input
                                type="text"
                                value={card.front}
                                onChange={(e) => handleCardChange(card.id, 'front', e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                        <div style={{ flex: 1 }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>Definition (Back)</label>
                            <input
                                type="text"
                                value={card.back}
                                onChange={(e) => handleCardChange(card.id, 'back', e.target.value)}
                                style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 'var(--radius-sm)', color: 'white' }}
                            />
                        </div>
                        <button
                            onClick={() => handleRemoveCard(card.id)}
                            style={{ marginTop: '2rem', color: 'var(--color-error)', opacity: cards.length > 1 ? 1 : 0.5 }}
                            disabled={cards.length <= 1}
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button onClick={handleAddCard} className="glass-panel" style={{ padding: '1rem 2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}>
                    <Plus size={20} /> Add Card
                </button>
                <button onClick={handleSave} className="btn-primary" style={{ padding: '1rem 3rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem' }}>
                    <Save size={20} /> Save Set
                </button>
            </div>
        </div>
    );
};

export default CreateSet;

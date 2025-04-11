import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import '../styles/Affirmations.css';
import Header from '../Header';

const Affirmations = () => {
    const [text, setText] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch('http://localhost:3000/api/affirmations/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text })
            });
            
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.details || errorData.error || 'Error analyzing your text');
            }
            
            const data = await response.json();
            setResult(data);
        } catch (err) {
            console.error('Error details:', err.message);
            setError(err.message || 'Error analyzing your text. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const emotionColors = {
        joy: '#FFD700',
        love: '#FF69B4',
        sadness: '#4169E1',
        anger: '#FF4500',
        fear: '#800080',
        surprise: '#FFA500',
        neutral: '#808080'
    };

    return (
        <>
            <Header />
            <div className="affirmations-container">
                <h1>Daily Affirmations</h1>
                <p className="subtitle">Share your thoughts, and receive personalized affirmations based on your emotions</p>
                
                <form onSubmit={handleSubmit} className="affirmation-form">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Describe your goals, dreams, or current feelings..."
                        className="text-input"
                        rows="4"
                        required
                    />
                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={loading}
                    >
                        {loading ? 'Generating Affirmation...' : 'Get Affirmation'}
                    </button>
                </form>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <p className="error-help">If the problem persists, please try again later or contact support.</p>
                    </div>
                )}

                {loading && (
                    <div className="loading-container">
                        <div className="loading-spinner"></div>
                        <p>Analyzing your emotions and generating a personalized affirmation...</p>
                    </div>
                )}

                <AnimatePresence>
                    {result && !loading && (
                        <motion.div 
                            className="result-container"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <div 
                                className="emotion-badge"
                                style={{ backgroundColor: emotionColors[result.emotion] }}
                            >
                                {result.emotion}
                            </div>
                            <div className="affirmation-card">
                                <p className="affirmation-text">{result.affirmation}</p>
                            </div>
                            <div className="confidence-meter">
                                <div 
                                    className="confidence-bar"
                                    style={{ 
                                        width: `${result.confidence * 100}%`,
                                        backgroundColor: emotionColors[result.emotion]
                                    }}
                                ></div>
                                <span>Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Affirmations; 
import React from 'react';

const WelcomeScreen = ({ onStart }) => (
    <div className="welcome-screen">
        <h1>Welcome to Our Customer Survey</h1>
        <p>We value your feedback. Please take a moment to answer a few questions about your experience.</p>
        <button onClick={onStart} className="go-button" aria-label="Start Survey">GO</button>
    </div>
);

export default WelcomeScreen;
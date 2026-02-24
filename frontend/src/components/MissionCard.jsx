import React from 'react';
import '../styles/MissionCard.css';

const MissionCard = () => {
    return (
        <div className="mission-card">
            <div className="card-header">
                <span className="status-dot"></span> PROJECT IDENTITY
            </div>
            <div className="card-body">
                <h3 className="mission-subtitle">CORE MISSION</h3>
                <p className="mission-text">
                    Empowering student finances through <span className="text-highlight">open-source</span> innovation.
                </p>
            </div>
            <div className="card-footer">
                <div className="color-dots">
                    <span className="dot-green"></span>
                    <span className="dot-red"></span>
                </div>
                <span className="color-label">MIDNIGHT EMERALD &amp; CYBER CRIMSON</span>
            </div>
        </div>
    );
};

export default MissionCard;

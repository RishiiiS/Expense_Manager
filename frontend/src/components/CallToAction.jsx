import React from 'react';
import '../styles/CallToAction.css';

const CallToAction = () => {
    return (
        <section className="cta-section" id="cta">
            <div className="cta-content">
                <h2 className="cta-title">
                    READY<br />
                    <span className="title-outline">TO SCALE?</span>
                </h2>
                <div className="cta-actions">
                    <button className="get-started-btn">GET STARTED NOW</button>
                    <a href="#documentation" className="documentation-link">
                        DOCUMENTATION <span className="arrow-right">→</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;

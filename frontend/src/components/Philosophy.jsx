import React from 'react';
import '../styles/Philosophy.css';

const Philosophy = () => {
    return (
        <section className="philosophy-section" id="philosophy">
            <div className="philosophy-illustration">
                {/* Placeholder for the tree illustration */}
                <div className="tree-graphic-placeholder">
                    {/* Will be styled later */}
                </div>
            </div>
            <div className="philosophy-content">
                <div className="philosophy-header">
                    <div className="header-line"></div>
                    <span className="header-label">CORE PHILOSOPHY</span>
                </div>
                <h2 className="philosophy-title">
                    GROWING<br />
                    <span className="title-outline">ROOTS.</span>
                </h2>
                <blockquote className="philosophy-quote">
                    "Like any living system, financial stability requires time and the right structure."
                </blockquote>
                <p className="philosophy-description">
                    We aren't just building an app; we're fostering a community that values transparency, education, and mutual success. MoneyTree is the scaffolding for your leap into adulthood.
                </p>
                <a href="#whitepaper" className="whitepaper-link">
                    READ THE WHITEPAPER <span className="link-line"></span>
                </a>
            </div>
        </section>
    );
};

export default Philosophy;

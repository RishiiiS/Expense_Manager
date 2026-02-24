import React from 'react';
import '../styles/Hero.css';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <p className="hero-subtitle">
                    <span className="subtitle-line"></span>
                    COLLECTIVE / STUDENT INITIATIVE 2024
                </p>
                <div className="title-wrapper">
                    <div className="title-bg">BUILT</div>
                    <h1 className="hero-title">
                        BUDGETS<br />
                        <span className="title-italic">for</span><br />
                        <span className="title-highlight">Students.</span>
                    </h1>
                </div>
                <p className="hero-description">
                    MoneyTree is a radical experiment in financial transparency, designed by students who were tired of banking apps built for their parents.
                </p>
                <div className="hero-actions">
                    <button className="join-btn">JOIN THE PROJECT</button>
                    <a href="#manifesto" className="manifesto-link">
                        <span className="arrow-down">↓</span> THE MANIFESTO
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

import React from 'react';
import '../styles/Features.css';

const featuresData = [
    {
        number: '01',
        title: 'STUDENT FIRST',
        description: "Built for the 'ramen-diet' reality. We prioritize daily spend tracking over complex investment portfolios."
    },
    {
        number: '02',
        title: 'ZERO COMPLEXITY',
        description: 'No finance degree required. Just clear, actionable insights on where your money actually goes.'
    },
    {
        number: '03',
        title: 'OPEN SOURCE',
        description: "Our code is public. If it's missing a feature you need, you can help us build it for everyone."
    }
];

const Features = () => {
    return (
        <section className="features-section" id="features">
            <div className="features-grid">
                {featuresData.map((feature, index) => (
                    <div className="feature-card" key={index}>
                        <div className="feature-header">
                            <h3 className="feature-title">{feature.title}</h3>
                            <span className="feature-number">{feature.number}</span>
                        </div>
                        <p className="feature-description">{feature.description}</p>
                        <div className="feature-line"></div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Features;

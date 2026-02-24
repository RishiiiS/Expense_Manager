import React from 'react';
import '../styles/Purpose.css';

const Purpose = () => {
    return (
        <section className="purpose-section" id="about">
            <div className="purpose-content">
                <h2 className="purpose-title">
                    PURPOSE<br />
                    <span className="title-italic">Infrastructure.</span>
                </h2>
                <div className="purpose-text">
                    <p>
                        Traditional banking apps weren't made for the complexity of student life. We're rebuilding the foundations to handle irregular income and shared futures.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Purpose;

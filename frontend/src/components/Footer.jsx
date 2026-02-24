import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <h2 className="footer-logo">MoneyTree</h2>
                    <p className="footer-description">
                        A student-built initiative for financial empowerment. Open source under the MIT License. Built for the future, by the future.
                    </p>
                </div>
                <div className="footer-links">
                    <div className="footer-col">
                        <h4 className="footer-col-title">RESOURCES</h4>
                        <ul>
                            <li><a href="#code">The Code</a></li>
                            <li><a href="#mission">The Mission</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-col">
                        <h4 className="footer-col-title">COMMUNITY</h4>
                        <ul>
                            <li><a href="#discord">Discord</a></li>
                            <li><a href="#twitter">Twitter</a></li>
                            <li><a href="#github">GitHub</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <div className="footer-copyright">
                    © 2023 MONEYTREE PROJECT. OPEN SOURCE MIT LICENSE.
                </div>
                <div className="footer-legal">
                    <a href="#privacy">PRIVACY POLICY</a>
                    <a href="#terms">TERMS</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

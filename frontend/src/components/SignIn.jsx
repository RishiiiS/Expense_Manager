import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', backgroundColor: 'var(--bg-color)', color: 'var(--text-main)' }}>
            <h1 style={{ fontSize: '3rem', marginBottom: '2rem' }}>Sign In / Register</h1>
            <p style={{ color: 'var(--text-muted)' }}>This is the sign in/registration page placeholder.</p>
            <Link to="/" style={{ color: 'var(--accent-red)', marginTop: '2rem', textDecoration: 'underline' }}>Back to Home</Link>
        </div>
    );
};

export default SignIn;

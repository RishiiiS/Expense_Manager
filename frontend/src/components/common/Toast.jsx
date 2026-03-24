import React, { useState, useEffect } from 'react';
import './Toast.css';

const Toast = () => {
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        const handleApiError = (event) => {
            const message = event.detail || 'An unknown error occurred';
            const id = Date.now();
            setToasts(prev => [...prev, { id, message }]);

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000); // clear after 3s
        };

        const handleApiSuccess = (event) => {
            const message = event.detail || 'Success!';
            const id = Date.now();
            setToasts(prev => [...prev, { id, message, type: 'success' }]);

            setTimeout(() => {
                setToasts(prev => prev.filter(t => t.id !== id));
            }, 3000);
        };

        window.addEventListener('api_error', handleApiError);
        window.addEventListener('api_success', handleApiSuccess);

        return () => {
            window.removeEventListener('api_error', handleApiError);
            window.removeEventListener('api_success', handleApiSuccess);
        };
    }, []);

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast-message ${toast.type === 'success' ? 'toast-success' : 'toast-error'}`}>
                    {toast.message}
                </div>
            ))}
        </div>
    );
};

export default Toast;

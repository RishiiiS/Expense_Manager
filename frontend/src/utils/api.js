const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api/v1';
const TIMEOUT_MS = 30000; // 30 seconds

export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errMessage = data.message || data.error || 'Something went wrong';
      window.dispatchEvent(new CustomEvent('api_error', { detail: errMessage }));
      throw new Error(errMessage);
    }

    return data;
  } catch (error) {
    if (error.name === 'AbortError') {
      const msg = 'Request timed out. The server may be waking up — please try again in a moment.';
      window.dispatchEvent(new CustomEvent('api_error', { detail: msg }));
      throw new Error(msg);
    }
    console.error(`API Error on ${endpoint}:`, error.message);
    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
};

// Set this to your local or hosted URL if you want to bypass the proxy.
// Examples: 'http://127.0.0.1:8000' or 'https://api.infobee.sasalemsuperservice.com'
// Leave as an empty string '' to use Vercel/Vite automatic proxying.
const BACKEND_URL = 'http://127.0.0.1:8000';

export const BASE_URL = BACKEND_URL;
export const API_URL = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

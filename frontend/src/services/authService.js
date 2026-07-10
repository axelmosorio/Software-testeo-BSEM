const API_URL = 'https://software-testeo-bsem-1.onrender.com';

export const servicioLogin = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};

export const servicioRegistro = async (email, username, password) => {
    const response = await fetch(`${API_URL}/registrar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password }),
    });
    const data = await response.json();
    return { ok: response.ok, data };
};
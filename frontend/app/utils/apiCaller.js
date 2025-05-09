const serverEndPoint = process.env.SERVER_ENDPOINT || 'http://localhost:5000';

const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
};
const defaultMethod = 'GET';
const defaultBody = null;

const callAPI = async (url, method = defaultMethod, body = defaultBody, headers = defaultHeaders) => {
    const options = {
        method: method,
        headers: {
            ...defaultHeaders,
            ...headers,
        },

        credentials: 'include',
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(`${serverEndPoint}${url}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call error:', error);
        throw error;
    }
}

export default callAPI;
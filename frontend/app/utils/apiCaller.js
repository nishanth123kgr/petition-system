import { showErrorToast } from "./toastUtils";

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

        const data = await response.json();

        if (!response.ok) {
            // Instead of throwing error, show toast and return error response
            const errorMessage = data.message || `Request failed with status ${response.status}`;
            
            // Use our new toast utility function that works outside React components
            showErrorToast("Request Failed", errorMessage);
            
            return {
                success: false,
                message: errorMessage,
                status: response.status,
                data: data
            };
        }

        return {
            success: true,
            ...(Array.isArray(data) ? { data } : { ...data }),
        };
    } catch (error) {
        console.error('API call error:', error);
        
        // Show toast notification for network/other errors using our utility
        showErrorToast(
            "Connection Error", 
            error.message || "Unable to connect to server. Please check your connection."
        );
        
        // Return error response instead of throwing
        return {
            success: false,
            message: error.message || "Network error",
            error: error
        };
    }
};

export default callAPI;
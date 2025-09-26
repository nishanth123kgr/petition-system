import { showErrorToast } from "./toastUtils";

// Updated to allow using either an environment variable, localhost,
// or dynamically determine the server address based on the current hostname
const getServerEndpoint = () => {
    console.log("Environment Variable SERVER_ENDPOINT:", process.env.NEXT_PUBLIC_SERVER_ENDPOINT);

    if (process.env.NEXT_PUBLIC_SERVER_ENDPOINT) return process.env.NEXT_PUBLIC_SERVER_ENDPOINT;

    // If we're in a browser environment
    if (typeof window !== 'undefined') {
        // Get the current hostname (IP or domain name)
        const hostname = window.location.hostname;
        // If we're accessing from a device on the network (not localhost)
        // use that same hostname with the backend port
        if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
            return `http://${hostname}:5000`;
        }
    }
    
    // Default fallback to localhost
    return 'http://localhost:5000';
};

const serverEndPoint = getServerEndpoint();

console.log("Using server endpoint:", serverEndPoint);


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
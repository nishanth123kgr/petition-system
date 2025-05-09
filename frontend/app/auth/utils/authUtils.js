import srpClient from 'secure-remote-password/client'
import callAPI from '../../utils/apiCaller';

export async function registerUser(userData) {
    try {

        const salt = srpClient.generateSalt();
        const privateKey = srpClient.derivePrivateKey(salt, userData.email, userData.password);
        const verifier = srpClient.deriveVerifier(privateKey);

        // Prepare the user data to be sent to the server
        const userPayload = {
            name: userData.name,
            email: userData.email,
            salt: salt,
            verifier: verifier
        };

        const response = await callAPI('/api/auth/register', 'POST', userPayload);

        if (!response.success) {
            throw new Error('Failed to register user');
        }

        return response;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }

}

export async function loginUser(email, password) {
    try {
        const clientEphemeral = srpClient.generateEphemeral();

        const initResponse = await callAPI('/api/auth/srp/init', 'POST', { email, clientPublic: clientEphemeral.public });

        if (!initResponse.success) {
            return { success: false, message: 'Failed to initialize login' };
        }

        const { salt, serverPublic } = initResponse.data;

        console.log("User salt:", salt, "Server Public:", serverPublic)


        const privateKey = srpClient.derivePrivateKey(salt, email, password);
        const clientSession = srpClient.deriveSession(clientEphemeral.secret, serverPublic.public, salt, email, privateKey);

        console.log('Client session:', clientSession);

        let verifyResponse = await callAPI('/api/auth/srp/verify', 'POST', {
                email,
                clientPublic: clientEphemeral.public,
                clientProof: clientSession.proof
            });
        

        if (!verifyResponse.success) {
            console.error('Server verification failed:', verifyResponse);
            return { success: false, message: 'Failed to verify server response' };
        }

        const { serverProof } = verifyResponse.data;

        // Validate server proof
        try {
            srpClient.verifySession(clientEphemeral.public, clientSession, serverProof);
        } catch (error) {
            console.error('Server proof validation error:', error);
            return { success: false, message: 'Failed to verify server proof' };
        }

        console.log('Login successful:', { email, clientSession });

        verifyResponse.success = true;
        return verifyResponse;
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, message: 'Login failed', error: error.message };
    }
}
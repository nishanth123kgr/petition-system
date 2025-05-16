import { generateToken, setTokenCookie, verifyToken } from '../utils/jwt/jwtUtils.js';
import srpServer from 'secure-remote-password/server.js';
import supabaseClient from '../middleware/supabase.middleware.js';
import { getUserByEmail, createUser, getDepartmentIdFromAdminId } from './user.controller.js';
import { getDepartmentNameFromId } from './department/utils/department.read.utils.js';

// Auth Controller
export const register = async (req, res) => {

    if (!req.body.name || !req.body.email || !req.body.salt || !req.body.verifier) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const { name, email, salt, verifier } = req.body;
    try {
        console.log('Registering user:', { name, email, salt, verifier });
        const data = await createUser({ name, email, salt, verifier });

        res.status(201).json({ message: 'User registered successfully', user: data, success: true });
    } catch (error) {
        console.log(error)
        res.status(400).json({ error: error.message });
    }
};

export const srpInit = async (req, res) => {
    const { email } = req.body;
    try {
        const data = await getUserByEmail(email);

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }        

        const salt = data.salt;
        const verifier = data.verifier;
        const serverPublic = srpServer.generateEphemeral(verifier);

        const token = generateToken({
            
            email,
            salt,
            verifier,
            serverSecret: serverPublic.secret,
            serverPublic: serverPublic.public
        }, { expiresIn: '1h' });


        setTokenCookie(res, token);

        res.json({ data: { salt, serverPublic }, success: true });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const srpVerify = async (req, res) => {
    const { email, clientPublic, clientProof } = req.body;
    try {        
        // Validate clientProof is present
        if (!clientProof) {
            return res.status(400).json({ error: 'Client proof is required' });
        }

        const data = await getUserByEmail(email);

        if (!data) {
            return res.status(404).json({ error: 'User not found' });
        }

        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({ error: 'Authentication token missing' });
        }

        // Verify the token and extract the necessary information
        let tokenData;
        try {
            tokenData = verifyToken(token);
            if (tokenData.email !== email) {
                return res.status(401).json({ error: 'Invalid authentication session' });
            }
            if (!tokenData.serverSecret || !tokenData.serverPublic) {
                return res.status(400).json({ error: 'Incomplete session data' });
            }
        } catch (err) {
            console.log(err)
            return res.status(401).json({ error: 'Invalid or expired token' });
        }

        
        // Make serverEphemeral available for verification
        const serverEphemeral = {
            secret: tokenData.serverSecret,
            public: tokenData.serverPublic
        };

        const salt = data.salt;
        const verifier = data.verifier;
    
        
        const serverSession = srpServer.deriveSession(serverEphemeral.secret, clientPublic, salt, email, verifier, clientProof);
        const serverProof = serverSession.proof;

        if (!serverProof) {
            return res.status(401).json({ error: 'Invalid proof' });
        }

        let departmentId = null;
        if(data.role === 2) {
            departmentId = await getDepartmentIdFromAdminId(data.id);
        }


        const authToken = generateToken({
            id: data.id,
            name: data.name,
            email,
            role: data.role,
            departmentId,
        }, { expiresIn: '1h' });

        setTokenCookie(res, authToken);

        res.json({ data: { serverProof }, role: data.role});
    } catch (error) {
        console.log(error);
        
        res.status(400).json({ error: error.message });
    }
};


export const logout = (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out successfully' });
};

export const getCurrentUser = async (req, res) => {
    try {
        // Check if user is authenticated
        if (!req.user) {
            return res.status(401).json({ error: 'Not authenticated' });
        }
        
        // Get user details from database using email from token
        const userData = await getUserByEmail(req.user.email);
        
        if (!userData) {
            return res.json({ error: 'User not found' });
        }

        
        // Set user details in request object, excluding sensitive information
        req.user = {
            name: userData.name,
            email: userData.email,
            role: userData.role,
            departmentName: req.user.departmentId ? await getDepartmentNameFromId(req.user.departmentId) : null,
            // Add other non-sensitive fields as needed
        };
        res.json({ user: req.user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
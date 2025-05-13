import { verifyToken } from '../utils/jwt/jwtUtils.js';

/**
 * JWT Authentication Middleware
 * Verifies the JWT token from request headers or cookies
 * Adds the decoded user information to the request object
 */
export const authenticateJWT = (req, res, next) => {
    // Get token from Authorization header or cookies
    const authHeader = req.headers.authorization;
    const tokenFromHeader = authHeader && authHeader.split(' ')[1];
    const tokenFromCookie = req.cookies && req.cookies.jwt;
    const token = tokenFromHeader || tokenFromCookie;

    if (!token) {
        return res.json({ message: 'Access denied. No token provided.' });
    }



    try {
        // Verify the token
        const decoded = verifyToken(token);
        req.user = decoded;
    }
    catch (error) {
        return res.status(403).json({ message: 'Invalid token. Try Logging in' });
    }
    
    next();
};

/**
 * Role-based Authorization Middleware
 * Verifies if the authenticated user has the required role
 * @param {string|string[]} roles - Required role(s)
 */
export const authorizeRole = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userRole = req.user.role;
        
        // Check if user role is in the allowed roles
        if (typeof roles === 'string' && userRole === roles) {
            return next();
        }
        
        if (Array.isArray(roles) && roles.includes(userRole)) {
            return next();
        }
        
        res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    };
};
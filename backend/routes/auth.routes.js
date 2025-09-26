import { Router } from 'express';
import { register, srpInit, srpVerify, logout, getCurrentUser } from '../controllers/auth.controller.js';
import { authenticateJWT } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/register', register);
router.post('/srp/init', srpInit);
router.post('/srp/verify', srpVerify);
router.get('/logout', logout);
router.get('/me', authenticateJWT, getCurrentUser);

export default router;
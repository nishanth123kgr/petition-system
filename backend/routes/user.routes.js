import { Router } from 'express';
import { getUsers, getUserById, updateUser, deleteUser, changePassword } from '../controllers/user.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateJWT, authorizeRole([3]), getUsers);
router.get('/:userId', authenticateJWT, getUserById);
router.put('/:userId', authenticateJWT, updateUser);
router.delete('/:userId', authenticateJWT, authorizeRole([3]), deleteUser);

router.post('/change-password', authenticateJWT, changePassword);

export default router;
import { Router } from 'express';
import { getPetitionById, createPetition, updatePetition, deletePetition, getPetitions } from '../controllers/petition/petition.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateJWT, getPetitions);
router.get('/:petitionId', authenticateJWT, getPetitionById);
router.post('/', authenticateJWT, createPetition);
router.put('/:petitionId', authenticateJWT, updatePetition);
router.delete('/:petitionId', authenticateJWT, deletePetition);

export default router;
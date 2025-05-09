import { Router } from 'express';
import { getAllPetitions, getPetitionById, createPetition, updatePetition, deletePetition } from '../controllers/petition.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

// Petition routes
router.get('/', authenticateJWT, getAllPetitions);
router.get('/:petitionId', authenticateJWT, getPetitionById);
router.post('/', authenticateJWT, createPetition);
router.put('/:petitionId', authenticateJWT, updatePetition);
router.delete('/:petitionId', authenticateJWT, deletePetition);

export default router;
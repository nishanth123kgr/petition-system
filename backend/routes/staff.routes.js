import { Router } from 'express';
import { 
  getAllStaff, 
  getStaffById, 
  createStaff, 
  updateStaff,
  getAssignedPetitions,
  assignPetition,
  processPetition
} from '../controllers/staff.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateJWT, authorizeRole([2, 3]), getAllStaff);
router.get('/:staffId', authenticateJWT, getStaffById);
router.post('/', authenticateJWT, authorizeRole([2, 3]), createStaff);
router.put('/:staffId', authenticateJWT, authorizeRole([2, 3]), updateStaff);

router.get('/:staffId/petitions', authenticateJWT, getAssignedPetitions);
router.post('/:staffId/petitions/assign', authenticateJWT, authorizeRole([2]), assignPetition);
router.put('/petitions/:petitionId/process', authenticateJWT, authorizeRole([2]), processPetition);

export default router;
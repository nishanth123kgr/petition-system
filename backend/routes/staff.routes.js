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

// Staff routes
router.get('/', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), getAllStaff);
router.get('/:staffId', authenticateJWT, getStaffById);
router.post('/', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), createStaff);
router.put('/:staffId', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), updateStaff);

// Staff petition management routes
router.get('/:staffId/petitions', authenticateJWT, getAssignedPetitions);
router.post('/:staffId/petitions/assign', authenticateJWT, authorizeRole(['department-admin']), assignPetition);
router.put('/petitions/:petitionId/process', authenticateJWT, authorizeRole(['staff']), processPetition);

export default router;
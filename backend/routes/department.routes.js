import { Router } from 'express';
import { 
  getAllDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment,
  getDepartmentStaff,
  addStaffToDepartment,
  getDepartmentPetitions 
} from '../controllers/department/department.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', authenticateJWT, getAllDepartments);
router.get('/:departmentId', authenticateJWT, getDepartmentById);
router.post('/', authenticateJWT, authorizeRole([3]), createDepartment);
router.put('/:departmentId', authenticateJWT, authorizeRole([3, 2]), updateDepartment);

router.get('/:departmentId/staff', authenticateJWT, authorizeRole([3, 2]), getDepartmentStaff);
router.post('/:departmentId/staff', authenticateJWT, authorizeRole([3, 2]), addStaffToDepartment);

router.get('/:departmentId/petitions', authenticateJWT, authorizeRole([3, 2, 1]), getDepartmentPetitions);

export default router;
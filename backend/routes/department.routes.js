import { Router } from 'express';
import { 
  getAllDepartments, 
  getDepartmentById, 
  createDepartment, 
  updateDepartment,
  getDepartmentStaff,
  addStaffToDepartment,
  getDepartmentPetitions 
} from '../controllers/department.controller.js';
import { authenticateJWT, authorizeRole } from '../middleware/auth.middleware.js';

const router = Router();

// Department routes
router.get('/', authenticateJWT, getAllDepartments);
router.get('/:departmentId', authenticateJWT, getDepartmentById);
router.post('/', authenticateJWT, authorizeRole(['super-admin']), createDepartment);
router.put('/:departmentId', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), updateDepartment);

// Department staff routes
router.get('/:departmentId/staff', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), getDepartmentStaff);
router.post('/:departmentId/staff', authenticateJWT, authorizeRole(['super-admin', 'department-admin']), addStaffToDepartment);

// Department petitions routes
router.get('/:departmentId/petitions', authenticateJWT, authorizeRole(['super-admin', 'department-admin', 'staff']), getDepartmentPetitions);

export default router;
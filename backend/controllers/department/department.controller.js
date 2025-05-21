import supabaseClient from "../../middleware/supabase.middleware.js";
// Department Controller
export const getAllDepartments = async (req, res) => {
  try {
    const { data, error } = await supabaseClient
      .from('departments')
      .select('*, staffCount:staffs(count), petitionCount:petitions(count), admin:users!departments_admin_id_fkey(id, name, email)');
    
    if (error) throw error;

    // Transform the data to convert count objects to integers
    const transformedData = data.map(dept => ({
      ...dept,
      staffCount: dept.staffCount[0]?.count || 0,
      petitionCount: dept.petitionCount[0]?.count || 0,
      adminName: dept.admin.name,
      adminEmail: dept.admin.email,
    }));

    res.json(transformedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentById = async (req, res) => {
  const { departmentId } = req.params;
  try {
    // Logic to get department by ID
    res.json({ department: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createDepartment = async (req, res) => {
  try {
    // Logic to create department
    res.status(201).json({ message: 'Department created successfully', department: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateDepartment = async (req, res) => {
  const { departmentId } = req.params;
  try {
    // Logic to update department
    res.json({ message: 'Department updated successfully', department: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentStaff = async (req, res) => {
  const { departmentId } = req.params;
  try {
    // Logic to get all staff in a department
    res.json({ staff: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addStaffToDepartment = async (req, res) => {
  const { departmentId } = req.params;
  const { staffId } = req.body;
  try {
    // Logic to add staff to department
    res.json({ message: 'Staff added to department successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentPetitions = async (req, res) => {
  const { departmentId } = req.params;
  try {
    // Logic to get petitions for a department
    res.json({ petitions: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
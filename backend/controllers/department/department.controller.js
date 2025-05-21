import supabaseClient from "../../middleware/supabase.middleware.js";
import srpClient from 'secure-remote-password/client.js';
import crypto from 'crypto';
import { sendMail } from '../../utils/mailer/index.js';

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
  const { name, adminName, adminEmail } = req.body;
  
  try {
    // Validate required fields
    if (!name || !adminName || !adminEmail) {
      return res.status(400).json({ 
        error: "Department name, admin name, and admin email are required" 
      });
    }

    // Check if admin email already exists
    const { data: existingUser, error: checkError } = await supabaseClient
      .from('users')
      .select('id')
      .eq('email', adminEmail)
      .single();

    if (existingUser) {
      return res.status(400).json({ 
        error: "An account with this email already exists" 
      });
    }

    // Generate a temporary password for the admin
    const tempPassword = crypto.randomUUID().substring(0, 8);

    // Set up SRP authentication
    const salt = srpClient.generateSalt();
    const privateKey = srpClient.derivePrivateKey(salt, adminEmail, tempPassword);
    const verifier = srpClient.deriveVerifier(privateKey);

    // Create admin user in the database
    const { data: adminData, error: adminError } = await supabaseClient
      .from('users')
      .insert([{
        name: adminName,
        email: adminEmail,
        salt,
        verifier,
        role: 2, // Role for department admin
      }])
      .select();

    if (adminError) {
      console.error('Error creating admin user:', adminError);
      return res.status(500).json({ 
        error: adminError.message || "Failed to create admin user" 
      });
    }

    const admin_id = adminData[0].id;

    // Create the department with the new admin
    const { data: deptData, error: deptError } = await supabaseClient
      .from('departments')
      .insert([
        { 
          name, 
          admin_id,
          created_at: new Date().toISOString()
        }
      ])
      .select();

    if (deptError) {
      console.error('Error creating department:', deptError);
      
      // Attempt to rollback admin creation if department creation fails
      await supabaseClient
        .from('users')
        .delete()
        .eq('id', admin_id);
        
      return res.status(500).json({ 
        error: deptError.message || "Failed to create department" 
      });
    }

    // Send email notification to the admin
    try {
      await sendMail(adminEmail, { departmentName: name, password: tempPassword }, "adminCreation");
    } catch (emailError) {
      console.error('Error sending email to admin:', emailError);
      // We don't fail the request if email sending fails, but log it
    }

    res.status(201).json({ 
      success: true,
      message: 'Department and admin created successfully', 
      department: deptData[0]
    });
  } catch (error) {
    console.error('Error in department creation process:', error);
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
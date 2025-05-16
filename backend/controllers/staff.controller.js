import srpClient from 'secure-remote-password/client.js';
import supabaseClient from '../middleware/supabase.middleware.js';
import { sendMail } from '../utils/mailer/index.js';
import { getDepartmentNameFromId } from './department/utils/department.read.utils.js';
import crypto from 'crypto';

// Staff Controller
export const getAllStaff = async (req, res) => {
  const { departmentId } = req.user;
  try {
    let rawData;;
    if (departmentId) {
      const { data, error } = await supabaseClient
          .from('staffs')
          .select(`
            staff_id,
            users ( name, email ),
            departments ( name ),
            petitions:petitions!assigned_to (
              status
            )
          `)
          .eq('department_id', departmentId);

      if (error) throw error;
      rawData = data;
    } else {
      const { data, error } = await supabaseClient
        .from('staffs')
        .select(`
          staff_id,
          users ( name, email ),
          departments ( name ),
          petitions:petitions!assigned_to (
            status
          )
        `)
      if (error) throw error;
      rawData = data;
    }
    const data = rawData.map((staff) => {
      return {
        id: staff.staff_id,
        name: staff.users.name,
        email: staff.users.email,
        department: staff.departments.name,
        assignedCount: staff.petitions.length,
        inProgressCount: staff.petitions.filter(petition => petition.status === 'In Progress').length,
        completedCount: staff.petitions.filter(petition => petition.status === 'Completed').length,
      };
    });
    return res.json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStaffById = async (req, res) => {
  const { staffId } = req.params;
  try {
    // Logic to get staff by ID
    res.json({ staff: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createStaff = async (req, res) => {
  const { name, email } = req.body;
  let { departmentId } = req.user;
  if (!name || !email || !departmentId) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    const tempPassword = crypto.randomUUID().substring(0, 8);

    const salt = srpClient.generateSalt();
    const privateKey = srpClient.derivePrivateKey(salt, email, tempPassword);
    const verifier = srpClient.deriveVerifier(privateKey);

    // Prepare the user data to be sent to the server
    const userPayload = {
      name,
      email,
      salt,
      verifier,
      role: 1, // Assuming 1 is the role for staff
    };

    const { data, error } = await supabaseClient
      .from('users')
      .insert(userPayload)
      .select();
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }
    const staffId = data[0].id;
    const { error: staffCreationError } = await supabaseClient
      .from('staffs')
      .insert({ staff_id: staffId, department_id: departmentId });


    if (staffCreationError) {
      console.log(staffCreationError);
      return res.status(500).json({ error: staffCreationError.message });
    }

    const departmentName = await getDepartmentNameFromId(departmentId);


    await sendMail(email, { departmentName, password: tempPassword }, "staffCreation");

    res.status(201).json({ message: 'Staff created successfully', staff: { id: staffId } });







  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateStaff = async (req, res) => {
  const { staffId } = req.params;
  try {
    // Logic to update staff
    res.json({ message: 'Staff updated successfully', staff: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAssignedPetitions = async (req, res) => {
  const { staffId } = req.params;
  try {
    // Logic to get petitions assigned to staff
    res.json({ petitions: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const assignPetition = async (req, res) => {
  const { staffId } = req.params;
  const { petitionId } = req.body;

  if (!staffId || !petitionId) {
    return res.status(400).json({ error: 'Missing required fields: staffId and petitionId are required' });
  }

  try {
    // Verify staff belongs to the department
    const { departmentId } = req.user;
    
    // First check if staff member exists and belongs to the department
    const { data: staffData, error: staffError } = await supabaseClient
      .from('staffs')
      .select('*')
      .eq('staff_id', staffId)
      .eq('department_id', departmentId)
      .single();
    
    if (staffError || !staffData) {
      return res.status(403).json({ error: 'Staff member not found in your department' });
    }

    // Next check if petition exists and belongs to the department
    const { data: petitionData, error: petitionError } = await supabaseClient
      .from('petitions')
      .select('*')
      .eq('id', petitionId)
      .eq('department_id', departmentId)
      .single();
    
    if (petitionError || !petitionData) {
      return res.status(403).json({ error: 'Petition not found in your department' });
    }

    // Update the petition with the assigned staff member
    const { data: updateData, error: updateError } = await supabaseClient
      .from('petitions')
      .update({ 
        assigned_to: staffId,
        assigned_date: new Date().toISOString()
      })
      .eq('id', petitionId)
      .select();
    
    if (updateError) {
      console.error('Error assigning petition:', updateError);
      return res.status(500).json({ error: updateError.message });
    }

    // Get staff name for the response
    const { data: userData, error: userError } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', staffId)
      .single();
    
    if (userError) {
      console.error('Error getting user name:', userError);
    }

    const staffName = userData?.name || 'Staff member';

    await sendMail(userData.email, updateData[0], "petitionAssignedStaff");
    
    res.status(200).json({ 
      success: true, 
      message: `Petition assigned to ${staffName} successfully`,
      petition: updateData[0]
    });
  } catch (error) {
    console.error('Error in assignPetition:', error);
    res.status(500).json({ error: error.message });
  }
};

export const processPetition = async (req, res) => {
  const { petitionId } = req.params;
  const { status, comments } = req.body;
  try {
    // Logic to process/update petition status
    res.json({ message: 'Petition processed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
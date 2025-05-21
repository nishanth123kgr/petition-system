import supabaseClient from '../middleware/supabase.middleware.js';

// User Controller
export const getUsers = async (req, res) => {
  try {
    // Enhanced query to get users with department information
    const { data: users, error: userError } = await supabaseClient.from('users').select('*');
    if (userError) throw userError;
    
    // Get department information for each user based on their role
    const usersWithDepts = await Promise.all(users.map(async (user) => {
      let departmentName = null;
      
      // For department admins
      if (user.role === 2) { // Assuming role 2 is department admin
        const { data: deptData, error: deptError } = await supabaseClient
          .from('departments')
          .select('name')
          .eq('admin_id', user.id)
          .single();
          
        if (!deptError && deptData) {
          departmentName = deptData.name;
        }
      }
      
      // For staff members
      if (user.role === 1) { // Assuming role 1 is staff
        const { data: staffData, error: staffError } = await supabaseClient
          .from('staffs')
          .select('department_id')
          .eq('staff_id', user.id)
          .single();
          
        if (!staffError && staffData) {
          const { data: deptData, error: deptError } = await supabaseClient
            .from('departments')
            .select('name')
            .eq('id', staffData.department_id)
            .single();
            
          if (!deptError && deptData) {
            departmentName = deptData.name;
          }
        }
      }
      
      return {
        ...user,
        department_name: departmentName
      };
    }));
    
    res.json(usersWithDepts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (userId) => {
  try {
    
    const { data, error } = await supabaseClient.from('users').select('*').eq('id', userId).single();
    if (error) throw error;
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    // Logic to get user by email
    console.log('Getting user by email:', email);

    const { data, error } = await supabaseClient.from('users').select('*').eq('email', email).single();
    if (error) return null;
    if (!data) {
      console.log('User not found');
      return null;
    }
    return data;


  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const createUser = async (userData) => {
  try {
    console.log('Creating User:', userData);
    const { data, error } = await supabaseClient.from('users').insert(userData);
    if (error) throw error;
    return data;

  } catch (error) {
    console.log(error);
    
    throw new Error(error.message);
  }
}

export const updateUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Logic to update user
    res.json({ message: 'User updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Logic to delete user
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getDepartmentIdFromAdminId = async (adminId) => {
  try {
    const { data, error } = await supabaseClient.from('departments').select('id').eq('admin_id', adminId).single();
    if (error) throw error;
    return data.id;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

export const getDepartmentIdFromStaffId = async (staffId) => {
  try {
    const { data, error } = await supabaseClient.from('staffs').select('department_id').eq('staff_id', staffId).single();
    if (error) throw error;
    return data.department_id;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
}

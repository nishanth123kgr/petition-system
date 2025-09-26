import supabaseClient from '../middleware/supabase.middleware.js';
import srpClient from 'secure-remote-password/client.js';
import srpServer from 'secure-remote-password/server.js';

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
    if (error) {
      console.log(error);
      
      throw new Error(JSON.toString(error));
    }
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
  const { name } = req.body;
  
  try {
    // Validate inputs
    if (!name) {
      return res.status(400).json({ 
        success: false, 
        message: 'Name is required' 
      });
    }
    
    // Verify the authenticated user is changing their own profile
    if (req.user.id !== parseInt(userId)) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only update your own profile' 
      });
    }
    
    // Update user name
    const { data, error } = await supabaseClient
      .from('users')
      .update({ name })
      .eq('id', userId)
      .select();
    
    if (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to update user profile' 
      });
    }
    
    return res.status(200).json({ 
      success: true, 
      message: 'Profile updated successfully',
      user: data[0]
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
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

export const changePassword = async (req, res) => {
  try {
    const { email, currentPassword, newVerifier } = req.body;
    
    if (!email || !currentPassword || !newVerifier) {
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields' 
      });
    }
    
    // Verify the authenticated user is changing their own password
    if (req.user.email !== email) {
      return res.status(403).json({ 
        success: false, 
        message: 'You can only change your own password' 
      });
    }
    
    // Get user data from database
    const userData = await getUserByEmail(email);
    
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }
    
    // Verify current password using SRP protocol
    try {
      const salt = userData.salt;
      const storedVerifier = userData.verifier;
      
      // Derive private key and verify using SRP protocol
      const testPrivateKey = srpClient.derivePrivateKey(salt, email, currentPassword);
      const testVerifier = srpClient.deriveVerifier(testPrivateKey);
      
      // Compare verifiers - this is a simplified verification
      // In production, you would use a full SRP verification handshake
      if (testVerifier !== storedVerifier) {
        return res.status(401).json({ 
          success: false, 
          message: 'Current password is incorrect' 
        });
      }
      
      // If verification is successful, update to new password
      const { data, error } = await supabaseClient
        .from('users')
        .update({ verifier: newVerifier })
        .eq('email', email);
      
      if (error) {
        console.error('Error updating password:', error);
        return res.status(500).json({ 
          success: false, 
          message: 'Failed to update password' 
        });
      }
      
      return res.status(200).json({ 
        success: true, 
        message: 'Password changed successfully' 
      });
    } catch (error) {
      console.error('Password verification error:', error);
      return res.status(500).json({ 
        success: false, 
        message: 'Failed to verify current password',
        error: error.message 
      });
    }
    
  } catch (error) {
    console.error('Password change error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while changing the password',
      error: error.message 
    });
  }
};

import supabaseClient from '../middleware/supabase.middleware.js'

// User Controller
export const getUsers = async (req, res) => {
  try {
    // Logic to get all users
    const { data, error } = await supabaseClient.client.from('users').select('*');
    if (error) throw error;
    res.json({ users: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserById = async (req, res) => {
  const { userId } = req.params;
  try {
    // Logic to get user by ID
    res.json({ user: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserByEmail = async (email) => {
  try {
    // Logic to get user by email
    console.log('Getting user by email:', email);

    const { data, error } = await supabaseClient.from('users').select('*').eq('email', email).single();
    if (error) throw error;
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
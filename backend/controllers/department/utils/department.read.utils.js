import supabaseClient from '../../../middleware/supabase.middleware.js';

export const getDepartmentNames = async () => {
  try {
    
    const { data, error } = await supabaseClient
      .from('departments')
      .select('id, name');    

    if (error) throw error;

    return data;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};
import supabaseClient from '../../../middleware/supabase.middleware.js';


export const getPetitionsForSuperAdmin = async () => {
    try {
        const { data, error } = await supabaseClient
            .from('petitions')
            .select('*');

        if (error) throw error;

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}


export const getPetitionsForUser = async (userId) => {
    try {
        const { data, error } = await supabaseClient
            .from('petitions')
            .select(`
                *,
                departments (
                name
                )
            `)
            .eq('submitted_by', userId);

        if (error) throw error;

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}


export const getPetitionsForDepartment = async (departmentId) => {
    try {
        const { data, error } = await supabaseClient
            .from('petitions')
            .select(`
                *,
                assigned_to:users!assigned_to (
                name
                ),
                submitted_by:users!submitted_by (
                name
                )
            `)
            .eq('department_id', departmentId);

        if (error) throw error;

        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
}

export const getPetitionsForStaff = async (staffId) => {
    try {
        const { data, error } = await supabaseClient
            .from('petitions')
            .select('*')
            .eq('assigned_to', staffId);

        if (error) throw error;

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
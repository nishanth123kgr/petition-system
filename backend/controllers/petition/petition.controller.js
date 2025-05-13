import supabaseClient from '../../middleware/supabase.middleware.js';
import { getPetitionsForDepartment, getPetitionsForStaff, getPetitionsForSuperAdmin, getPetitionsForUser } from './utils/petition.read.utils.js';
import { getDepartmentNames } from '../department/utils/department.read.utils.js';
import { classifyPetition } from './utils/petition.create.utils.js';


export const createPetition = async (req, res) => {
  try {
    let { title, description, departmentName, location } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    let departments = await getDepartmentNames();
    let departmentId;
    let petitionSeverity;;

    // If department name is not provided, classify the petition
    if (!departmentName) {
      let departmentNames = departments.map(department => department.name);

      // Classify both department and severity
      const classification = await classifyPetition(`${title} ${description}`, departmentNames, true);


      departmentName = classification.department;
      petitionSeverity = classification.severity;

    } else {
      // Classify only severity
      petitionSeverity = await classifyPetition(`${title} ${description}`, []);
    }

    departmentId = departments.find(department => department.name === departmentName)?.id;
    if (!departmentId) {
      return res.status(400).json({ error: 'Invalid department name' });
    }

    const { id } = req.user;

    const { data, error } = await supabaseClient
      .from('petitions')
      .insert([
        {
          title,
          description,
          department_id: departmentId,
          submitted_by: id,
          location,
          severity: petitionSeverity
        }
      ]);
    if (error) {
      console.log(error);
      return res.status(500).json({ error: error.message });
    }


    // Logic to create new petition with severity
    res.status(201).json({
      message: 'Petition created successfully',
      petition: {
        // Include severity in the response
        severity: petitionSeverity
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const updatePetition = async (req, res) => {
  const { petitionId } = req.params;
  try {
    // Logic to update petition
    res.json({ message: 'Petition updated successfully', petition: {} });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletePetition = async (req, res) => {
  const { petitionId } = req.params;
  try {
    // Logic to delete petition
    res.json({ message: 'Petition deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPetitions = async (req, res) => {
  console.log(req.user);
  
  const { id, role, departmentId } = req.user;

  if (!id) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {

    let petitions;
    switch (role) {
      case 0:
        petitions = await getPetitionsForUser(id);
        break
      case 1:
        petitions = await getPetitionsForStaff(id);
        break;
      case 2:
        petitions = await getPetitionsForDepartment(departmentId);
        break;
      case 3:
        petitions = await getPetitionsForSuperAdmin();
        break;
      default:
        return res.status(403).json({ error: 'Forbidden' });
    }
    const formattedData = petitions.map(petition => {
      const { departments, ...rest } = petition;
      return {
        ...rest,
        department: departments?.name || null
      };
    });
    res.json(formattedData);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

export const getPetitionById = async (req, res) => {
  const { petitionId } = req.params;
  try {
    const { data, error } = await supabaseClient
      .from('petitions')
      .select('*')
      .eq('id', petitionId)
      .single();

    if (error) throw error;

    res.json({ petition: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

import { spawn } from 'child_process';
import { getDepartmentNames } from '../../department/utils/department.read.utils.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Create __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const classifyDepartment = async (text, departmentNames) => {

    let input = {
        categories : departmentNames,
        query: text
    }
    const inputJson = JSON.stringify(input);
    const inputBase64 = Buffer.from(inputJson).toString('base64');

  return new Promise((resolve, reject) => {
    const python = spawn('python3', [path.join(__dirname, 'classifier.py'), inputBase64]);

    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    let error = '';
    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('error', (err) => {
      reject(`Python process error: ${err}`);
    });


    python.on('close', (code) => {
      if (code !== 0) {
        reject(`Python process exited with code ${code}: ${error}`);
      } else {
        const parsedResult = JSON.parse(result);
        if(!parsedResult.success)
        {
            reject(`Python process error: ${parsedResult.error}`);
        }
        console.log('Python process result:', parsedResult);
        
        const predictedDepartment = parsedResult.result.label;
        resolve(predictedDepartment);
      }
    });
  });
}

export const classifyPetition = async (text, departmentNames, isDepartmentNeeded=false) => {
    let input = {
        categories : departmentNames,
        query: text,
        need_department: isDepartmentNeeded
    }
    const inputJson = JSON.stringify(input);
    const inputBase64 = Buffer.from(inputJson).toString('base64');

  return new Promise((resolve, reject) => {
    const python = spawn('python3', [path.join(__dirname, 'classifier.py'), inputBase64]);

    let result = '';
    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    let error = '';
    python.stderr.on('data', (data) => {
      error += data.toString();
    });

    python.on('error', (err) => {
      reject(`Python process error: ${err}`);
    });

    python.on('close', (code) => {
      if (code !== 0) {
        reject(`Python process exited with code ${code}: ${error}`);
      } else {
        const parsedResult = JSON.parse(result);
        if(!parsedResult.success)
        {
            reject(`Python process error: ${parsedResult.error}`);
        }
        console.log('Python process result:', parsedResult);
        
        // Return both department and severity classifications
        resolve(isDepartmentNeeded ? {
          department: parsedResult.result.label,
          severity: parsedResult.result.severity
        } : parsedResult.result.severity);
      }
    });
  });
}



import { commonApi } from "./commonApi"






export const registerApi = async (body) => {
  return await commonApi('POST', '/api/register', body, '');
};
export const loginApi = async (body) => {
    return await commonApi('POST', '/api/login', body, '');
  };


 
  export const updateApi = async (body) => {
    return await commonApi('PUT', '/api/update-user', body, ''); // Add a slash before 'api/update-user'
};
// In allApi.js or any appropriate file for API services

export const deleteApi = async (token) => {
    try {
      const response = await fetch('https://interview-plus.onrender.com/api/delete-user', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token // Pass the token if required
        }
      });
  
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to delete user. Status: ${response.status}`);
      }
  
      // Return the response
      return response;
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  };
  



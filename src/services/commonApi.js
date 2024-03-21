import { BASE_URL } from "./basUrl";

export const commonApi = async (method, endpoint, body, token) => {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: JSON.stringify(body),
    };
  
    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('Failed to fetch data from API');
    }
  };
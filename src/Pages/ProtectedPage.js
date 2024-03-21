import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProtectedPage = () => {
  const [protectedData, setProtectedData] = useState(null);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token'); // Get token from local storage

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await axios.get('https://interview-plus.onrender.com/api/protected', {
          headers: {
            'x-access-token': token,
          },
        });
        setProtectedData(response.data);
        setError(null);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
        setProtectedData(null);
      }
    };

    fetchProtectedData();
  }, [token]);

  return (
    <div className="container mx-auto mt-8">
      {error && <div className="text-red-500">{error}</div>}
      {protectedData && (
        <div>
          <h1 className="text-3xl font-bold">Protected Data</h1>
          <pre>{JSON.stringify(protectedData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;

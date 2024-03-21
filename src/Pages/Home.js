import React, { useState, useEffect } from 'react';
import { updateApi, deleteApi } from '../services/allApi'; // Importing the updateApi and deleteApi functions

const Home = () => {
  const [users, setUsers] = useState([]);
  const [items, setItems] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample duplicate data for users and items
  const loggedInUser = {
    name: localStorage.getItem('userName'),
    email: localStorage.getItem('userEmail')
  };

  const sampleUsers = [
    { id: 1, name: loggedInUser.name, email: loggedInUser.email }
    // Add more sample users if needed
  ];

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('https://interview-plus.onrender.com/api/items');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching items:', error.message);
        // Handle error, e.g., display an error message to the user
      }
    };
    fetchItems();
  }, []);

  const updateUser = async () => {
    try {
      // Call the updateApi function with the updated name and email
      const updatedUser = await updateApi({ name, email });
      console.log('Update user successful:', updatedUser);
      // Close the modal after updating
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const deleteUser = async () => {
    try {
      // Call the deleteApi function to delete the user
      const response = await deleteApi();
      if (response.status === 200) {
        // If the deletion is successful, update the user list
        // Here you may need to implement logic to update the user list based on your application's requirements
        console.log('User deleted successfully');
      } else {
        throw new Error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle error, e.g., display an error message to the user
    }
  };

  const openModal = (user) => {
    setSelectedUser(user);
    setName(user.name);
    setEmail(user.email);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="grid grid-cols-3 gap-4">
        {sampleUsers.map((user) => (
          <div key={user.id} className="border p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold">{user.name}</h2>
            <p className="text-gray-600">{user.email}</p>
            <div className="mt-4 space-x-2">
              <button onClick={() => openModal(user)} className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">Update</button>
              <button onClick={deleteUser} className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md">Delete</button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Update User</h3>
                    <div className="mt-2">
                      <div className="flex flex-col">
                        <label htmlFor="name" className="text-sm font-medium text-gray-700">Name</label>
                        <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                      </div>
                      <div className="flex flex-col mt-4">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                        <input type="email" name="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 p-2 border border-gray-300 rounded-md" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button onClick={updateUser} className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm">Update</button>
                <button onClick={closeModal} className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-3xl font-bold mb-4">Items</h1>
      <div className="grid grid-cols-3 gap-4">
        {items.map((item) => (
          <div key={item.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <img className="w-full " style={{height:'300px'}} src={item.image} alt={item.title} />
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.title}</div>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="text-gray-900 font-bold text-xl">${item.price}</span>
              <span className="text-gray-600 ml-2">{item.category}</span>
            </div>
            <div className="px-6 pb-4">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {item.rating.rate} ({item.rating.count} reviews)
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
</div>
  );
};

export default Home;

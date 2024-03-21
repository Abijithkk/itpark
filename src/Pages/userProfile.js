import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

const UserProfile = ({ userName }) => {
  return (
    <div className="flex items-center">
      <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center mr-4">
       
        {userName ? (
          <FontAwesomeIcon icon={faUser} className="text-gray-600 text-lg" />
        ) : (
          <span className="text-gray-600 font-bold text-lg">U</span>
        )}
      </div>
      <span className="text-gray-800 text-lg font-semibold">{userName || 'User'}</span>
    </div>
  );
};

export default UserProfile;

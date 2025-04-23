import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/profile/${userId}`)
      .then(res => {
        setUser(res.data);
      })
      .catch(err => {
        console.error('Error fetching profile:', err);
      });
  }, [userId]);

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">User Profile</h2>
        {user ? (
          <div className="profile-details">
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Password:</strong> {user.password}</p>
          </div>
        ) : (
          <p className="loading">Loading user info...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;

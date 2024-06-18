import React, { useState } from 'react';

const ChangePassword = ({ onChangePassword }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      onChangePassword({ currentPassword, newPassword });
    } else {
      window.alert('New passwords do not match');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="currentPassword">Current Password:</label>
      <input
        id="currentPassword"
        type="password"
        placeholder="Enter current password"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />

      <label htmlFor="newPassword">New Password:</label>
      <input
        id="newPassword"
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />

      <label htmlFor="confirmPassword">Confirm New Password:</label>
      <input
        id="confirmPassword"
        type="password"
        placeholder="Confirm new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button type="submit">Change Password</button>
    </form>
  );
};

export default ChangePassword;

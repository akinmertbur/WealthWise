import React, { useState } from "react";
import UserProfile from "../../components/UserProfile/UserProfile";

const ProfilePage = ({ user }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  // Success handler
  const handleSuccess = (message) => {
    setSuccessMessage(message);
    setErrorMessage(null);
  };

  // Error handler
  const handleError = (message) => {
    setErrorMessage(message);
    setSuccessMessage(null);
  };

  return (
    <div className="profile-page">
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      <UserProfile
        user={user}
        onSuccess={handleSuccess}
        onError={handleError}
      />
    </div>
  );
};

export default ProfilePage;

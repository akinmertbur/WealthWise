// src/components/UserProfile/UserProfile.jsx
import React, { useState } from "react";
import EditUserButton from "../EditUserButton";
import EditProfileBtn from "../EditProfileBtn";
import EditProfileInput from "../EditProfileInput";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = function ({ user, onSuccess, onError }) {
  const navigate = useNavigate(); // Get the navigate function
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [isEditEmail, setIsEditEmail] = useState(false);
  const [email, setEmail] = useState(user.email);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      onError("Password must be at least 8 characters long");
    } else {
      onSuccess("");
    }
  };

  const handleEditPassword = async (userId, password) => {
    try {
      const response = await fetch("/api/auth/editPassword", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
        setIsEditPassword(false);
      } else if (response.status === 400) {
        onError("Bad request: Password validation is failed!"); // Specific handling for 400 status
      } else {
        onError(data.message); // Handling for other errors
      }
    } catch (err) {
      onError("An error occurred while editing the password.");
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEditUsername = async (userId, username) => {
    try {
      const response = await fetch("/api/auth/editUsername", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, username }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
        setIsEditUsername(false);
      } else if (response.status === 400) {
        onError("Bad request: Username validation is failed!"); // Specific handling for 400 status
      } else {
        onError(data.message); // Handling for other errors
      }
    } catch (err) {
      onError("An error occurred while editing the username.");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEditEmail = async (userId, email) => {
    try {
      const response = await fetch("/api/auth/editEmail", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, email }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
        setIsEditEmail(false);
      } else if (response.status === 400) {
        onError("Bad request: Email validation is failed!"); // Specific handling for 400 status
      } else {
        onError(data.message); // Handling for other errors
      }
    } catch (err) {
      onError("An error occurred while editing the email.");
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch("/api/auth/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });

      const data = await response.json();

      if (response.ok) {
        onSuccess(data.message);
        navigate("/login"); // Navigate to a different route on success
      } else {
        onError(data.message);
      }
    } catch (err) {
      onError("An error occurred while deleting the user.");
    }
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>

      <table className="user-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Password</th>
            <th>Delete Account</th>
          </tr>
        </thead>
        <tbody>
          <tr key={user.id}>
            <td>
              {!isEditUsername ? (
                <>
                  {username}
                  <EditProfileBtn onEdit={setIsEditUsername} />
                </>
              ) : (
                <>
                  <EditProfileInput
                    id="username"
                    type="text"
                    value={username}
                    placeholder="Enter Username"
                    onChange={handleUsernameChange}
                  />
                  <EditUserButton
                    userId={user.id}
                    data={username}
                    onEdit={handleEditUsername}
                    disabled={username.length < 1}
                  />
                </>
              )}
            </td>
            <td>
              {!isEditEmail ? (
                <>
                  {email}
                  <EditProfileBtn onEdit={setIsEditEmail} />
                </>
              ) : (
                <>
                  <EditProfileInput
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Enter Email"
                    onChange={handleEmailChange}
                  />
                  <EditUserButton
                    userId={user.id}
                    data={email}
                    onEdit={handleEditEmail}
                    disabled={username.length < 1}
                  />
                </>
              )}
            </td>
            <td>
              {!isEditPassword ? (
                <>
                  {"*****"}
                  <EditProfileBtn onEdit={setIsEditPassword} />
                </>
              ) : (
                <>
                  <EditProfileInput
                    id="pwd"
                    type="password"
                    value={password}
                    placeholder="Enter Password"
                    onChange={handlePasswordChange}
                  />
                  <EditUserButton
                    userId={user.id}
                    data={password}
                    onEdit={handleEditPassword}
                    disabled={password.length < 8}
                  />
                </>
              )}
            </td>
            <td>
              <button
                onClick={() => handleDelete(user.id)}
                className="edit-button"
              >
                Delete Account
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;

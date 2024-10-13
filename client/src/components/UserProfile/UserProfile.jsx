// src/components/UserProfile/UserProfile.jsx
import React, { useState } from "react";
import EditableField from "../EditableField";
import DeleteUserButton from "../DeleteUserButton";
import "./UserProfile.css";
import { useNavigate } from "react-router-dom";

const UserProfile = function ({ user, onSuccess, onError }) {
  const navigate = useNavigate();
  const [isEditPassword, setIsEditPassword] = useState(false);
  const [isEditUsername, setIsEditUsername] = useState(false);
  const [isEditEmail, setIsEditEmail] = useState(false);

  const [password, setPassword] = useState("");
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleFieldChange =
    (setter, validationFn, successMsg, errorMsg) => (e) => {
      const value = e.target.value;
      setter(value);
      if (!validationFn(value)) {
        onError(errorMsg);
      } else {
        onSuccess(successMsg);
      }
    };

  const handleEditField = async (field, value, endpoint, setIsEdit) => {
    try {
      const response = await fetch(`/api/auth/${endpoint}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, [field]: value }),
      });
      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        setIsEdit(false);
      } else if (response.status === 400) {
        onError(`Bad request: ${field} validation failed!`);
      } else {
        onError(data.message);
      }
    } catch (err) {
      onError(`An error occurred while editing the ${field}.`);
    }
  };

  const handleDelete = async (userId) => {
    try {
      const response = await fetch("/api/auth/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await response.json();
      if (response.ok) {
        onSuccess(data.message);
        navigate("/login");
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
            <EditableField
              label="Username"
              value={username}
              isEdit={isEditUsername}
              onEdit={() => setIsEditUsername(true)}
              onSave={() =>
                handleEditField(
                  "username",
                  username,
                  "editUsername",
                  setIsEditUsername
                )
              }
              onChange={handleFieldChange(
                setUsername,
                (val) => val.length > 0,
                "",
                "Username is required"
              )}
              inputType="text"
              userId={user.id}
              validation={(val) => val.length > 0}
            />
            <EditableField
              label="Email"
              value={email}
              isEdit={isEditEmail}
              onEdit={() => setIsEditEmail(true)}
              onSave={() =>
                handleEditField("email", email, "editEmail", setIsEditEmail)
              }
              onChange={handleFieldChange(
                setEmail,
                (val) => val.includes("@"),
                "",
                "Invalid email address"
              )}
              inputType="email"
              userId={user.id}
              validation={(val) => val.includes("@")}
            />
            <EditableField
              label="Password"
              value={password}
              isEdit={isEditPassword}
              onEdit={() => setIsEditPassword(true)}
              onSave={() =>
                handleEditField(
                  "password",
                  password,
                  "editPassword",
                  setIsEditPassword
                )
              }
              onChange={handleFieldChange(
                setPassword,
                (val) => val.length >= 8,
                "",
                "Password must be at least 8 characters long"
              )}
              inputType="password"
              userId={user.id}
              validation={(val) => val.length >= 8}
            />
            <td>
              <DeleteUserButton userId={user.id} onDelete={handleDelete} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;

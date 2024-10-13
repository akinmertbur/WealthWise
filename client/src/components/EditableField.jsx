// src/components/EditableField.jsx
import React from "react";
import EditUserButton from "./EditUserButton";
import EditProfileBtn from "./EditProfileBtn";
import EditProfileInput from "./EditProfileInput";

const EditableField = ({
  label,
  value,
  isEdit,
  onEdit,
  onSave,
  onChange,
  inputType,
  userId,
  validation,
}) => {
  return (
    <td>
      {!isEdit ? (
        <>
          {label === "Password" ? "*****" : value}
          <EditProfileBtn onEdit={onEdit} />
        </>
      ) : (
        <>
          <EditProfileInput
            id={label.toLowerCase()}
            type={inputType}
            value={value}
            placeholder={`Enter ${label}`}
            onChange={onChange}
          />
          <EditUserButton
            userId={userId}
            data={value}
            onEdit={onSave}
            disabled={!validation(value)}
          />
        </>
      )}
    </td>
  );
};

export default EditableField;

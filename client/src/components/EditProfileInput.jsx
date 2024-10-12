// src/components/EditProfileInput.jsx

const EditProfileInput = function ({ id, type, value, placeholder, onChange }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required
    />
  );
};

export default EditProfileInput;

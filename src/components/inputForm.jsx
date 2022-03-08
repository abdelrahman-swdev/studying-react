import React from "react";

const InputForm = (props) => {
  const { name, label, value, onChange, error, type } = props;
  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        className="form-control"
        id={name}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default InputForm;

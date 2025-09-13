import React from "react";

const InputField = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  readOnly = false,
  inputClassName = "",
}) => {
  return (
    <div className="flex flex-col mb-6 w-full">
      {label && (
        <label className="text-gray-200 text-sm font-semibold mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`
          w-full
          h-12
          px-4
          rounded-xl
          bg-gray-900             /* dark input background */
          text-gray-200           /* input text color */
          placeholder-gray-500    /* softer placeholder */
          outline-none
           border-gray-700  /* subtle border */
          text-sm font-medium
          focus:border-green-400  /* green accent on focus */
          focus:ring-1 focus:ring-green-400
          hover:border-green-400  /* green accent on hover */
          transition-colors
          ${inputClassName}
        `}
      />
    </div>
  );
};

export default InputField;

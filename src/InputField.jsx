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
    <div className="flex flex-col mb-4 w-full">
      {label && (
        <label className="text-black text-sm font-semibold mb-1">{label}</label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        className={`w-full h-10 px-3 rounded-xl bg-[#424242] text-white placeholder-gray-400 outline-none border border-gray-400 text-sm font-medium hover:bg-[#525252] hover:border-gray-500 transition-colors ${inputClassName}`}
      />
    </div>
  );
};

export default InputField;

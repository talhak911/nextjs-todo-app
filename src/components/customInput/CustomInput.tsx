import { CustomInputProps } from "@/types/types";
import React from "react";

const CustomInput: React.FC<CustomInputProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  theme,
}) => (
  <div className="w-full">
    {label && (
      <label
        htmlFor={name}
        className={`block mb-1  font-medium ml-2 text-${theme}Primary`}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      name={name}
      id={name}
      className={` border-${theme}Accent font-medium placeholder:opacity-100 bg-transparent border-4 text-${theme}Primary placeholder-${theme}Primary rounded-full  w-full px-2 py-1.5`}
      placeholder={`Enter your ${label?.toLowerCase() || name}`}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CustomInput;

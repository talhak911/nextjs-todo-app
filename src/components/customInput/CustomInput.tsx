// components/CustomInput.tsx
import { CustomInputProps } from '@/types/types';
import React from 'react';



const CustomInput: React.FC<CustomInputProps> = ({ label, name, type, value, onChange ,theme}) => (
  <div>
    {label && <label htmlFor={name} className="block mb-2 text-sm font-medium  ">
      {label}
    </label>}
    <input

      type={type}
      name={name}
      id={name}
      className={` border-${theme}Accent font-medium placeholder:opacity-100 placeholder:font-semibold bg-transparent border-4 text-${theme}Primary  rounded-full  w-full p-2.5`}
      placeholder={`Enter your ${label?.toLowerCase() || name}`}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CustomInput;

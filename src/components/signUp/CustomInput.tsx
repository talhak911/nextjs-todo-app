// components/CustomInput.tsx
import { CustomInputProps } from '@/types/types';
import React from 'react';



const CustomInput: React.FC<CustomInputProps> = ({ label, name, type, value, onChange }) => (
  <div>
    <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900">
      {label}
    </label>
    <input
      type={type}
      name={name}
      id={name}
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-full focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
      placeholder={`Enter your ${label.toLowerCase()}`}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CustomInput;

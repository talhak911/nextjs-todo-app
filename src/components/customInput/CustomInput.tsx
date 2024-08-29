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
  <div className="w-full ">
    {label && (
      <label
        htmlFor={name}
        className={`block mb-1  xl:mb-[16px] xl:text-[30px] ml-2 text-${theme}Primary`}
      >
        {label}
      </label>
    )}
    <input
      type={type}
      name={name}
      id={name}
      className={`xl:h-[58px] xl:text-[30px] xl:border-[5px] border-${theme}Accent font-medium placeholder:opacity-100 bg-transparent border-4 text-${theme}Primary placeholder-${theme}Primary rounded-full  w-full xl:pl-[32px] px-2 py-1.5 xl:pt-[8px] xl:pb-[11px] xl:pr-[39px]`}
      placeholder={`${label || name}`}
      value={value}
      onChange={onChange}
      required
    />
  </div>
);

export default CustomInput;

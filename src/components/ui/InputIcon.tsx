"use client";

import { ReactNode, useState, InputHTMLAttributes } from "react";
import { Eye, EyeClosed } from "lucide-react";

interface InputIconProps extends InputHTMLAttributes<HTMLInputElement> {
  iconLeft: ReactNode;
  showToggle?: boolean;
}

export default function InputIcon({
  type = "text",
  placeholder = "",
  iconLeft,
  showToggle = false,
  className,
  ...rest
}: InputIconProps) {
  console.log(className)
   
  const [showPassword, setShowPassword] = useState(false);

  const inputType = showToggle ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex items-center bg-white text-gray-500 px-4 py-3 rounded-full w-full">
      <span className="mr-3">{iconLeft}</span>
      <input
        type={inputType}
        placeholder={placeholder}
        className={"bg-transparent w-full outline-none placeholder:text-gray-400 text-sm" + className}
        {...rest}
      />
      {showToggle && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="ml-3 focus:outline-none"
        >
          {showPassword ? <Eye /> : <EyeClosed />}
        </button>
      )}
    </div>
  );
}

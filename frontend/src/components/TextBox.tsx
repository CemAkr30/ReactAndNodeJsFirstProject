import { Field } from "formik";
import React from "react";

interface TextBoxProps {
  name: string;
  label?: string;
  type: string;
  className?: string;
  error?: any;
  labelClass?: string;
}

function TextBox({
  name,
  label,
  type,
  className,
  error,
  labelClass,
}: TextBoxProps) {
  return (
    <>
      <div>
        <label
          htmlFor={name}
          className={`${labelClass} block text-sm font-medium leading-6 text-black"`}
        >
          {label}
        </label>
        <div className="mt-2">
          <Field
            id={name}
            name={name}
            type={type}
            autoComplete={name}
            required
            className={`block w-full rounded-md border-0 bg-black/5 py-1.5 text-black shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 ${className}`}
          />
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-500" id="email-description">
          {error}
        </p>
      )}
    </>
  );
}

export default TextBox;

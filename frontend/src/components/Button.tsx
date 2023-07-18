import React, { ReactNode, useEffect, useState } from "react";
import Spinner from "./Spinner";

interface TextBoxProps {
  type: any;
  value: string | ReactNode;
  className?: string;
  onClick?: any;
  variant: "indigo" | "green" | "blue";
}

function TextBox({ type, value, className, onClick, variant }: TextBoxProps) {
  return (
    <>
      <button
        type={type}
        onClick={onClick}
        className={`flex w-full justify-center rounded-md bg-${variant}-500 px-3 py-1.5 text-sm font-semibold leading-6 text-black shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 ${className}`}
      >
        {value}
      </button>
    </>
  );
}

export default TextBox;

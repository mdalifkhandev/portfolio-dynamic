"use client";

import { useFormStatus } from "react-dom";

interface SubmitButtonProps {
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

export function SubmitButton({ children, className, loadingText = "Loading..." }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      disabled={pending} 
      className={`${className} ${pending ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {pending ? loadingText : children}
    </button>
  );
}

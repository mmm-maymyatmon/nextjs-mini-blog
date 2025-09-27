"use client";
import { useFormStatus } from "react-dom";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "danger";
  children?: React.ReactNode
};

function Button({ label, onClick, className, children, variant = "primary" }: ButtonProps) {
  const { pending } = useFormStatus();

  const baseClasses = "px-4 py-2 rounded-md transition disabled:opacity-50";
  const variants = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100",
    danger: "border-1 border-red-500 text-red-500 hover:bg-red-600 hover:text-white",
  }
  return (
    <>
      <button
        type="submit"
        onClick={onClick}
        className={`${baseClasses} ${variants[variant]} ${className ?? ""}`}
        disabled={pending}
      >
        {children}
        {label}
      </button>
    </>
  );
}

export default Button;

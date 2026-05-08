import type { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary";
  disabled?: boolean;
  onClick: () => void;
};

const baseStyles =
  "px-5 py-2.5 rounded-lg font-medium text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 cursor-pointer";

const variants = {
  primary: "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20",
  secondary: "text-slate-400 hover:text-slate-200 hover:bg-slate-800",
};

export const Button = ({ children, variant = "primary", disabled = false, onClick }: ButtonProps) => {
  return (
    <button className={`${baseStyles} ${variants[variant]}`} disabled={disabled} onClick={onClick} type="button">
      {children}
    </button>
  );
};

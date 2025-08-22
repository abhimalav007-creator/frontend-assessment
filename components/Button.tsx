import { ReactNode } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function Button({ children, className="", ...props }: ButtonProps){
  return (
    <button
      className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors duration-200 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

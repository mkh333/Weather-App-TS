import type {ReactNode} from "react";

type ButtonType = "primary" | "secondary"
type ButtonSize = "small" | "medium";

type ButtonProps = {
    type: ButtonType;
    size: ButtonSize;
    onClick?: () => void;
    children: ReactNode;
    className?: string;
    disabled?: boolean;
}

const Button = ({ type, size, onClick, children }: ButtonProps) => {
    const baseStyles = 'px-4 py-2 rounded focus:outline-none transition duration-300 cursor-pointer m-2';

    const typeStyles: Record<ButtonType, string> = {
        primary: 'bg-orange-500 text-white hover:bg-orange-700',
        secondary: 'bg-white border border-orange-500 text-orange-500 hover:bg-gray-100',
    };

    const sizeStyles: Record<ButtonSize, string>  = {
        small: 'text-sm',
        medium: 'text-base',
    };

    return (
        <button className={`${baseStyles} ${typeStyles[type]} ${sizeStyles[size]}`} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

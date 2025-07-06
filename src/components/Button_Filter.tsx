import React from "react";

interface ButtonFilterProps {
    title: string;
    width?: number | string;
    height?: number | string;
    selected?: boolean;
    onClick?: () => void;
}

const Button_Filter: React.FC<ButtonFilterProps> = ({
    title,
    width = '100%',
    height = 48,
    selected = false,
    onClick,
}) => {
    return (
        <button
            type="button"
            className={`rounded-xl font-bold border-2 transition-colors duration-200 focus:outline-none w-full mb-4
                ${selected ? "bg-black text-white border-black" : "bg-white text-black border-black"}`}
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                background: selected ? '#000' : '#fff',
                borderColor: '#000',
                color: selected ? '#fff' : '#000',
            }}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default Button_Filter;

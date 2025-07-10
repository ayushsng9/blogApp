import React from 'react';

function Button({
    children,
    type = 'button',
    bgColor = 'bg-blue-600', 
    textColor = 'text-white', 
    className = '', 
    ...props
}) {
    return (
        <button
            className={`${bgColor} ${textColor} ${className} px-4 py-2 rounded-lg duration-200`}
            type={type}
            {...props}
        >
            {children}
        </button>
    );
}

export default Button;
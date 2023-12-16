import React, { useState } from 'react';

const ClickableWithTooltip = ({ value, callback, text }) => {
    const [showText, setShowText] = useState(false);

    return (
        <div className="relative">
            <p
                className={`text-gray-500 font-bold text-4xl cursor-pointer ${showText ? 'line-through' : ''}`}
                onMouseEnter={() => setShowText(true)}
                onMouseLeave={() => setShowText(false)}
                onClick={callback}
            >
                {typeof value === "string" ? value.toUpperCase() : value}
            </p>
            <div
                className={`absolute text-lg text-white font-bold bg-blue-200 p-2 rounded-md ${
                    showText ? 'opacity-100' : 'opacity-0'
                } transition-opacity ease-in-out duration-300`}
            >
                {text}
            </div>
        </div>
    )
}

export default ClickableWithTooltip;

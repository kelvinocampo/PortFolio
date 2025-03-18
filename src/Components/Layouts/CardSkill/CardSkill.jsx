import React from 'react'

export const CardSkill = ({children, title, styles}) => {
    return (
        <div
            className={"relative bg-gradient-to-r rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105 "+styles}
        >
            <div className="absolute inset-0 transition-all duration-300"></div>
            <div className="relative p-6 text-white">
                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <ul className="list-disc list-inside">
                    {children}
                </ul>
            </div>
        </div>
    )
}

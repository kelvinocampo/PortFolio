import React from 'react'

export const CardSkill = ({ children, applyHover = true, title, styles, isGrid = false }) => {
    const className = `bg-gradient-to-r rounded-lg shadow-lg overflow-hidden ${applyHover ? "group transform transition-all duration-300 hover:scale-105 " : "p-6 "
        } ${styles}`;
    return (
        <div
            className={className}
        >
            {isGrid
                ?
                <>
                    <h3 className="text-2xl font-semibold mb-4 text-white">{title}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {children}
                    </div>
                </>
                :
                <div className="relative p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                    <ul className="list-disc list-inside">
                        {children}
                    </ul>
                </div>
            }

        </div>
    )
}

import React from 'react'

export const ItemNavbar = ({ route = "/", content = "Item Vacio" }) => {
    return (
        <li className='border-white border rounded-lg px-4 py-2 hover:bg-blue-500 transition'><a href={route}>{content}</a></li>
    )
}

import React from 'react'
import { ItemNavbar } from '../../Components/ItemNavbar/ItemNavbar.jsx'

export const Navbar = () => {
    return (
        <nav>
            <ul className='flex justify-center flex-wrap gap-4 '>
                <ItemNavbar content='Clase 1 - Intro'></ItemNavbar>
                <ItemNavbar route="/cursos" content='Clase 2 - ...'></ItemNavbar>
                <ItemNavbar route="/nosotros" content='Clase 3 - ...'></ItemNavbar>
                <ItemNavbar route="/contacto" content='Clase 4 - ...'></ItemNavbar>
            </ul>
        </nav>
    )
}

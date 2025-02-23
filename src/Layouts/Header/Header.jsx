import React, { useState } from 'react'
import { Navbar } from '../Navbar/Navbar.jsx'
import "./Header.css"

export const Header = () => {
    const [navbarVisible, setNavbarVisible] = useState(false)
    const handleTap = () => {
        setNavbarVisible(!navbarVisible);
    };

    return (
        <header
            className='flex bg-slate-800 flex-col gap-8 p-10 items-center text-white text-2xl w-screen'
            onMouseEnter={() => setNavbarVisible(true)} onMouseLeave={() => setNavbarVisible(false)} onClick={handleTap}
        >
            <h1><a href="/">Curso de React</a></h1>
            {navbarVisible && <Navbar />}
            {/* <Navbar></Navbar> */}
        </header>
    )
}

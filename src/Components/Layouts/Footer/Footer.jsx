import { FaLinkedin, FaGithub, FaArrowUp } from "react-icons/fa";
import { Navbar } from "@C/Layouts/NavBar/NavBar.jsx";
import { ItemNavBar } from '@C/UI/ItemNavBar/ItemNavBar.jsx';
import info from "@D/AboutMe.json"

export const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-gray-900 text-white py-8 flex justify-center items-center w-full ">
            <div className="container mx-auto px-4 w-full max-w-full">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 w-full max-w-full">
                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Contacto</h3>
                        <p className="text-gray-300">{info.contact.email} </p>
                        <p className="text-gray-300">Teléfono: +57 {info.contact.phoneNumber}</p>
                        <p className="text-gray-300">Ubicación: {info.country} </p>
                    </div>

                    <div className="overflow-x-hidden">
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Enlaces rápidos</h3>
                        <Navbar styles={{ ul: "space-y-2" }}>
                            <ItemNavBar url="/" styles="text-gray-300 hover:text-blue-400">Inicio</ItemNavBar>
                            <ItemNavBar url="/Skills" styles="text-gray-300 hover:text-blue-400">Habilidades</ItemNavBar>
                            <ItemNavBar url="/Experience" styles="text-gray-300 hover:text-blue-400">Experiencia</ItemNavBar>
                        </Navbar>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-blue-400">Redes sociales</h3>
                        <div className="flex space-x-4">
                            <a href={"https://linkedin.com/in/" + info.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                                <FaLinkedin size={24} />
                            </a>
                            <a href={"https://github.com/" + info.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-blue-400">
                                <FaGithub size={24} />
                            </a>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-700 mb-8" />

                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="mb-4 md:mb-0 text-gray-300">© 2025 Kevin Ocampo. Todos los derechos reservados.</p>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                    >
                        <span>Volver arriba</span>
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </footer>
    );
};
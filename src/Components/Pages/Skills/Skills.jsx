import info from "@D/AboutMe.json";

export const Skills = () => {
    return (
        <section className="flex h-full w-full items-center justify-center bg-white p-4">
            <div className="max-w-[1200px] w-full flex flex-col gap-12">
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center mb-8">
                    Habilidades
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div
                        className="relative bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0 transition-all duration-300"></div>
                        <div className="relative p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">Frontend</h3>
                            <ul className="list-disc list-inside">
                                {info.skills.frontend.map((skill, index) => (
                                    <li key={index} className="mb-2">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div
                        className="relative bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0 transition-all duration-300"></div>
                        <div className="relative p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">Backend</h3>
                            <ul className="list-disc list-inside">
                                {info.skills.backend.map((skill, index) => (
                                    <li key={index} className="mb-2">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div
                        className="relative bg-gradient-to-r from-orange-500 to-red-600 rounded-lg shadow-lg overflow-hidden group transform transition-all duration-300 hover:scale-105"
                    >
                        <div className="absolute inset-0"></div>
                        <div className="relative p-6 text-white">
                            <h3 className="text-2xl font-semibold mb-4">Herramientas</h3>
                            <ul className="list-disc list-inside">
                                {info.skills.tools.map((skill, index) => (
                                    <li key={index} className="mb-2">
                                        {skill}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 ">
                    <h3 className="text-2xl font-semibold mb-4 text-white">Habilidades Sociales</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {info.skills.socialSkills.map((skill, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2 bg-white p-3 rounded-lg"
                            >
                                <span className="text-lg">🌟</span>
                                <p className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">{skill}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-4">Nivel de Inglés</h3>
                    <p className="text-lg">{info.skills.englishLevel}</p>
                </div>
            </div>
        </section>
    );
};
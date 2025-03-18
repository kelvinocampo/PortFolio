import info from "@D/AboutMe.json";
import { CardSkill } from '@C/Layouts/CardSkill/CardSkill.jsx'

export const Skills = () => {
    return (
        <section className="flex h-full w-full items-center justify-center bg-white p-4">
            <div className="max-w-[1200px] w-full flex flex-col gap-12">
                <h2 className="text-3xl sm:text-4xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent text-center mb-8">
                    Habilidades
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <CardSkill title="Frontend" styles="from-blue-500 to-purple-600">
                        {info.skills.frontend.map((skill, index) => (
                            <li key={index} className="mb-2">
                                {skill}
                            </li>
                        ))}
                    </CardSkill>

                    <CardSkill title="Backend" styles="from-green-500 to-teal-600">
                        {info.skills.backend.map((skill, index) => (
                            <li key={index} className="mb-2">
                                {skill}
                            </li>
                        ))}
                    </CardSkill>

                    <CardSkill title="Herramientas" styles="from-orange-500 to-red-600">
                        {info.skills.tools.map((skill, index) => (
                            <li key={index} className="mb-2">
                                {skill}
                            </li>
                        ))}
                    </CardSkill>
                </div>

                <CardSkill title="Habilidades Sociales" applyHover={false} isGrid={true} styles="from-blue-500 to-purple-600">
                    {info.skills.socialSkills.map((skill, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-2 bg-white p-3 rounded-lg"
                        >
                            <span className="text-lg">🌟</span>
                            <p className="text-lg text-transparent bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text">{skill}</p>
                        </div>
                    ))}
                </CardSkill>

                <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
                    <h3 className="text-2xl font-semibold mb-4">Nivel de Inglés</h3>
                    <p className="text-lg">{info.skills.englishLevel}</p>
                </div>
            </div>
        </section>
    );
};
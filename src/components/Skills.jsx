// Skills.jsx
import { useState } from 'react';
import data from '@/data/data.json';

const skillsData = data.skills;

const categoryColors = {
  Frontend: "bg-blue-500/20 text-blue-300",
  Backend: "bg-green-500/20 text-green-300",
  Database: "bg-purple-500/20 text-purple-300",
  Styling: "bg-pink-500/20 text-pink-300",
  Testing: "bg-red-500/20 text-red-300",
  Tools: "bg-yellow-500/20 text-yellow-300",
  Design: "bg-orange-500/20 text-orange-300",
  Deployment: "bg-teal-500/20 text-teal-300",
  "Version Control": "bg-indigo-500/20 text-indigo-300",
  "Project Management": "bg-gray-500/20 text-gray-300"
};

const levelColors = {
  Básico: "border-yellow-500/50",
  Intermedio: "border-orange-500/50",
  Avanzado: "border-green-500/50"
};

export const Skills = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  return (
    <section
      id="skills"
      className="w-full bg-[#0A192F] text-gray-300 py-20 px-6 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full">
        {/* Encabezado mejorado */}
        <div className="text-center mb-16">
          <p className="text-[#64ffda] text-sm uppercase tracking-widest mb-2 font-mono">
            Mi Stack Tecnológico
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Habilidades & Tecnologías
          </h2>
          <div className="w-20 h-1 bg-[#64ffda] mx-auto rounded-full"></div>
        </div>

        {/* Grid de Skills mejorado */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {skillsData.map((skill, idx) => (
            <div
              key={skill.name}
              className={`
                group relative p-6 bg-[#112240] rounded-xl 
                hover:bg-[#1a365d] transform transition-all duration-300 
                hover:scale-105 hover:-translate-y-2 cursor-pointer
                border border-gray-700/50 hover:border-[#64ffda]/50
                ${skill.level ? levelColors[skill.level] : ''}
              `}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              {/* Efecto de brillo */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#64ffda]/0 via-[#64ffda]/5 to-[#64ffda]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              {/* Contenido */}
              <div className="relative z-10">
                {/* Categoría */}
                {skill.category && (
                  <span className={`
                    inline-block text-xs px-2 py-1 rounded-full mb-3
                    ${categoryColors[skill.category]}
                  `}>
                    {skill.category}
                  </span>
                )}

                {/* Nombre de la skill */}
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#64ffda] transition-colors">
                  {skill.name}
                </h3>

                {/* Nivel */}
                {skill.level && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">{skill.level}</span>
                    <div className="flex space-x-1">
                      {[1, 2, 3].map((dot) => (
                        <div
                          key={dot}
                          className={`
                            w-2 h-2 rounded-full transition-colors
                            ${dot <= (skill.level === 'Básico' ? 1 : skill.level === 'Intermedio' ? 2 : 3)
                              ? 'bg-[#64ffda]'
                              : 'bg-gray-600'
                            }
                          `}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Indicador de hover */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl"></div>
            </div>
          ))}
        </div>

        {/* Estadísticas adicionales */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-bold text-[#64ffda] mb-2">{skillsData.length}</h3>
            <p className="text-gray-300">Tecnologías dominadas</p>
          </div>
          <div className="p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-bold text-[#64ffda] mb-2">Full Stack</h3>
            <p className="text-gray-300">Desarrollo completo</p>
          </div>
          <div className="p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-2xl font-bold text-[#64ffda] mb-2">Moderno</h3>
            <p className="text-gray-300">Stack actualizado</p>
          </div>
        </div>
      </div>
    </section>
  );
};
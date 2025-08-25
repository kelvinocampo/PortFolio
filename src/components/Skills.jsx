// Skills.jsx
import { useState, useEffect } from "react";
import data from "@/data/data.json";

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
  "Project Management": "bg-gray-500/20 text-gray-300",
  JavaScript: "bg-amber-500/20 text-amber-300",
  Mobile: "bg-cyan-500/20 text-cyan-300",
  Cloud: "bg-violet-500/20 text-violet-300",
};

const levelColors = {
  Basico: "border-yellow-500/50",
  Intermedio: "border-orange-500/50",
  Avanzado: "border-green-500/50",
};

const getLevelNumber = (level) => {
  const levels = { Basico: 1, Intermedio: 2, Avanzado: 3 };
  return levels[level] || 0;
};

// Función para obtener todas las categorías de una skill
const getSkillCategories = (skill) => {
  // Si categories es un array, usarlo directamente
  if (Array.isArray(skill.categories)) {
    return skill.categories;
  }
  // Si category es un array (formato inconsistente), usarlo
  if (Array.isArray(skill.category)) {
    return skill.category;
  }
  // Si category es un string, convertirlo a array
  if (skill.category) {
    return [skill.category];
  }
  // Si no hay categorías, devolver array vacío
  return [];
};

// 🔹 Componente tarjeta individual
const SkillCard = ({ skill, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const levelNum = getLevelNumber(skill.level);
  const skillCategories = getSkillCategories(skill);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Delay escalonado basado en el índice

    return () => clearTimeout(timer);
  }, [index]);

  return (
    <div
      className={`
        group relative p-6 bg-[#112240] rounded-xl 
        hover:bg-[#1a365d] transform transition-all duration-500 
        hover:scale-105 hover:-translate-y-2 cursor-pointer
        border border-gray-700/50 hover:border-[#64ffda]/50
        ${skill.level ? levelColors[skill.level] || "" : ""}
        ${isVisible 
          ? 'opacity-100 translate-y-0 scale-100' 
          : 'opacity-0 translate-y-8 scale-95'
        }
      `}
      style={{
        transitionDelay: isVisible ? '0ms' : `${index * 100}ms`
      }}
    >
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#64ffda]/0 via-[#64ffda]/5 to-[#64ffda]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Contenido */}
      <div className="relative z-10">
        {/* Múltiples categorías como badges separados */}
        {skillCategories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {skillCategories.map((category, idx) => (
              <span
                key={idx}
                className={`
                  inline-block text-xs px-2 py-1 rounded-full
                  ${categoryColors[category] || "bg-gray-500/20 text-gray-300"}
                `}
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Nombre */}
        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#64ffda] transition-colors">
          {skill.name}
        </h3>

        {/* Descripción (opcional) */}
        {skill.description && (
          <p className="text-gray-400 text-sm mb-3 line-clamp-2">
            {skill.description}
          </p>
        )}

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
                    ${dot <= levelNum ? "bg-[#64ffda]" : "bg-gray-600"}
                  `}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Indicador hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#64ffda] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-xl" />
    </div>
  );
};

export const Skills = () => {
  const [selectedCategories, setSelectedCategories] = useState(["Todos"]);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const [areFiltersVisible, setAreFiltersVisible] = useState(false);
  const [showAllSkills, setShowAllSkills] = useState(false);

  useEffect(() => {
    // Animación del header
    const headerTimer = setTimeout(() => setIsHeaderVisible(true), 200);
    // Animación de los filtros
    const filtersTimer = setTimeout(() => setAreFiltersVisible(true), 600);

    return () => {
      clearTimeout(headerTimer);
      clearTimeout(filtersTimer);
    };
  }, []);

  // Obtener todas las categorías únicas de todas las skills
  const getAllCategories = () => {
    const categorySet = new Set();
    skillsData.forEach(skill => {
      const skillCategories = getSkillCategories(skill);
      skillCategories.forEach(category => categorySet.add(category));
    });
    return ["Todos", ...Array.from(categorySet).sort()];
  };

  const categories = getAllCategories();

  const toggleCategory = (category) => {
    if (category === "Todos") {
      // Si se selecciona "Todos", mostrar todas las categorías
      setSelectedCategories(["Todos"]);
    } else {
      setSelectedCategories(prevCategories => {
        // Remover "Todos" si está presente
        const withoutTodos = prevCategories.filter(cat => cat !== "Todos");
        
        if (prevCategories.includes(category)) {
          // Si ya está seleccionada, quitarla
          const newCategories = withoutTodos.filter(cat => cat !== category);
          // Si no queda ninguna categoría, volver a "Todos"
          return newCategories.length > 0 ? newCategories : ["Todos"];
        } else {
          // Si no está seleccionada, agregarla
          return [...withoutTodos, category];
        }
      });
    }
  };

  const isCategorySelected = (category) => {
    return selectedCategories.includes(category);
  };

  // Ordenar skills por nivel de dominio
  const sortSkillsByLevel = (skills) => {
    const levelOrder = { Avanzado: 3, Intermedio: 2, Basico: 1 };
    return skills.sort((a, b) => {
      const levelA = levelOrder[a.level] || 0;
      const levelB = levelOrder[b.level] || 0;
      return levelB - levelA; // Orden descendente
    });
  };

  // Filtrar skills basado en las categorías seleccionadas
  const getFilteredSkills = () => {
    let filtered = selectedCategories.includes("Todos")
      ? skillsData
      : skillsData.filter((skill) => {
          const skillCategories = getSkillCategories(skill);
          return skillCategories.some(category => selectedCategories.includes(category));
        });
    
    return sortSkillsByLevel([...filtered]);
  };

  const allFilteredSkills = getFilteredSkills();
  const displayedSkills = showAllSkills ? allFilteredSkills : allFilteredSkills.slice(0, 10);
  const hasMoreSkills = allFilteredSkills.length > 10;

  // Contar skills por categoría (para mostrar en los botones)
  const getSkillCountByCategory = (category) => {
    if (category === "Todos") return skillsData.length;
    return skillsData.filter(skill => 
      getSkillCategories(skill).includes(category)
    ).length;
  };

  // Contar skills por nivel
  const skillsByLevel = allFilteredSkills.reduce((acc, skill) => {
    if (skill.level) {
      acc[skill.level] = (acc[skill.level] || 0) + 1;
    }
    return acc;
  }, {});

  // Resetear "ver todas" cuando cambian los filtros
  useEffect(() => {
    setShowAllSkills(false);
  }, [selectedCategories]);

  return (
    <section
      id="skills"
      className="w-full bg-[#0A192F] text-gray-300 py-20 px-6 flex items-center justify-center"
    >
      <div className="max-w-6xl w-full">
        {/* Encabezado */}
        <div className={`text-center mb-10 transform transition-all duration-700 ${
          isHeaderVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 -translate-y-4'
        }`}>
          <p className="text-[#64ffda] text-sm uppercase tracking-widest mb-2 font-mono">
            Mi Stack Tecnológico
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Habilidades & Tecnologías
          </h2>
          <div className="w-20 h-1 bg-[#64ffda] mx-auto rounded-full" />
        </div>

        {/* Filtros de categorías */}
        <div className={`flex justify-center gap-3 mb-8 flex-wrap transform transition-all duration-700 ${
          areFiltersVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4'
        }`}>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                border-2 transform hover:scale-105 relative
                ${isCategorySelected(category)
                  ? "bg-[#64ffda] text-black border-[#64ffda] shadow-lg shadow-[#64ffda]/20"
                  : "bg-[#112240] text-gray-300 border-gray-600 hover:bg-[#1a365d] hover:border-[#64ffda]/50"
                }
              `}
              style={{
                animationDelay: `${800 + index * 50}ms`,
                animation: areFiltersVisible ? 'slideInUp 0.6s ease-out forwards' : 'none'
              }}
            >
              <span>{category}</span>
              <span className="ml-2 text-xs opacity-70">
                ({getSkillCountByCategory(category)})
              </span>
            </button>
          ))}
        </div>

        {/* Información de filtros activos */}
        <div className={`text-center mb-8 transform transition-all duration-500 ${
          areFiltersVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-2'
        }`} style={{ transitionDelay: '1000ms' }}>
          {selectedCategories.includes("Todos") ? (
            <div className="text-sm">
              <p className="text-gray-400 mb-1">
                Mostrando {displayedSkills.length} de {skillsData.length} tecnologías
              </p>
              {!showAllSkills && hasMoreSkills && (
                <p className="text-gray-500 text-xs">
                  Ordenadas por nivel de dominio • Las más dominadas primero
                </p>
              )}
            </div>
          ) : (
            <div className="text-sm">
              <p className="text-gray-400 mb-2">
                Filtrando por: <span className="text-[#64ffda]">{selectedCategories.join(", ")}</span>
              </p>
              <p className="text-gray-500">
                Mostrando {displayedSkills.length} de {allFilteredSkills.length} tecnología{allFilteredSkills.length !== 1 ? 's' : ''} 
                {!showAllSkills && hasMoreSkills && (
                  <span className="block text-xs mt-1">Ordenadas por dominio</span>
                )}
              </p>
            </div>
          )}
        </div>

        {/* Grid de skills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {displayedSkills.map((skill, idx) => (
            <SkillCard key={`${skill.name}-${idx}`} skill={skill} index={idx} />
          ))}
        </div>

        {/* Botón Ver todas las skills */}
        {hasMoreSkills && (
          <div className="text-center mb-12">
            <button
              onClick={() => setShowAllSkills(!showAllSkills)}
              className={`
                px-8 py-4 bg-gradient-to-r from-[#64ffda]/10 to-[#64ffda]/5 
                border-2 border-[#64ffda] text-[#64ffda] rounded-xl font-medium 
                hover:bg-[#64ffda] hover:text-black transition-all duration-300 
                hover:scale-105 hover:shadow-lg hover:shadow-[#64ffda]/25
                transform ${areFiltersVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                flex items-center gap-3 mx-auto
              `}
              style={{ transitionDelay: '1400ms' }}
            >
              <span>
                {showAllSkills 
                  ? `Mostrar menos (${displayedSkills.length} de ${allFilteredSkills.length})`
                  : `Ver todas las habilidades (+${allFilteredSkills.length - 10} más)`
                }
              </span>
              <svg 
                className={`w-5 h-5 transition-transform duration-300 ${showAllSkills ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

        {/* Mensaje si no hay resultados */}
        {allFilteredSkills.length === 0 && (
          <div className="text-center mt-10 p-8 bg-[#112240]/50 rounded-xl border border-gray-700/30 mb-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No hay resultados</h3>
            <p className="text-gray-400 mb-4">
              No se encontraron tecnologías que coincidan con los filtros: 
              <span className="text-[#64ffda] font-medium"> {selectedCategories.join(", ")}</span>
            </p>
            <button
              onClick={() => setSelectedCategories(["Todos"])}
              className="px-4 py-2 bg-[#64ffda] text-black rounded-lg font-medium hover:bg-[#64ffda]/80 transition-colors"
            >
              Ver todas las tecnologías
            </button>
          </div>
        )}

        {/* Estadísticas dinámicas */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { value: allFilteredSkills.length, label: selectedCategories.includes("Todos") ? "Total" : "Filtradas" },
            { value: skillsByLevel.Avanzado || 0, label: "Avanzado" },
            { value: skillsByLevel.Intermedio || 0, label: "Intermedio" },
            { value: skillsByLevel.Basico || 0, label: "Básico" }
          ].map((stat, index) => (
            <div 
              key={stat.label}
              className={`p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30 transform transition-all duration-700 ${
                areFiltersVisible 
                  ? 'opacity-100 translate-y-0 scale-100' 
                  : 'opacity-0 translate-y-8 scale-95'
              }`}
              style={{ 
                transitionDelay: `${1200 + index * 100}ms` 
              }}
            >
              <h3 className="text-2xl font-bold text-[#64ffda] mb-2 counter" data-target={stat.value}>
                {stat.value}
              </h3>
              <p className="text-gray-300 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Botón para limpiar filtros */}
        {!selectedCategories.includes("Todos") && (
          <div className={`text-center mt-8 transform transition-all duration-500 ${
            areFiltersVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-4'
          }`} style={{ transitionDelay: '1600ms' }}>
            <button
              onClick={() => setSelectedCategories(["Todos"])}
              className="px-6 py-3 bg-transparent border-2 border-[#64ffda] text-[#64ffda] rounded-lg font-medium hover:bg-[#64ffda] hover:text-black transition-all duration-300 hover:scale-105"
            >
              Limpiar filtros ({selectedCategories.length} activo{selectedCategories.length !== 1 ? 's' : ''})
            </button>
          </div>
        )}

        {/* CSS personalizado para animaciones */}
        <style jsx>{`
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInScale {
            from {
              opacity: 0;
              transform: scale(0.8);
            }
            to {
              opacity: 1;
              transform: scale(1);
            }
          }
          
          .counter {
            animation: ${areFiltersVisible ? 'fadeInScale 0.6s ease-out' : 'none'};
          }
        `}</style>
      </div>
    </section>
  );
};
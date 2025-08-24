import { useState, useEffect, useRef } from 'react';
import data from '@/data/data.json';

const experienceData = data.experience;

function countTechnologies(experience) {
  const techCount = {};

  experience.forEach((job) => {
    job.technologies.forEach((tech) => {
      if (techCount[tech]) {
        techCount[tech] += 1;
      } else {
        techCount[tech] = 1;
      }
    });
  });

  return techCount;
}

const usedTechnologies = countTechnologies(data.experience);

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.3, ...options }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isIntersecting];
};

const ExperienceCard = ({ experience, index, isVisible }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div
      className={`
        relative flex ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'} 
        items-center mb-8 md:mb-16 group
        ${isVisible ? 'animate-slide-in' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Timeline line connector */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#64FFDA]/50 to-transparent"></div>

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64FFDA] rounded-full border-4 border-[#0A192F] z-10 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-[#64FFDA]/50"></div>

      {/* Content */}
      <div className={`
        w-full md:w-5/12 ${isLeft ? 'md:pr-8' : 'md:pl-8'}
        ${isLeft ? 'md:text-right' : 'md:text-left'}
      `}>
        <div className="bg-[#112240] rounded-xl p-6 border border-gray-700/30 hover:border-[#64FFDA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#64FFDA]/10 group-hover:transform group-hover:scale-105">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{experience.logo}</span>
              <div>
                <h3 className="text-xl font-bold text-white group-hover:text-[#64FFDA] transition-colors">
                  {experience.position}
                </h3>
                <p className="text-[#64FFDA] font-semibold">{experience.company}</p>
              </div>
            </div>
            <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${experience.type === 'Tiempo Completo' ? 'bg-green-500/20 text-green-300' :
                experience.type === 'Freelance' ? 'bg-blue-500/20 text-blue-300' :
                  'bg-purple-500/20 text-purple-300'}
            `}>
              {experience.type}
            </span>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap items-center text-sm text-gray-400 mb-4 gap-4">
            <span className="flex items-center">
              <span className="mr-2">📅</span>
              {experience.period}
            </span>
            <span className="flex items-center">
              <span className="mr-2">📍</span>
              {experience.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-300 mb-4 leading-relaxed">
            {experience.description}
          </p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mb-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[#64FFDA]/10 text-[#64FFDA] rounded-full text-xs font-medium border border-[#64FFDA]/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expandable achievements */}
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center text-[#64FFDA] hover:text-white transition-colors font-medium"
            >
              <span className="mr-2">
                {isExpanded ? '📖' : '🏆'}
              </span>
              {isExpanded ? 'Ocultar logros' : 'Ver logros'}
              <span className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>

            <div className={`
              overflow-hidden transition-all duration-300 
              ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
            `}>
              <ul className="space-y-2 mt-3 pl-4">
                {experience.achievements.map((achievement, idx) => (
                  <li key={idx} className="text-gray-300 text-sm flex items-start">
                    <span className="text-[#64FFDA] mr-3 mt-1">•</span>
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const Experience = () => {
  const [headerRef, headerIsVisible] = useIntersectionObserver();
  const [timelineRef, timelineIsVisible] = useIntersectionObserver();

  return (
    <section
      id="experience"
      className="w-full bg-[#0A192F] text-gray-300 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className={`
            text-[#64FFDA] text-sm uppercase tracking-widest mb-2 font-mono
            ${headerIsVisible ? 'animate-fade-in' : 'opacity-0'}
          `}>
            Mi Trayectoria
          </p>
          <h2 className={`
            text-4xl md:text-5xl font-bold text-white mb-4
            ${headerIsVisible ? 'animate-slide-up' : 'opacity-0'}
          `}>
            Experiencia Profesional
          </h2>
          <div className={`
            w-20 h-1 bg-[#64FFDA] mx-auto rounded-full mb-6
            ${headerIsVisible ? 'animate-expand' : 'opacity-0 scale-x-0'}
          `}></div>
          <p className={`
            text-lg text-gray-400 max-w-2xl mx-auto
            ${headerIsVisible ? 'animate-slide-up delay-300' : 'opacity-0'}
          `}>
            Un recorrido por mi desarrollo profesional y los proyectos que han marcado mi carrera
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          {/* Main timeline line (hidden on mobile) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#64FFDA] via-[#64FFDA]/50 to-transparent"></div>

          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isVisible={timelineIsVisible}
            />
          ))}
        </div>

        {/* Stats */}
        <div className={`
          mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 
          ${timelineIsVisible ? 'animate-slide-up delay-1000' : 'opacity-0'}
        `}>
          <div className="text-center p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-3xl font-bold text-[#64FFDA] mb-2">{data.info.years_worked}</h3>
            <p className="text-gray-300">Años de experiencia</p>
          </div>
          <div className="text-center p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-3xl font-bold text-[#64FFDA] mb-2">{data.info.proyects_completed}</h3>
            <p className="text-gray-300">Proyectos completados</p>
          </div>
          <div className="text-center p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-3xl font-bold text-[#64FFDA] mb-2">{data.info.companies}</h3>
            <p className="text-gray-300">Empresas</p>
          </div>
          <div className="text-center p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
            <h3 className="text-3xl font-bold text-[#64FFDA] mb-2">{usedTechnologies}</h3>
            <p className="text-gray-300">Tecnologías</p>
          </div>
        </div>
      </div>

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slide-up {
          from { 
            opacity: 0; 
            transform: translateY(30px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes slide-in {
          from { 
            opacity: 0; 
            transform: translateY(50px); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0); 
          }
        }
        
        @keyframes expand {
          from { 
            opacity: 0; 
            transform: scaleX(0); 
          }
          to { 
            opacity: 1; 
            transform: scaleX(1); 
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-slide-in {
          animation: slide-in 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-1000 { animation-delay: 1000ms; }
      `}</style>
    </section>
  );
};
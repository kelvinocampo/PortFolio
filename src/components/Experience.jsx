import { useState, useEffect } from 'react';
import data from '@/data/data.json';

const uiData = data.ui.experience

const experienceData = data.experience;

// ✅ Simplified with flatMap
function countTechnologies(experience) {
  return new Set(experience.flatMap(job => job.technologies)).size;
}

const usedTechnologies = countTechnologies(experienceData);

// ✅ Custom hook with dependencies
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold: 0.0, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element, options.root, options.threshold, options.rootMargin]);

  return { ref: setElement, isIntersecting };
};

// ✅ Reusable stat card
const StatCard = ({ value, label }) => (
  <div className="text-center p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30">
    <h3 className="text-3xl font-bold text-[#64FFDA] mb-2">{value}</h3>
    <p className="text-gray-300">{label}</p>
  </div>
);

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
      {/* Timeline line */}
      <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#64FFDA]/50 to-transparent"></div>

      {/* Timeline dot */}
      <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-[#64FFDA] rounded-full border-4 border-[#0A192F] z-10 group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-[#64FFDA]/50"></div>

      {/* Content */}
      <div
        className={`w-full md:w-5/12`}
      >
        <div className="bg-[#112240] rounded-xl p-6 border border-gray-700/30 hover:border-[#64FFDA]/50 transition-all duration-300 hover:shadow-xl hover:shadow-[#64FFDA]/10 group-hover:scale-105">
          <div className="flex items-start gap-3 mb-3">
            <span className="text-3xl sm:text-4xl flex-shrink-0 hidden sm:block">{experience.logo}</span>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{experience.company}</h3>
              <p className="text-[#64FFDA] font-semibold text-sm sm:text-base">{experience.position}</p>
              <span className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-medium
                  ${experience.type === 'Tiempo Completo' ? 'bg-green-500/20 text-green-300' :
                  experience.type === 'Freelance' ? 'bg-blue-500/20 text-blue-300' :
                    'bg-purple-500/20 text-purple-300'}`}>
                {experience.type}
              </span>
            </div>
          </div>

          {/* Meta */}
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
                key={`${experience.id}-${tech}`} // ✅ safer key
                className="px-3 py-1 bg-[#64FFDA]/10 text-[#64FFDA] rounded-full text-xs font-medium border border-[#64FFDA]/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Achievements */}
          <div className="space-y-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={`achievements-${experience.id}`}
              className="cursor-pointer flex items-center text-[#64FFDA] hover:text-white transition-colors font-medium"
            >
              <span className="mr-2">{isExpanded ? '📖' : '🏆'}</span>
              {isExpanded ? 'Ocultar logros' : 'Ver logros'}
              <span
                className={`ml-2 transform transition-transform ${isExpanded ? 'rotate-180' : ''
                  }`}
              >
                ▼
              </span>
            </button>

            <div
              id={`achievements-${experience.id}`}
              className={`
                overflow-hidden transition-all duration-300 
                ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
              `}
            >
              <ul className="space-y-2 mt-3 pl-4">
                {experience.achievements.map((achievement) => (
                  <li
                    key={`${experience.id}-${achievement}`}
                    className="text-gray-300 text-sm flex items-start"
                  >
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
  const { ref: headerRef, isIntersecting: headerIsVisible } = useIntersectionObserver();
  const { ref: timelineRef, isIntersecting: timelineIsVisible } = useIntersectionObserver();
  const { ref: statsRef, isIntersecting: statsIsVisible } = useIntersectionObserver();


  const [showAll, setShowAll] = useState(false);

  // Mostrar los últimos 3 por defecto
  const displayedExperiences = showAll ? experienceData : experienceData.slice(-3);
  const hasMoreThanThree = experienceData.length > 3;

  return (
    <section
      id="experience"
      className="w-full bg-[#0A192F] text-gray-300 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p
            className={`
              text-[#64FFDA] text-sm uppercase tracking-widest mb-2 font-mono
              ${headerIsVisible ? 'animate-fade-in' : 'opacity-0'}
            `}
          >
            {uiData.title[0]}
          </p>
          <h2
            className={`
              text-4xl md:text-5xl font-bold text-white mb-4
              ${headerIsVisible ? 'animate-slide-up' : 'opacity-0'}
            `}
          >
            {uiData.title[1]}
          </h2>
          <div
            className={`
              w-20 h-1 bg-[#64FFDA] mx-auto rounded-full mb-6
              ${headerIsVisible ? 'animate-expand' : 'opacity-0 scale-x-0'}
            `}
          ></div>
          <p
            className={`
              text-lg text-gray-400 max-w-2xl mx-auto
              ${headerIsVisible ? 'animate-slide-up delay-300' : 'opacity-0'}
            `}
          >
            {uiData.description}
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative">
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-[#64FFDA] via-[#64FFDA]/50 to-transparent"></div>

          {displayedExperiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              isVisible={timelineIsVisible}
            />
          ))}
        </div>

        {/* Show More/Less Button */}
        {hasMoreThanThree && (
          <div className="flex justify-center mt-8 mb-12">
            <button
              onClick={() => setShowAll(!showAll)}
              className="cursor-pointer px-6 py-3 bg-[#64FFDA]/10 hover:bg-[#64FFDA]/20 text-[#64FFDA] rounded-lg font-medium transition-all duration-300 border border-[#64FFDA]/30 hover:border-[#64FFDA]/50 flex items-center gap-2"
            >
              {showAll ? (
                <>
                  <span>{uiData.show_less}</span>
                  <span className="transform rotate-180">▼</span>
                </>
              ) : (
                <>
                  <span>{uiData.show_all} ({experienceData.length})</span>
                  <span>▼</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Stats */}
        <div
          ref={statsRef}
          className={`
            mt-16 grid grid-cols-1 md:grid-cols-4 gap-6 
            ${statsIsVisible ? 'animate-slide-up delay-1000' : 'opacity-0'}
          `}
        >
          {data.info.map((item) => (
            <StatCard value={item.value} label={item.label} />
            ))}
          <StatCard value={usedTechnologies} label="Tecnologías" />
        </div>
      </div>
    </section>
  );
};

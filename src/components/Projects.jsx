import { useState, useEffect, useRef } from 'react';
import data from '@/data/data.json';

const projectsData = data.projects;

const categories = [
    { id: 'all', name: 'Todos', icon: '🎯' },
    { id: 'fullstack', name: 'Full Stack', icon: '🚀' },
    { id: 'frontend', name: 'Frontend', icon: '🎨' },
    { id: 'backend', name: 'Backend', icon: '⚙️' }
];

const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const ref = useRef();

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
            },
            { threshold: 0.0, ...options }
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

const ProjectModal = ({ project, isOpen, onClose }) => {
    if (!isOpen || !project) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
            <div
                className="bg-[#112240] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-[#64FFDA]/30 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-64 object-cover rounded-t-2xl"
                    />
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#64FFDA]/20 transition-colors"
                        >
                            ✕
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                        <span className={`
              px-3 py-1 rounded-full text-xs font-medium
              ${project.status === 'Completado' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                project.status === 'En Progreso' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'}
            `}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    <div className="flex flex-wrap items-start justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-white mb-2">{project.title}</h2>
                            <p className="text-[#64FFDA] font-medium">{project.client} • {project.year}</p>
                        </div>
                        <div className="text-right text-sm text-gray-400">
                            <p>Duración: {project.duration}</p>
                        </div>
                    </div>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {project.longDescription}
                    </p>

                    {/* Features */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Características principales</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {project.features.map((feature, index) => (
                                <div key={index} className="flex items-center text-gray-300">
                                    <span className="text-[#64FFDA] mr-3">✓</span>
                                    {feature}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Technologies */}
                    <div className="mb-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Stack tecnológico</h3>
                        <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                                <span
                                    key={tech}
                                    className="px-4 py-2 bg-[#64FFDA]/10 text-[#64FFDA] rounded-lg text-sm font-medium border border-[#64FFDA]/30 hover:bg-[#64FFDA]/20 transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-4">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 bg-[#64FFDA] text-[#0A192F] font-semibold rounded-lg hover:bg-[#00FFCA] transition-colors hover:scale-105 transform"
                            >
                                <span className="mr-2">📁</span>
                                Ver Código
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-6 py-3 border-2 border-[#64FFDA] text-[#64FFDA] font-semibold rounded-lg hover:bg-[#64FFDA] hover:text-[#0A192F] transition-colors hover:scale-105 transform"
                            >
                                <span className="mr-2">🚀</span>
                                Ver Demo
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const ProjectCard = ({ project, index, onClick }) => {
    const [cardRef, cardIsVisible] = useIntersectionObserver();

    return (
        <div
            ref={cardRef}
            className={`
        group cursor-pointer
        ${cardIsVisible ? 'animate-slide-in-up' : 'opacity-0'}
      `}
            style={{ animationDelay: `${index * 150}ms` }}
            onClick={() => onClick(project)}
        >
            <div className="bg-[#112240] rounded-xl overflow-hidden border border-gray-700/30 hover:border-[#64FFDA]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#64FFDA]/10 group-hover:transform group-hover:scale-105">
                {/* Image */}
                <div className="relative overflow-hidden">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent"></div>

                    {/* Status badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`
              px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm
              ${project.status === 'Completado' ? 'bg-green-500/20 text-green-300 border border-green-500/50' :
                                project.status === 'En Progreso' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/50'}
            `}>
                            {project.status === 'Completado' ? '✅ Completado' :
                                project.status === 'En Progreso' ? '🚧 En desarrollo' : '📋 Planeado'}
                        </span>
                    </div>

                    {/* Quick actions */}
                    <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {project.githubUrl && (
                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#64FFDA]/20 transition-colors"
                            >
                                📁
                            </a>
                        )}
                        {project.liveUrl && (
                            <a
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={(e) => e.stopPropagation()}
                                className="w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-[#64FFDA]/20 transition-colors"
                            >
                                🚀
                            </a>
                        )}
                    </div>

                    {/* Year */}
                    <div className="absolute bottom-4 right-4">
                        <span className="px-2 py-1 bg-[#64FFDA]/20 text-[#64FFDA] rounded text-xs font-medium backdrop-blur-sm">
                            {project.year}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#64FFDA] transition-colors">
                        {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                        {project.description}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.slice(0, 4).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-1 bg-[#64FFDA]/10 text-[#64FFDA] rounded text-xs font-medium"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-2 py-1 bg-gray-600/20 text-gray-400 rounded text-xs font-medium">
                                +{project.technologies.length - 4}
                            </span>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>{project.client}</span>
                        <span className="text-[#64FFDA]">Ver detalles →</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Projects = () => {
    const [activeCategory, setActiveCategory] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [headerRef, headerIsVisible] = useIntersectionObserver();
    const [filtersRef, filtersIsVisible] = useIntersectionObserver();

    const filteredProjects = activeCategory === 'all'
        ? projectsData
        : projectsData.filter(project => project.category === activeCategory);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        document.body.style.overflow = 'unset';
    };

    return (
        <section
            id="projects"
            className="w-full bg-[#0A192F] text-gray-300 py-20 px-4 sm:px-6 lg:px-8"
        >
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div ref={headerRef} className="text-center mb-16">
                    <p className={`
            text-[#64FFDA] text-sm uppercase tracking-widest mb-2 font-mono
            ${headerIsVisible ? 'animate-fade-in' : 'opacity-0'}
          `}>
                        Portfolio
                    </p>
                    <h2 className={`
            text-4xl md:text-5xl font-bold text-white mb-4
            ${headerIsVisible ? 'animate-slide-up' : 'opacity-0'}
          `}>
                        Proyectos Destacados
                    </h2>
                    <div className={`
            w-20 h-1 bg-[#64FFDA] mx-auto rounded-full mb-6
            ${headerIsVisible ? 'animate-expand' : 'opacity-0 scale-x-0'}
          `}></div>
                    <p className={`
            text-lg text-gray-400 max-w-2xl mx-auto
            ${headerIsVisible ? 'animate-slide-up delay-300' : 'opacity-0'}
          `}>
                        Una colección de proyectos que demuestran mis habilidades y experiencia en desarrollo web
                    </p>
                </div>

                {/* Filter Categories */}
                <div ref={filtersRef} className={`
          flex flex-wrap justify-center gap-3 mb-12
          ${filtersIsVisible ? 'animate-slide-up delay-500' : 'opacity-0'}
        `}>
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setActiveCategory(category.id)}
                            className={`
                flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105
                ${activeCategory === category.id
                                    ? 'bg-[#64FFDA] text-[#0A192F] shadow-lg shadow-[#64FFDA]/25'
                                    : 'bg-[#112240] text-gray-300 border border-gray-700/50 hover:border-[#64FFDA]/50 hover:text-[#64FFDA]'
                                }
              `}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                            <span className="ml-2 text-xs opacity-70">
                                ({category.id === 'all' ? projectsData.length : projectsData.filter(p => p.category === category.id).length})
                            </span>
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                            onClick={openModal}
                        />
                    ))}
                </div>

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="text-center py-16">
                        <span className="text-6xl mb-4 block">🚧</span>
                        <h3 className="text-2xl font-bold text-white mb-2">No hay proyectos</h3>
                        <p className="text-gray-400">No se encontraron proyectos en esta categoría</p>
                    </div>
                )}
            </div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                isOpen={isModalOpen}
                onClose={closeModal}
            />

            {/* Estilos CSS */}
            <style>{`
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
        
        @keyframes slide-in-up {
          from { 
            opacity: 0; 
            transform: translateY(50px) scale(0.95); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
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
        
        .animate-slide-in-up {
          animation: slide-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-expand {
          animation: expand 1s ease-out forwards;
        }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
        </section>
    );
};
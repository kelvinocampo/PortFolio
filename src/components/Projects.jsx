import { useState, useEffect, useRef } from 'react';

const projectsData = [
    {
        id: 1,
        title: "E-commerce Platform",
        category: "fullstack",
        description: "Plataforma completa de comercio electrónico con panel de administración, carrito de compras y pasarela de pagos integrada.",
        longDescription: "Una solución completa de e-commerce construida desde cero con React y Node.js. Incluye gestión de inventario, procesamiento de pagos con Stripe, autenticación de usuarios, panel de administración completo y análiticas en tiempo real. La plataforma maneja más de 1000 productos y procesa cientos de transacciones diarias.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux", "Express"],
        features: [
            "Carrito de compras en tiempo real",
            "Procesamiento de pagos seguro",
            "Panel de administración completo",
            "Sistema de reseñas y ratings",
            "Gestión de inventario automática",
            "Analytics y reportes detallados"
        ],
        githubUrl: "https://github.com/username/ecommerce",
        liveUrl: "https://ecommerce-demo.com",
        status: "completed",
        year: "2023",
        client: "StartupXYZ",
        duration: "4 meses"
    },
    {
        id: 2,
        title: "Task Management App",
        category: "frontend",
        description: "Aplicación moderna de gestión de tareas con drag & drop, colaboración en tiempo real y sincronización en la nube.",
        longDescription: "Una aplicación de productividad inspirada en Notion y Trello, pero con un enfoque único en la colaboración en tiempo real. Permite a los equipos gestionar proyectos con tableros Kanban interactivos, comentarios en tiempo real, asignación de tareas y seguimiento del progreso con métricas detalladas.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        technologies: ["React", "TypeScript", "Tailwind", "Socket.io", "Framer Motion"],
        features: [
            "Drag & drop intuitivo",
            "Colaboración en tiempo real",
            "Tableros Kanban personalizables",
            "Comentarios y menciones",
            "Modo oscuro/claro",
            "Sincronización offline"
        ],
        githubUrl: "https://github.com/username/taskapp",
        liveUrl: "https://taskapp-demo.com",
        status: "completed",
        year: "2023",
        client: "Proyecto Personal",
        duration: "3 meses"
    },
    {
        id: 3,
        title: "AI Content Generator",
        category: "fullstack",
        description: "Herramienta de generación de contenido impulsada por IA para marketing digital y creación de copy publicitario.",
        longDescription: "Una plataforma SaaS que utiliza modelos de IA para generar contenido de marketing de alta calidad. Incluye templates para redes sociales, emails, blogs y anuncios publicitarios. Con más de 50 templates predefinidos y la capacidad de entrenar modelos personalizados.",
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",
        technologies: ["Next.js", "OpenAI API", "PostgreSQL", "Prisma", "Stripe", "Vercel"],
        features: [
            "50+ templates de contenido",
            "Integración con OpenAI GPT-4",
            "Editor de texto avanzado",
            "Exportación en múltiples formatos",
            "Sistema de suscripciones",
            "API para desarrolladores"
        ],
        githubUrl: "https://github.com/username/ai-content",
        liveUrl: "https://ai-content-demo.com",
        status: "in-progress",
        year: "2024",
        client: "Tech Solutions Inc.",
        duration: "6 meses"
    },
    {
        id: 4,
        title: "Weather Dashboard",
        category: "frontend",
        description: "Dashboard meteorológico interactivo con mapas en tiempo real, pronósticos y alertas personalizadas.",
        longDescription: "Una aplicación web que combina múltiples APIs meteorológicas para ofrecer pronósticos precisos y visualizaciones interactivas. Incluye mapas de radar, gráficos de temperatura y precipitación, y un sistema de alertas personalizables por ubicación.",
        image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=600&fit=crop",
        technologies: ["Vue.js", "D3.js", "Mapbox", "Chart.js", "PWA"],
        features: [
            "Pronósticos de 7 días",
            "Mapas interactivos con radar",
            "Alertas meteorológicas push",
            "Múltiples ubicaciones",
            "Gráficos interactivos",
            "Funciona offline (PWA)"
        ],
        githubUrl: "https://github.com/username/weather-app",
        liveUrl: "https://weather-dashboard-demo.com",
        status: "completed",
        year: "2022",
        client: "Proyecto Personal",
        duration: "2 meses"
    },
    {
        id: 5,
        title: "Social Media Analytics",
        category: "backend",
        description: "API y dashboard para análisis de redes sociales con métricas avanzadas y reportes automatizados.",
        longDescription: "Un sistema completo de analytics para redes sociales que recopila y analiza datos de múltiples plataformas. Incluye métricas de engagement, análisis de sentimientos, seguimiento de hashtags y generación automática de reportes personalizables.",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
        technologies: ["Node.js", "Python", "Redis", "Docker", "GraphQL", "MongoDB"],
        features: [
            "APIs de múltiples plataformas",
            "Análisis de sentimientos con IA",
            "Reportes automatizados",
            "Dashboard en tiempo real",
            "Sistema de alertas",
            "Exportación de datos"
        ],
        githubUrl: "https://github.com/username/social-analytics",
        liveUrl: null,
        status: "completed",
        year: "2023",
        client: "Marketing Agency",
        duration: "5 meses"
    },
    {
        id: 6,
        title: "Crypto Trading Bot",
        category: "backend",
        description: "Bot automatizado de trading para criptomonedas con estrategias de machine learning y gestión de riesgos.",
        longDescription: "Un sistema de trading automatizado que utiliza algoritmos de machine learning para analizar patrones de mercado y ejecutar operaciones. Incluye backtesting, gestión de riesgos, múltiples estrategias y un dashboard para monitoreo en tiempo real.",
        image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",
        technologies: ["Python", "TensorFlow", "FastAPI", "PostgreSQL", "Docker", "Redis"],
        features: [
            "Múltiples estrategias de trading",
            "Machine Learning integrado",
            "Gestión automática de riesgos",
            "Backtesting histórico",
            "Alertas en tiempo real",
            "Dashboard de monitoreo"
        ],
        githubUrl: "https://github.com/username/crypto-bot",
        liveUrl: null,
        status: "completed",
        year: "2022",
        client: "Proyecto Personal",
        duration: "6 meses"
    }
];

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
            { threshold: 0.1, ...options }
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
              ${project.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/30'}
            `}>
                            {project.status === 'completed' ? 'Completado' :
                                project.status === 'in-progress' ? 'En desarrollo' : 'Planeado'}
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
              ${project.status === 'completed' ? 'bg-green-500/20 text-green-300 border border-green-500/50' :
                                project.status === 'in-progress' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/50' :
                                    'bg-blue-500/20 text-blue-300 border border-blue-500/50'}
            `}>
                            {project.status === 'completed' ? '✅ Completado' :
                                project.status === 'in-progress' ? '🚧 En desarrollo' : '📋 Planeado'}
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
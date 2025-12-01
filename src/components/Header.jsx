import { useState, useEffect } from 'react';
import data from '@/data/data.json';

const uiData = data.ui.header

const navigationItems = uiData.navigation;

const ICONS = {
  'github': <i className='bx bxl-github'></i>,
  'linkedin': <i className='bx bxl-linkedin'></i>,
  'gmail': <i className='bx bxl-gmail'></i>,
  'whatsapp': <i className='bx bxl-whatsapp'></i>,
};

const socialLinks = [
  {
    name: data.contact.find(item => item.icon === 'github').name,
    href: data.contact.find(item => item.icon === 'github').href,
    icon: ICONS.github
  },
  {
    name: data.contact.find(item => item.icon === 'linkedin').name,
    href: data.contact.find(item => item.icon === 'linkedin').href,
    icon: ICONS.linkedin
  },
  {
    name: data.contact.find(item => item.icon === 'gmail').name,
    href: data.contact.find(item => item.icon === 'gmail').href,
    icon: ICONS.gmail
  },
  {
    name: data.contact.find(item => item.icon === 'whatsapp').name,
    href: data.contact.find(item => item.icon === 'whatsapp').href,
    icon: ICONS.whatsapp
  }
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getButtonClasses = (variant, isMobile = false) => {
    const baseSize = isMobile ? "px-4 py-2 text-sm" : "px-4 py-2 sm:px-6 sm:py-3";
    const baseClasses = `${baseSize} rounded-lg font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#64FFDA]/50 w-full sm:w-auto text-center`;

    switch (variant) {
      case 'primary':
        return `${baseClasses} bg-gradient-to-r from-[#64FFDA] to-[#00FFCA] text-[#0A192F] hover:shadow-lg hover:shadow-[#64FFDA]/25`;
      case 'secondary':
        return `${baseClasses} border-2 border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA] hover:text-[#0A192F] hover:shadow-lg hover:shadow-[#64FFDA]/25`;
      case 'outline':
        return `${baseClasses} bg-[#0A192F]/80 backdrop-blur-sm text-white border-2 border-[#64FFDA]/50 hover:border-[#64FFDA] hover:bg-[#64FFDA]/10`;
      default:
        return baseClasses;
    }
  };

  return (
    <>
      {/* Header Principal */}
      <header className="relative min-h-screen bg-gradient-to-br from-[#0A192F] via-[#0F3460] to-[#112240] flex items-center justify-center overflow-hidden">
        {/* Efectos de fondo - Responsive */}
        <div className="absolute inset-0">
          {/* Círculos decorativos - Tamaños responsive */}
          <div className="absolute top-10 sm:top-20 left-5 sm:left-10 w-40 h-40 sm:w-72 sm:h-72 bg-[#64FFDA]/5 rounded-full blur-2xl sm:blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-5 sm:right-10 w-48 h-48 sm:w-96 sm:h-96 bg-[#64FFDA]/3 rounded-full blur-2xl sm:blur-3xl animate-pulse delay-1000"></div>

          {/* Grid pattern - Responsive */}
          <div
            className="absolute inset-0 opacity-5 sm:opacity-10"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, #64FFDA 1px, transparent 0)`,
              backgroundSize: '30px 30px'
            }}
          ></div>
        </div>

        {/* Contenido principal */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
          {/* Saludo animado */}
          <div className="mb-4 sm:mb-6">
            <p className="text-[#64FFDA] text-base sm:text-lg md:text-xl font-mono tracking-wider animate-fade-in">
              {uiData.greeting}
            </p>
          </div>

          {/* Nombre principal - Muy responsive */}
          <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight mb-4 sm:mb-6 animate-slide-up leading-tight">
            <span className="bg-gradient-to-r from-white via-[#E6F1FF] to-[#64FFDA] bg-clip-text text-transparent">
              {uiData.name}
            </span>
          </h1>

          {/* Título y descripción */}
          <div className="mb-6 sm:mb-8 space-y-3 sm:space-y-4">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#8892b0] animate-slide-up delay-200">
              {uiData.role}
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-[#8892b0] max-w-2xl mx-auto leading-relaxed animate-slide-up delay-300 px-2">
              {uiData.description[0]}
              <br className="hidden sm:block" />
              <span className="text-[#64FFDA]">{uiData.description[1]}</span>
            </p>
          </div>

          {/* Botones de navegación - Grid responsive */}
          <div className="mb-6 sm:mb-8 animate-slide-up delay-500">
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:flex sm:flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-lg sm:max-w-none mx-auto">
              {navigationItems.map((item, index) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={getButtonClasses(item.variant)}
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Redes sociales */}
          <div className="flex justify-center space-x-4 sm:space-x-6 animate-slide-up delay-700 mb-8 sm:mb-0">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className="p-2 sm:p-3 text-[#8892b0] hover:text-[#64FFDA] hover:scale-110 transition-all duration-300 rounded-lg hover:bg-[#64FFDA]/10"
                aria-label={social.name}
              >
                <span className="text-xl sm:text-2xl">{social.icon}</span>
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Navbar fijo - Completamente responsive */}
      <nav className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled
          ? 'bg-[#0A192F]/95 backdrop-blur-lg shadow-lg border-b border-[#64FFDA]/20'
          : 'bg-transparent'
        }
      `}>
        <div className="max-w-6xl mx-auto px-4 py-3 sm:py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-[#64FFDA] font-bold text-lg sm:text-xl font-mono">
            {'<KO />'}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[#8892b0] hover:text-[#64FFDA] transition-colors duration-300 font-medium text-sm lg:text-base"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-[#64FFDA] p-2 rounded-lg hover:bg-[#64FFDA]/10 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center space-y-1">
              <span className={`block h-0.5 w-6 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block h-0.5 w-6 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          md:hidden absolute top-full left-0 right-0 bg-[#0A192F]/98 backdrop-blur-lg border-b border-[#64FFDA]/20
          transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
        `}>
          <div className="px-4 py-4 space-y-2">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block text-[#8892b0] hover:text-[#64FFDA] transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-[#64FFDA]/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Estilos CSS mejorados */}
      <style>{`
        @media (max-width: 475px) {
          .xs\\:text-4xl {
            font-size: 2.25rem;
          }
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        
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
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
        .delay-700 { animation-delay: 700ms; }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </>
  );
};
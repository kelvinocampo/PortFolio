import React, { useState, useEffect, useRef } from 'react';
import emailjs from '@emailjs/browser';
import data from '@/data/data.json';

const ICONS = {
  'github': <i className='bx bxl-github'></i>,
  'linkedin': <i className='bx bxl-linkedin'></i>,
  'gmail': <i className='bx bxl-gmail'></i>,
  'whatsapp': <i className='bx bxl-whatsapp'></i>,
}

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

const contactMethods = data.contact;

const ContactCard = ({ method, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={method.href}
      target={method.name !== 'Email' ? '_blank' : '_self'}
      rel={method.name !== 'Email' ? 'noopener noreferrer' : ''}
      className={`
        group block p-6 bg-[#112240] rounded-xl border border-gray-700/30 
        hover:border-[#64FFDA]/50 transition-all duration-300 hover:shadow-xl 
        hover:shadow-[#64FFDA]/10 hover:transform hover:scale-105 cursor-pointer
        ${method.bgHover}
        ${isVisible ? 'animate-slide-in' : 'opacity-0'}
      `}
      style={{ animationDelay: `${index * 150}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className={`
            w-12 h-12 rounded-lg bg-gradient-to-br ${method.color} 
            flex items-center justify-center text-2xl transform 
            group-hover:scale-110 transition-transform duration-300
            shadow-lg
          `}>
            {React.cloneElement(ICONS[method.icon], {
              className: `${ICONS[method.icon].props.className || ''} ${method.iconStyles || ''}`
            })}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white group-hover:text-[#64FFDA] transition-colors">
              {method.name}
            </h3>
            <p className="text-gray-400 text-sm">{method.description}</p>
          </div>
        </div>
        <div className="text-[#64FFDA] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 text-xl">
          ↗
        </div>
      </div>

      <div className="bg-[#0A192F]/50 rounded-lg p-3 border border-gray-700/20 group-hover:border-[#64FFDA]/30 transition-colors">
        <p className="text-[#64FFDA] font-mono text-sm">
          {method.value}
        </p>
      </div>
    </a>
  );
};

const ContactForm = ({ isVisible }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  // Configura tus credenciales de EmailJS aquí
  const EMAILJS_SERVICE_ID = 'service_po7kqns';
  const EMAILJS_TEMPLATE_ID = 'template_nonskja';
  const EMAILJS_PUBLIC_KEY = 'zMIbWhkVdUfoeWNcU';

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus(null), 3000);
      return;
    }

    setIsSubmitting(true);

    try {
      // Enviar email usando EmailJS
      const result = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: 'KEVIN OCAMPO', // Puedes personalizar esto
        },
        EMAILJS_PUBLIC_KEY
      );

      console.log('Email enviado exitosamente:', result.text);
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error al enviar email:', error);
      setIsSubmitting(false);
      setSubmitStatus('error-send');
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  const inputClasses = `
    w-full px-4 py-3 bg-[#112240] border border-gray-700/30 rounded-lg
    text-white placeholder-gray-400 focus:outline-none focus:border-[#64FFDA]
    focus:ring-2 focus:ring-[#64FFDA]/20 transition-all duration-300
    hover:border-gray-600
  `;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className={`
        space-y-6 ${isVisible ? 'animate-slide-up' : 'opacity-0'}
      `}
      style={{ animationDelay: '400ms' }}
    >
      {/* Nombre y Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-[#64FFDA] font-medium mb-2">
            Nombre *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Tu nombre completo"
            className={inputClasses}
            required
          />
        </div>
        <div>
          <label className="block text-[#64FFDA] font-medium mb-2">
            Email *
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu.email@ejemplo.com"
            className={inputClasses}
            required
          />
        </div>
      </div>

      {/* Asunto */}
      <div>
        <label className="block text-[#64FFDA] font-medium mb-2">
          Asunto *
        </label>
        <input
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          placeholder="¿De qué quieres hablar?"
          className={inputClasses}
          required
        />
      </div>

      {/* Mensaje */}
      <div>
        <label className="block text-[#64FFDA] font-medium mb-2">
          Mensaje *
        </label>
        <textarea
          name="message"
          rows={6}
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Cuéntame sobre tu proyecto, idea o simplemente saluda..."
          className={`${inputClasses} resize-vertical min-h-[120px]`}
          required
        />
      </div>

      {/* Status messages */}
      {submitStatus === 'success' && (
        <div className="p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 animate-slide-in">
          <div className="flex items-center space-x-2">
            <span>✅</span>
            <p>¡Mensaje enviado correctamente! Te responderé pronto.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 animate-slide-in">
          <div className="flex items-center space-x-2">
            <span>❌</span>
            <p>Por favor completa todos los campos obligatorios.</p>
          </div>
        </div>
      )}

      {submitStatus === 'error-send' && (
        <div className="p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 animate-slide-in">
          <div className="flex items-center space-x-2">
            <span>❌</span>
            <p>Hubo un error al enviar el mensaje. Por favor intenta nuevamente.</p>
          </div>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`
          w-full py-4 px-6 rounded-lg font-semibold text-lg transition-all duration-300 cursor-pointer
          ${isSubmitting
            ? 'bg-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-[#64FFDA] to-[#00FFCA] text-[#0A192F] hover:shadow-lg hover:shadow-[#64FFDA]/25 hover:scale-105'
          }
        `}
      >
        {isSubmitting ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-5 h-5 border-2 border-[#0A192F]/30 border-t-[#0A192F] rounded-full animate-spin"></div>
            <span>Enviando...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-2">
            <span>Enviar Mensaje</span>
            <span>🚀</span>
          </div>
        )}
      </button>
    </form>
  );
};

export const Contact = () => {
  const [headerRef, headerIsVisible] = useIntersectionObserver();
  const [contentRef, contentIsVisible] = useIntersectionObserver();

  return (
    <section
      id="contact"
      className="w-full bg-[#0A192F] text-gray-300 py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#64FFDA]/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#64FFDA]/2 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <p className={`
            text-[#64FFDA] text-sm uppercase tracking-widest mb-2 font-mono
            ${headerIsVisible ? 'animate-fade-in' : 'opacity-0'}
          `}>
            Hablemos
          </p>
          <h2 className={`
            text-4xl md:text-5xl font-bold text-white mb-4
            ${headerIsVisible ? 'animate-slide-up' : 'opacity-0'}
          `}>
            Ponte en Contacto
          </h2>
          <div className={`
            w-20 h-1 bg-[#64FFDA] mx-auto rounded-full mb-6
            ${headerIsVisible ? 'animate-expand' : 'opacity-0 scale-x-0'}
          `}></div>
          <p className={`
            text-lg text-gray-400 max-w-2xl mx-auto
            ${headerIsVisible ? 'animate-slide-up delay-300' : 'opacity-0'}
          `}>
            ¿Tienes un proyecto en mente? ¿Quieres colaborar en algo increíble?
            <br />
            <span className="text-[#64FFDA]">¡Me encantaría escuchar de ti!</span>
          </p>
        </div>

        <div ref={contentRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Métodos de contacto */}
          <div className="space-y-8">
            <div className={`
              ${contentIsVisible ? 'animate-slide-in' : 'opacity-0'}
            `}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">📞</span>
                Formas de Contacto
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Elige la forma que más te convenga para conectar conmigo.
                Respondo rápidamente y siempre estoy abierto a nuevas oportunidades y colaboraciones.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
              {contactMethods.map((method, index) => (
                <ContactCard
                  key={method.id}
                  method={method}
                  index={index}
                  isVisible={contentIsVisible}
                />
              ))}
            </div>

            {/* Información adicional */}
            <div className={`
              p-6 bg-[#112240]/50 rounded-xl border border-gray-700/30 backdrop-blur-sm
              ${contentIsVisible ? 'animate-slide-in delay-600' : 'opacity-0'}
            `}>
              <h4 className="text-white font-bold mb-4 flex items-center">
                <span className="mr-2">⚡</span>
                Información de Contacto
              </h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <span className="mr-2">🕒</span>
                    Horario:
                  </span>
                  <span className="text-[#64FFDA] font-medium">Lun - Vie, 9AM - 6PM (COT)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <span className="mr-2">⚡</span>
                    Respuesta:
                  </span>
                  <span className="text-[#64FFDA] font-medium">Dentro de 24 horas</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 flex items-center">
                    <span className="mr-2">🌎</span>
                    Ubicación:
                  </span>
                  <span className="text-[#64FFDA] font-medium">Colombia (GMT-5)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de contacto */}
          <div className="lg:pl-8">
            <div className={`
              ${contentIsVisible ? 'animate-slide-in delay-200' : 'opacity-0'}
            `}>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="mr-3">💬</span>
                Envíame un Mensaje
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Completa el formulario a continuación y te responderé lo antes posible.
                ¡No dudes en contarme todos los detalles sobre tu proyecto!
              </p>
            </div>

            <ContactForm isVisible={contentIsVisible} />
          </div>
        </div>

        {/* Call to Action Final */}
        <div className={`
          text-center mt-20 pt-12 border-t border-gray-700/30
          ${contentIsVisible ? 'animate-slide-up delay-800' : 'opacity-0'}
        `}>
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold text-white mb-4">
              ¿Listo para dar vida a tu proyecto?
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Transformemos tus ideas en experiencias digitales excepcionales.
              Hablemos sobre cómo puedo ayudarte a alcanzar tus objetivos y crear algo increíble juntos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={contactMethods[0].href}
                className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#64FFDA] to-[#00FFCA] text-[#0A192F] rounded-lg font-semibold hover:shadow-lg hover:shadow-[#64FFDA]/25 hover:scale-105 transition-all duration-300"
              >
                <span>¡Trabajemos juntos!</span>
                <span>🚀</span>
              </a>
              <a
                href={contactMethods[1].href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-3 px-8 py-4 border-2 border-[#64FFDA] text-[#64FFDA] rounded-lg font-semibold hover:bg-[#64FFDA] hover:text-[#0A192F] hover:shadow-lg hover:shadow-[#64FFDA]/25 transition-all duration-300"
              >
                <span>Ver mi LinkedIn</span>
                <span>💼</span>
              </a>
            </div>
          </div>
        </div>
      </div>

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
        
        .delay-200 { animation-delay: 200ms; }
        .delay-300 { animation-delay: 300ms; }
        .delay-400 { animation-delay: 400ms; }
        .delay-600 { animation-delay: 600ms; }
        .delay-800 { animation-delay: 800ms; }
      `}</style>
    </section>
  );
};
import { useState, useEffect } from 'react';
import { Menu, X, Landmark, ArrowRight, ShieldCheck } from 'lucide-react';
import { SiteConfig } from '../types';

interface HeaderProps {
  config: SiteConfig;
  onNavigate: (view: 'main' | 'admin') => void;
  currentView: 'main' | 'admin';
}

export default function Header({ config, onNavigate, currentView }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    'Olá, tenho interesse nos planos da GIGANET. Pode me passar mais informações?'
  )}`;

  const navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#planos' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Sobre Nós', href: '#sobre' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    onNavigate('main');
    
    // Smooth scroll delay to ensure main view is mounted first if we are in admin mode
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, currentView === 'admin' ? 100 : 0);
  };

  return (
    <header
      id="header-giganet"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentView === 'admin'
          ? 'bg-[#070B19]/90 backdrop-blur-md border-b border-brand-purple/20 py-3 shadow-lg'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple to-brand-bright-blue shadow-lg shadow-brand-purple/20 overflow-hidden">
              <span className="font-display font-extrabold text-white text-xl tracking-tighter">G</span>
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
            </div>
            
            <div className="flex flex-col">
              <span className="font-display font-black text-2xl tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-brand-bright-blue">
                {config.nome_empresa}
              </span>
              <span className="text-[9px] font-mono tracking-widest text-brand-neon -mt-1 font-bold">FIBRA ÓPTICA</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          {currentView === 'main' ? (
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-medium text-slate-300 hover:text-brand-neon transition-colors relative group py-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-neon transition-all duration-300 group-hover:w-full"></span>
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => onNavigate('main')}
                className="text-sm font-medium text-slate-300 hover:text-brand-neon transition-colors"
              >
                ← Voltar para o Site Principal
              </button>
            </div>
          )}

          {/* Call to Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={() => onNavigate('admin')}
              className={`flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 ${
                currentView === 'admin'
                  ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30'
                  : 'text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 hover:bg-slate-800/50'
              }`}
            >
              <Landmark size={14} className="text-brand-bright-blue" />
              <span>Área Administrativa</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-bold text-white rounded-lg group bg-gradient-to-br from-brand-purple to-brand-neon group-hover:from-brand-purple group-hover:to-brand-neon hover:text-white focus:ring-2 focus:outline-none focus:ring-brand-purple/40 shadow-lg shadow-brand-purple/30"
            >
              <span className="relative px-4 py-2 transition-all ease-in duration-75 bg-brand-dark rounded-md group-hover:bg-opacity-0 flex items-center space-x-1">
                <span>Assinar Agora</span>
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => onNavigate('admin')}
              className={`p-2 rounded-lg ${currentView === 'admin' ? 'bg-brand-purple text-white' : 'text-slate-300 hover:text-white'}`}
              title="Área Administrativa"
            >
              <Landmark size={20} />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden animate-fade-in bg-[#090F24] border-b border-brand-purple/20 px-4 pt-4 pb-6 space-y-4">
          {currentView === 'main' && (
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-4 rounded-lg text-base font-semibold text-slate-300 hover:text-brand-neon hover:bg-slate-800/40 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          
          {currentView === 'admin' && (
            <button
              onClick={() => { setIsOpen(false); onNavigate('main'); }}
              className="w-full text-left py-3 px-4 rounded-lg text-base font-semibold text-slate-300 hover:text-brand-neon hover:bg-slate-800/40 transition-all"
            >
              ← Voltar para o Site Principal
            </button>
          )}

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => { setIsOpen(false); onNavigate('admin'); }}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-bold text-slate-300 border border-slate-700 bg-slate-800/30 hover:bg-slate-800/60"
            >
              <Landmark size={16} className="text-brand-bright-blue" />
              <span>Acessar Área Administrativa</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-bold bg-gradient-to-r from-brand-purple to-brand-bright-blue text-white shadow-lg shadow-brand-purple/30"
            >
              <span>Assinar Agora no WhatsApp</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

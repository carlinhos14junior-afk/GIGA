import { useState, useEffect } from 'react';
import { Menu, X, Phone, CheckCircle } from 'lucide-react';
import { SiteConfig } from '../types';
import Logo from './Logo';

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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da GIGATEL FIBER. Gostaria de mais informações!`
  )}`;

  const navItems = [
    { label: 'Início', href: '#inicio' },
    { label: 'Planos', href: '#planos' },
    { label: 'Vantagens', href: '#vantagens' },
    { label: 'Cobertura', href: '#cobertura' },
    { label: 'Contato', href: '#contato' },
  ];

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    onNavigate('main');
    
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, currentView === 'admin' ? 150 : 0);
  };

  const LogoComponent = () => <Logo size="md" />;

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-350 ${
        scrolled || currentView === 'admin'
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-205 shadow-md py-2.5'
          : 'bg-white/90 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand/Logo */}
          <div 
            onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="cursor-pointer"
          >
            <LogoComponent />
          </div>

          {/* Navigation - Centered and elegant */}
          {currentView === 'main' ? (
            <nav className="hidden lg:flex items-center space-x-7">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-xs font-bold text-slate-800 hover:text-brand-blue-royal transition-colors uppercase tracking-widest"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden lg:flex items-center">
              <button 
                onClick={() => onNavigate('main')}
                className="text-xs font-bold text-slate-500 hover:text-brand-blue-royal transition-colors uppercase tracking-wider"
              >
                ← Voltar para o Site Principal
              </button>
            </div>
          )}

          {/* Action Buttons (Header CTA) */}
          <div className="hidden md:flex items-center space-x-3.5">
            <button
              onClick={() => handleNavClick('#cobertura')}
              className="px-5 py-2.5 text-xs font-bold text-[#E30613] bg-white hover:bg-brand-red hover:text-white border border-[#E30613] rounded-lg shadow-sm transition-all duration-200"
            >
              Consultar Disponibilidade
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#0A2F8F] hover:bg-opacity-92 rounded-lg shadow-sm transition-all duration-200 flex items-center space-x-1.5"
            >
              <Phone size={13} className="text-white fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Responsive Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fade-in">
          {currentView === 'main' ? (
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-3 rounded-lg text-xs font-bold text-slate-800 hover:bg-brand-gray-light hover:text-brand-blue-royal transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => { setIsOpen(false); onNavigate('main'); }}
              className="w-full text-left py-3 px-3 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 transition-all uppercase"
            >
              ← Voltar para o Site Principal
            </button>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('#cobertura')}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-xs font-bold text-[#E30613] bg-white border border-[#E30613] hover:bg-brand-red hover:text-white transition-all shadow-sm"
            >
              <span>Consultar Disponibilidade</span>
            </button>

            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-xs font-bold bg-[#0A2F8F] hover:bg-opacity-90 text-white shadow-sm"
            >
              <Phone size={14} className="text-white fill-current" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

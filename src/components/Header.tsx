import { useState, useEffect } from 'react';
import { Menu, X, Phone, CheckCircle } from 'lucide-react';
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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const whatsAppLink = `https://wa.me/${config.whatsapp}?text=${encodeURIComponent(
    `Olá, tenho interesse nos planos de Internet Fibra da ${config.nome_empresa}. Gostaria de mais informações!`
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

  return (
    <header
      id="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || currentView === 'admin'
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm py-3'
          : 'bg-white/70 backdrop-blur-sm py-4 border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand/Logo */}
          <div 
            onClick={() => { onNavigate('main'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="flex items-center space-x-3 cursor-pointer group"
          >
            {config.logo_url ? (
              <img 
                src={config.logo_url} 
                alt={config.nome_empresa} 
                className="h-9 w-auto object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#0F172A] to-[#0284C7] shadow-sm text-white font-semibold text-xl tracking-tight">
                  G
                </div>
                <div className="flex flex-col">
                  <span className="font-display font-bold text-xl tracking-tight text-slate-900 leading-none">
                    {config.nome_empresa}
                  </span>
                  <span className="text-[10px] tracking-wider text-sky-600 font-bold uppercase mt-1 leading-none">
                    FIBRA ÓPTICA
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Navigation - Centered and elegant */}
          {currentView === 'main' ? (
            <nav className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-sm font-semibold text-slate-600 hover:text-sky-600 transition-colors uppercase tracking-wider text-xs"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          ) : (
            <div className="hidden md:flex items-center">
              <button 
                onClick={() => onNavigate('main')}
                className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
              >
                ← Voltar para o Site Principal
              </button>
            </div>
          )}

          {/* Action Buttons (Header CTA) */}
          <div className="hidden md:flex items-center space-x-3">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-100 rounded-lg border border-slate-350 transition-all flex items-center space-x-1.5"
            >
              <Phone size={14} className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleNavClick('#cobertura')}
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-500 hover:bg-emerald-600 rounded-lg shadow-sm transition-all flex items-center space-x-1"
            >
              <CheckCircle size={14} />
              <span>Consultar Disponibilidade</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center space-x-2 md:hidden">
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
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-fade-in">
          {currentView === 'main' ? (
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.href)}
                  className="text-left py-3 px-3 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:text-sky-600 transition-all"
                >
                  {item.label}
                </button>
              ))}
            </div>
          ) : (
            <button
              onClick={() => { setIsOpen(false); onNavigate('main'); }}
              className="w-full text-left py-3 px-3 rounded-lg text-sm font-bold text-slate-500 hover:bg-slate-50 transition-all"
            >
              ← Voltar para o Site Principal
            </button>
          )}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <a
              href={whatsAppLink}
              target="_blank"
              referrerPolicy="no-referrer"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-bold text-slate-700 border border-slate-200 hover:bg-slate-50"
            >
              <Phone size={16} className="text-emerald-500" />
              <span>WhatsApp</span>
            </a>

            <button
              onClick={() => handleNavClick('#cobertura')}
              className="flex items-center justify-center space-x-2 px-4 py-3 rounded-lg text-sm font-bold bg-emerald-500 hover:bg-emerald-600 text-white shadow-sm"
            >
              <CheckCircle size={16} />
              <span>Consultar Disponibilidade</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

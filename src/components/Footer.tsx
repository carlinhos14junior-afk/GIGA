import { useState } from 'react';
import { Mail, Phone, Lock, FileText, ArrowUp, MapPin } from 'lucide-react';
import { SiteConfig } from '../types';
import Logo from './Logo';

interface FooterProps {
  config: SiteConfig;
  onNavigate: (view: 'main' | 'admin') => void;
}

export default function Footer({ config, onNavigate }: FooterProps) {
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const formattedAddress = `${config.endereco}${config.bairro ? `, ${config.bairro}` : ''}${config.cidade ? `, ${config.cidade}` : ''}${config.estado ? ` - ${config.estado}` : ''}${config.cep ? ` - CEP ${config.cep}` : ''}`;

  return (
    <footer id="footer-giganet" className="relative bg-[#0A1F44] border-t border-white/5 pt-16 pb-12 text-slate-300 overflow-hidden">
      {/* Top highlight bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#0057FF] via-[#00AEEF] to-[#E53935]" />

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Core Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12 border-b border-white/5 pb-11">
          
          {/* Logo / Brand block */}
          <div className="flex flex-col space-y-4">
            <Logo size="md" />
            
            <p className="text-xs text-slate-300 leading-relaxed font-semibold">
              Conexões ultrarrápidas, 100% fibra óptica de ponta a ponta e suporte humanizado qualificado para você navegar, jogar e assistir sem travamentos.
            </p>

            {/* Social channels */}
            <div className="flex space-x-3 pt-2">
              {config.instagram && (
                <a
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg transition-colors text-xs font-semibold"
                >
                  Instagram
                </a>
              )}
              {config.facebook && (
                <a
                  href={`https://facebook.com/${config.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-white/10 hover:bg-white/20 border border-white/10 text-white rounded-lg transition-colors text-xs font-semibold"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="text-[#00AEEF] hover:text-white font-semibold transition-colors">Início</a>
              </li>
              <li>
                <a href="#planos" className="text-[#00AEEF] hover:text-white font-semibold transition-colors">Planos Fibra</a>
              </li>
              <li>
                <a href="#vantagens" className="text-[#00AEEF] hover:text-white font-semibold transition-colors">Diferenciais</a>
              </li>
              <li>
                <a href="#cobertura" className="text-[#00AEEF] hover:text-white font-semibold transition-colors">Consultar Cobertura</a>
              </li>
              <li>
                <a href="#faq" className="text-[#00AEEF] hover:text-white font-semibold transition-colors">Perguntas FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contato Central */}
          <div>
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider mb-4">Fale Conosco</h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center space-x-2">
                <Phone size={13} className="text-[#E53935] shrink-0" />
                <span className="font-semibold text-white">{config.telefone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={13} className="text-[#E53935] shrink-0" />
                <span className="break-all font-semibold text-white">{config.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin size={13} className="text-[#E53935] shrink-0 mt-0.5" />
                <span className="leading-relaxed font-semibold text-white">{formattedAddress}</span>
              </li>
            </ul>
          </div>

          {/* Corporate hours summary */}
          <div>
            <h4 className="font-display font-black text-xs text-white uppercase tracking-wider mb-4">{config.nome_empresa}</h4>
            <p className="text-xs text-slate-300 leading-relaxed mb-2 font-semibold">
              Sinal estável sem franquias de download para residências, comércios e corporações sob medida.
            </p>
            <p className="text-[11px] text-[#00AEEF] font-mono font-semibold">
              Suporte das 08h às 21h pelo WhatsApp Comercial {config.nome_empresa}.
            </p>
          </div>

        </div>

        {/* Bottom bar (CNPJ and discreet links) */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="text-center sm:text-left text-slate-400 font-medium">
            <p>© {currentYear} {config.nome_empresa}. Todos os direitos reservados.</p>
            <p className="mt-1 font-mono text-[10px]/none text-slate-500 font-semibold">CNPJ: 12.345.678/0001-99</p>
          </div>

          {/* Links e Modais triggers */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors text-[11px]"
            >
              Política de Privacidade
            </button>
            
            <button
              onClick={() => setActiveModal('terms')}
              className="text-slate-400 hover:text-white font-medium cursor-pointer transition-colors text-[11px]"
            >
              Termos de Uso
            </button>

            <button
              onClick={handleScrollToTop}
              title="Voltar ao Topo"
              className="p-2 bg-white/10 border border-white/10 rounded-lg text-slate-300 hover:text-white hover:border-white/20 transition-colors cursor-pointer"
            >
              <ArrowUp size={12} />
            </button>

            {/* Discreet Admin Link */}
            <button
              onClick={() => { onNavigate('admin'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              style={{ color: '#6889B3', fontSize: '10px' }}
              className="font-mono cursor-pointer transition-colors hover:text-white bg-transparent border-0 p-0 shadow-none outline-none leading-none select-none uppercase tracking-widest pl-2"
              title="Portal de Administração"
            >
              Admin
            </button>
          </div>

        </div>
      </div>

      {/* --- PRIVACY POLICY MODAL --- */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className="bg-white border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-6 font-semibold">
              <div className="flex items-center space-x-2 text-slate-800">
                <Lock size={18} className="text-emerald-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">Política de Privacidade</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-900 font-bold text-sm p-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-900">Última atualização: Junho de 2026</p>
              <p>
                A <strong>{config.nome_empresa}</strong> preza severamente pelo sigilo de suas informações de contato e endereço. Coletamos apenas as credenciais declaradamente enviadas pelos nossos formulários digitais de contato e consulta de cobertura.
              </p>
              <h4 className="font-bold text-slate-900 mt-4 border-l-2 border-emerald-500 pl-2">Utilização de Dados Cadastrais</h4>
              <p>
                Seus dados cadastrais serão usados unica e exclusivamente pela nossa equipe interna qualificada visando realizar simulações eletivas de sinal fibra ao seu logradouro pretendido, seguido do contato comercial personalizado feito pelo WhatsApp.
              </p>
              <h4 className="font-bold text-slate-900 mt-4 border-l-2 border-emerald-500 pl-2">LGPD e Proteção ao Consumidor</h4>
              <p>
                Seguimos fielmente os regulamentos e medidas estabelecidos pela Lei Geral de Proteção de Dados (LGPD) para assegurar que nenhum registro seja compartilhado, cedido ou leiloado comercialmente a terceiros operadores.
              </p>
              <p>
                Caso requeira a exclusão perpétua de seus dados do nosso repositório de leads, basta nos notificar por escrito.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TERMS OF USE MODAL --- */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/45 backdrop-blur-sm animate-fade-in text-slate-800">
          <div className="bg-white border border-slate-200 max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-3xl p-8 relative shadow-2xl">
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 mb-6 font-semibold">
              <div className="flex items-center space-x-2 text-slate-800">
                <FileText size={18} className="text-emerald-600" />
                <h3 className="font-display font-bold text-lg text-slate-900">Termos de Uso</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-slate-900 font-bold text-sm p-1.5 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed">
              <p className="font-bold text-slate-900">Última atualização: Junho de 2026</p>
              <p>
                Ao acessar este portal e simular disponibilidade técnica de internet para seu endereço, você concorda com as disposições a seguir regidas pela legislação nacional de telecomunicações.
              </p>
              <h4 className="font-bold text-slate-900 mt-4 border-l-2 border-emerald-500 pl-2">Disponibilidade e Fibra Física</h4>
              <p>
                Os resultados exibidos em nossa consulta de bairros representam apenas estimativas com base na malha pública em vigor. A instalação definitiva e concessão comercial dependem da aprovação de infraestrutura local física feita presencialmente por técnicos instaladores.
              </p>
              <h4 className="font-bold text-slate-900 mt-4 border-l-2 border-emerald-500 pl-2">Propriedade Intelectual</h4>
              <p>
                Todos os textos informativos, nomenclaturas de planos, logotipos, designs, códigos e estruturas contidas neste site pertencem legalmente à {config.nome_empresa}.
              </p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

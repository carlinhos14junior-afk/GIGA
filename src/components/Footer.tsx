import { useState } from 'react';
import { Mail, Phone, Landmark, Lock, HelpCircle, FileText, ArrowUp } from 'lucide-react';
import { SiteConfig } from '../types';

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

  return (
    <footer id="footer-giganet" className="relative bg-[#070B19] border-t border-slate-850/80 pt-16 pb-8 text-slate-300">
      
      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Logo / Brand block */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2">
              <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-brand-purple to-brand-bright-blue font-display font-black text-white text-base">
                G
              </div>
              <span className="font-display font-black text-xl text-white tracking-widest">{config.nome_empresa}</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Alta performance, suporte humanizado de verdade e 100% fibra óptica pura para conectar seu lar ou empresa com o futuro.
            </p>
            {/* Social channels */}
            <div className="flex space-x-3 pt-2">
              {config.instagram && (
                <a
                  href={`https://instagram.com/${config.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-brand-purple/20 border border-slate-800 hover:border-brand-purple/50 text-slate-450 hover:text-white rounded-lg transition-all text-xs font-mono font-bold"
                >
                  Instagram
                </a>
              )}
              {config.facebook && (
                <a
                  href={`https://facebook.com/${config.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-slate-900 hover:bg-brand-purple/20 border border-slate-800 hover:border-brand-purple/50 text-slate-450 hover:text-white rounded-lg transition-all text-xs font-mono font-bold"
                >
                  Facebook
                </a>
              )}
            </div>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Navegação</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#inicio" className="text-slate-400 hover:text-brand-neon transition-colors">Início</a>
              </li>
              <li>
                <a href="#planos" className="text-slate-400 hover:text-brand-neon transition-colors">Planos Fibra</a>
              </li>
              <li>
                <a href="#vantagens" className="text-slate-400 hover:text-brand-neon transition-colors">Nossos Diferenciais</a>
              </li>
              <li>
                <a href="#cobertura" className="text-slate-400 hover:text-brand-neon transition-colors">Consultar Cobertura</a>
              </li>
              <li>
                <a href="#faq" className="text-slate-400 hover:text-brand-neon transition-colors">Dúvidas FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contato Central */}
          <div>
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Central de Atendimento</h4>
            <ul className="space-y-3 text-xs text-slate-400">
              <li className="flex items-center space-x-2">
                <Phone size={14} className="text-brand-bright-blue shrink-0" />
                <span>{config.telefone}</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={14} className="text-brand-bright-blue shrink-0" />
                <span className="break-all">{config.email}</span>
              </li>
              <li className="flex items-start space-x-2">
                <landmark size={14} className="text-brand-bright-blue shrink-0 mt-0.5" />
                <span className="leading-relaxed">{config.endereco}</span>
              </li>
            </ul>
          </div>

          {/* Legal / Admin portal widget */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Portal do Cliente</h4>
            <p className="text-xs text-slate-400">
              Quer alterar as informações de contato, editar preços de planos ou ver leads? Acesse nossa área dedicada.
            </p>
            <button
              onClick={() => { onNavigate('admin'); window.scrollTo({ top: 30, behavior: 'smooth' }); }}
              className="flex items-center justify-center space-x-2 px-4 py-2.5 rounded-lg text-xs font-bold bg-slate-900 border border-slate-800 hover:border-brand-purple/40 text-slate-300 hover:text-white transition-all w-full"
            >
              <Landmark size={14} className="text-brand-bright-blue" />
              <span>Painel Administrativo Login</span>
            </button>
          </div>

        </div>

        {/* Bottom bar (CNPJ and links) */}
        <div className="pt-8 border-t border-slate-850/70 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          
          <div className="text-center sm:text-left text-slate-500">
            <p>© {currentYear} {config.nome_empresa}. Todos os direitos reservados.</p>
            <p className="mt-1 font-mono">CNPJ: 12.345.678/0001-99 (Editável no Painel de Admin)</p>
          </div>

          {/* Links e Modais triggers */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setActiveModal('privacy')}
              className="text-slate-500 hover:text-brand-bright-blue font-medium cursor-pointer transition-colors"
            >
              Política de Privacidade
            </button>
            <button
              onClick={() => setActiveModal('terms')}
              className="text-slate-500 hover:text-brand-bright-blue font-medium cursor-pointer transition-colors"
            >
              Termos de Uso
            </button>
            <button
              onClick={handleScrollToTop}
              title="Voltar ao Topo"
              className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-brand-bright-blue hover:text-brand-neon hover:border-brand-neon transition-colors"
            >
              <ArrowUp size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* --- POLITICA PRIVACIDADE MODAL --- */}
      {activeModal === 'privacy' && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0d142c] border border-slate-850 max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-3xl p-6 sm:p-8 relative shadow-2xl no-scrollbar">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center space-x-2 text-brand-bright-blue">
                <Lock size={18} />
                <h3 className="font-display font-bold text-lg text-white">Política de Privacidade</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white font-black text-lg p-1 px-2.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-bold text-brand-neon">Última atualização: Junho de 2026</p>
              <p>
                A <strong>{config.nome_empresa}</strong> dá extrema importância à privacidade de suas informações de contato e endereço. Coletamos apenas os dados declaradamente enviados pelo formulário de cobertura: seu nome completo, celular de contato (WhatsApp), CEP e os dados físicos de residência (rua, bairro e número).
              </p>
              <h4 className="font-bold text-white mt-4 border-l-2 border-brand-purple pl-2">Utilização dos Dados</h4>
              <p>
                Seus dados cadastrais serão usados unicamente pela nossa central de atendimento para verificar a viabilidade técnica e mapeamento correspondente de roteadores de fibra ao seu logradouro cadastrado, e para subsequente contato comercial autorizado via WhatsApp.
              </p>
              <h4 className="font-bold text-white mt-4 border-l-2 border-brand-purple pl-2">Armazenamento e Proteção</h4>
              <p>
                Seguimos procedimentos rígidos e em conformidade estrita com a LGPD (Lei Geral de Proteção de Dados) para salvaguardar e assegurar as informações coletadas, prevenindo o acesso não autorizado de terceiros ou o uso incorreto de dados.
              </p>
              <p>
                Caso deseje solicitar a total remoção ou descarte permanente de seu registro em nossas bases de dados, basta requerer isso ao nosso especialista a qualquer tempo por link eletrônico ou pelo WhatsApp comercial fornecido.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- TERMOS DE USO MODAL --- */}
      {activeModal === 'terms' && (
        <div className="fixed inset-0 z-55 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#0d142c] border border-slate-850 max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-3xl p-6 sm:p-8 relative shadow-2xl no-scrollbar">
            <div className="flex justify-between items-start pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center space-x-2 text-brand-bright-blue">
                <FileText size={18} />
                <h3 className="font-display font-bold text-lg text-white">Termos de Uso do Serviço</h3>
              </div>
              <button 
                onClick={() => setActiveModal(null)}
                className="text-slate-400 hover:text-white font-black text-lg p-1 px-2.5 rounded bg-slate-800"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p className="font-bold text-brand-neon">Última atualização: Junho de 2026</p>
              <p>
                Bem-vindo ao site institucional da <strong>{config.nome_empresa}</strong>. Ao acessar estas páginas e utilizar nossa consulta de cobertura ou solicitar atendimento, você declara plena anuência com as diretrizes listadas nestes termos.
              </p>
              <h4 className="font-bold text-white mt-4 border-l-2 border-brand-purple pl-2">Consulta de Viabilidade</h4>
              <p>
                A consulta e simulação de disponibilidade de rede óptica feitas por este portal configuram apenas uma pré-analise técnica primária informativa. A efetivação e instalação do link final de internet estão expressamente vinculadas à vistoria física real de nossos instaladores em campo, confirmando a viabilidade de cabos de fibra nos postes próximos.
              </p>
              <h4 className="font-bold text-white mt-4 border-l-2 border-brand-purple pl-2">Direitos Autorais</h4>
              <p>
                Todos os textos explicativos, nomes de marca, logomarcas, ícones personalizados e recursos de design codificados são propriedades reservadas da {config.nome_empresa}. Cópias não autorizadas de conteúdo para fins concorrenciais violam direitos amparados por leis civis federais.
              </p>
            </div>
          </div>
        </div>
      )}

    </footer>
  );
}

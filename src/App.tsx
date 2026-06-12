import { useState, useEffect } from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Planos from './components/Planos';
import CoberturaForm from './components/CoberturaForm';
import Vantagens from './components/Vantagens';
import SobreNos from './components/SobreNos';
import Depoimentos from './components/Depoimentos';
import FAQ from './components/FAQ';
import Contato from './components/Contato';
import Footer from './components/Footer';
import AdminPanel from './components/AdminPanel';
import Logo from './components/Logo';
import { getSiteConfig, getPlanos } from './lib/supabase';
import { SiteConfig, Plano } from './types';

export default function App() {
  const [view, setView] = useState<'main' | 'admin'>('main');
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [planosList, setPlanosList] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  // Load site variables
  const loadData = async () => {
    try {
      const cfg = await getSiteConfig();
      setSiteConfig(cfg);

      const pls = await getPlanos();
      setPlanosList(pls);
    } catch (e) {
      console.error('Falha ao carregar informações de banco:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center">
          {/* Elegant modern GIGATEL FIBER loader */}
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" className="animate-pulse" />
          </div>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-8 uppercase animate-pulse font-mono">
            GIGATEL FIBER • Conectando você ao mundo...
          </p>
        </div>
      </div>
    );
  }

  // Backup fallback config if none somehow loaded
  const activeConfig = siteConfig || {
    nome_empresa: 'GIGATEL FIBER',
    logo_url: '',
    whatsapp: '5511910050121',
    telefone: '(11) 91005-0121',
    email: 'contato@gigatelfiber.com.br',
    endereco: 'Rua Antônio Ferraciolli, 331',
    bairro: 'Jardim Catarina',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03910-070',
    tempo_carro: '15 min de carro',
    tempo_moto: '5 min de moto',
    instagram: 'gigatelfiberofc',
    facebook: 'gigatelfiberofc'
  };

  const floatWhatsappClean = activeConfig.whatsapp ? activeConfig.whatsapp.replace(/\D/g, '') : '5511910050121';
  const floatInstagramUser = activeConfig.instagram ? activeConfig.instagram.replace('@', '') : 'gigatelfiberofc';
  const floatInstagramLabel = `@${floatInstagramUser}`;
  const floatWhatsappMsg = `Olá ${activeConfig.nome_empresa}! Quero contratar internet fibra ultraveloz agora.`;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#005BFF]/35 selection:text-white bg-slate-950">
      
      {/* Sticky Navigation Header */}
      <Header 
        config={activeConfig} 
        onNavigate={(newView) => setView(newView)} 
        currentView={view}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {view === 'main' ? (
          <div>
            {/* 1. Hero visual section with interactive CTA */}
            <Hero config={activeConfig} />
            
            {/* 2. Fiber plans cards dynamic grid */}
            <Planos config={activeConfig} planos={planosList} />
            
            {/* 3. Coverage search inputs module (saving leads to Supabase) */}
            <CoberturaForm />

            {/* 4. Core corporate differential advantages */}
            <Vantagens />

            {/* 5. Company description block */}
            <SobreNos config={activeConfig} />

            {/* 6. Fictional real customer testimonies */}
            <Depoimentos />

            {/* 7. Contract and routers accordion FAQ */}
            <FAQ />

            {/* 8. Full interactive contact detail indicators */}
            <Contato config={activeConfig} />
          </div>
        ) : (
          <div className="animate-fade-in">
            {/* Real CRM & settings administrative board */}
            <AdminPanel 
              onConfigChange={loadData} 
              onPlanosChange={loadData} 
            />
          </div>
        )}
      </main>

      {/* Global Interactive footer */}
      <Footer config={activeConfig} onNavigate={(newView) => setView(newView)} />

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center space-y-3">
        {/* Instagram Floater */}
        <a
          href={`https://instagram.com/${floatInstagramUser}`}
          target="_blank"
          rel="noopener noreferrer"
          title={`Instagram ${activeConfig.nome_empresa}`}
          className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:rotate-6 active:scale-95"
        >
          <Instagram size={20} className="stroke-[2.2]" />
          <span className="absolute right-14 scale-0 group-hover:scale-100 transition-all duration-200 bg-slate-950 text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap tracking-wide uppercase border border-white/10">
            {floatInstagramLabel}
          </span>
        </a>

        {/* WhatsApp Floater with pulse badge */}
        <a
          href={`https://wa.me/${floatWhatsappClean}?text=${encodeURIComponent(floatWhatsappMsg)}`}
          target="_blank"
          rel="noopener noreferrer"
          title="Fale Conosco no WhatsApp"
          className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-red-500 border border-white"></span>
          </span>
          <MessageCircle size={24} className="stroke-[2.2] fill-current" />
          <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 bg-[#25D366] text-white text-[10px] font-bold py-1.5 px-2.5 rounded-lg shadow-xl whitespace-nowrap tracking-wide uppercase">
            WhatsApp Online
          </span>
        </a>
      </div>

    </div>
  );
}

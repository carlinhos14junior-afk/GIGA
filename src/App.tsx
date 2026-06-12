import { useState, useEffect } from 'react';
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
    whatsapp: '5511999999999',
    telefone: '(11) 4004-9999',
    email: 'contato@gigatelfibra.com.br',
    endereco: 'Av. Paulista, 1000 - Bela Vista - SP, CEP 01311-100',
    instagram: 'gigatel_fibra',
    facebook: 'gigatelfibra'
  };

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-brand-purple/35 selection:text-white">
      
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

    </div>
  );
}

import { useState, useEffect } from 'react';
import { MessageCircle, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Planos from '../components/Planos';
import SpeedTest from '../components/SpeedTest';
import Vantagens from '../components/Vantagens';
import SobreNos from '../components/SobreNos';
import Depoimentos from '../components/Depoimentos';
import FAQ from '../components/FAQ';
import Contato from '../components/Contato';
import Footer from '../components/Footer';
import Logo from '../components/Logo';
import { getSiteConfig, getPlanos, getBanners, getEmpresa, getSEO, isRealSupabase, supabase, getBrandSettings } from '../lib/supabase';
import { SiteConfig, Plano, Banner, BrandSettings } from '../types';

export default function Home() {
  const navigate = useNavigate();
  const [siteConfig, setSiteConfig] = useState<SiteConfig | null>(null);
  const [planosList, setPlanosList] = useState<Plano[]>([]);
  const [bannersList, setBannersList] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  // Load site variables
  const loadData = async () => {
    try {
      setLoading(true);
      const cfg = await getSiteConfig();
      let emp = null;
      let brands: BrandSettings | null = null;

      try {
        // Parallel fetch for company and brand settings
        const [empData, brandData] = await Promise.all([
          getEmpresa(),
          getBrandSettings()
        ]);
        emp = empData;
        brands = brandData;
      } catch (err) {
        console.warn('Could not load company or brand info from database:', err);
      }

      // Merge all configuration sources
      const mergedConfig: SiteConfig = {
        ...cfg,
        ...(emp ? {
          nome_empresa: emp.nome_empresa,
          telefone: emp.telefone,
          whatsapp: emp.whatsapp,
          email: emp.email,
          endereco: emp.endereco,
          numero: emp.numero,
          bairro: emp.bairro,
          cidade: emp.cidade,
          estado: emp.estado,
          cep: emp.cep,
          horario_funcionamento: emp.horario_funcionamento,
          cnpj: emp.cnpj,
          instagram: emp.instagram,
          facebook: emp.facebook,
        } : {}),
        ...(brands ? {
          logo_url: brands.logo_url || cfg.logo_url,
          logo_white_url: brands.logo_white_url || cfg.logo_white_url,
          logo_footer_url: brands.logo_footer_url || cfg.logo_footer_url,
          logo_mobile_url: brands.logo_mobile_url || cfg.logo_mobile_url,
          favicon_url: brands.favicon_url || cfg.favicon_url
        } : {})
      };
      
      setSiteConfig(mergedConfig);

      let [pls, bans] = await Promise.all([
        getPlanos(),
        getBanners()
      ]);

      const hasFlyerPromo = (pls || []).some(p => p.velocidade === '600 MEGA');
      if (!hasFlyerPromo && isRealSupabase && supabase) {
        try {
          console.log('Sincronizando novos planos dos folhetos com o Supabase...');
          // Exclui planos antigos/stale se houverem
          if (pls && pls.length > 0) {
            await Promise.all(pls.map(p => supabase.from('planos').delete().eq('id', p.id)));
          }
          
          const plansToSeed = [
            {
              nome: 'GIGA START 100',
              velocidade: '100 MEGA',
              preco: 69.99,
              detalhes: 'Internet Fibra de alta qualidade para navegar com total economia.',
              beneficios: ['Canais abertos e fechados', 'Internet 100% Fibra Óptica', 'Roteador Wi-Fi Incluso', 'Redes Sociais e e-mails', 'Instalação Grátis', 'Garantia Gigatel Fiber'],
              destaque: false,
              ativo: true,
              ordem: 1
            },
            {
              nome: 'GIGA AJUSTADO 600',
              velocidade: '600 MEGA',
              preco: 70.00,
              detalhes: 'Promoção Marquee Flyer! Sabemos que mudanças geram gastos, por isso a Gigatel moldou este super plano para você.',
              beneficios: ['+ 110 Canais de TV', 'Internet 100% Fibra Óptica', 'Super Estabilidade & Games', 'Roteador Gigabit Wi-Fi', 'Instalação Residencial Grátis', 'Suporte Próprio 24h'],
              destaque: true,
              ativo: true,
              ordem: 2
            },
            {
              nome: 'GIGA SMART 200',
              velocidade: '200 MEGA',
              preco: 79.90,
              detalhes: 'Velocidade excelente para streaming de vídeos e consumo multidevice leve.',
              beneficios: ['Canais abertos e fechados', 'Internet 100% Fibra Óptica', 'Roteador Wi-Fi Incluso', 'Vídeos e Playlists HD', 'Instalação Grátis', 'Garantia Gigatel Fiber'],
              destaque: false,
              ativo: true,
              ordem: 3
            },
            {
              nome: 'GIGA MAIS 300',
              velocidade: '300 MEGA',
              preco: 89.90,
              detalhes: 'Conexão robusta e veloz para múltiplos dispositivos simultâneos.',
              beneficios: ['Canais abertos e fechados', 'Internet 100% Fibra Óptica', 'Roteador Gigabit Wi-Fi', 'Jogos Online e Downloads', 'Instalação Grátis', 'Garantia Gigatel Fiber'],
              destaque: false,
              ativo: true,
              ordem: 4
            },
            {
              nome: 'GIGA ULTRA 500',
              velocidade: '500 MEGA',
              preco: 99.90,
              detalhes: 'Performance profissional para trabalho, estudo e lazer em alto nível.',
              beneficios: ['Canais abertos e fechados', 'Internet 100% Fibra Óptica', 'Roteador Bi-Band Gigabit', 'Streaming 4K e Home Office', 'Instalação Grátis', 'Garantia Gigatel Fiber'],
              destaque: false,
              ativo: true,
              ordem: 5
            },
            {
              nome: 'GIGA SUPREMO 800',
              velocidade: '800 MEGA',
              preco: 109.90,
              detalhes: 'O plano topo de linha para quem deseja a menor latência e maior vazão.',
              beneficios: ['Canais abertos e fechados', 'Internet 100% Fibra Óptica', 'Roteador Premium Wi-Fi', 'Descargas Instantâneas', 'Instalação Premium Grátis', 'Suporte VIP Prioritário'],
              destaque: false,
              ativo: true,
              ordem: 6
            }
          ];

          await supabase.from('planos').insert(plansToSeed);
          pls = await getPlanos();
        } catch (seedErr) {
          console.error('Falha ao sincronizar planos no Supabase:', seedErr);
        }
      }

      setPlanosList(pls);
      setBannersList(bans);
    } catch (e) {
      console.error('Falha ao carregar informações de banco:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Sync Favicon
  useEffect(() => {
    if (siteConfig?.favicon_url) {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.getElementsByTagName('head')[0].appendChild(link);
      }
      link.href = siteConfig.favicon_url;
    }
  }, [siteConfig?.favicon_url]);

  // Sync Open Graph & SEO Tags
  useEffect(() => {
    if (!siteConfig) return;

    const updateSEO = async () => {
      try {
        const seo = await getSEO();
        if (seo && seo.status === 'ativo') {
          document.title = seo.title;
          updateMetaTag('description', seo.meta_description, 'name');
          updateMetaTag('keywords', seo.keywords, 'name');
          updateMetaTag('og:title', seo.open_graph_title);
          updateMetaTag('og:description', seo.open_graph_description);
        } else {
          document.title = siteConfig.nome_empresa;
        }
      } catch (err) {
        document.title = siteConfig.nome_empresa;
      }
    };

    updateSEO();

    function updateMetaTag(property: string, content: string, attr: 'property' | 'name' = 'property') {
      let tag = document.querySelector(`meta[${attr}='${property}']`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attr, property);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    }

    if (siteConfig.logo_url) {
      updateMetaTag('og:image', siteConfig.logo_url);
      updateMetaTag('twitter:image', siteConfig.logo_url, 'name');
    }
  }, [siteConfig]);

  // Supabase Realtime Listeners for instant updates
  useEffect(() => {
    if (!isRealSupabase || !supabase) return;

    const channels = [
      supabase.channel('public:configuracoes_site').on('postgres_changes', { event: '*', schema: 'public', table: 'configuracoes_site' }, () => loadData()),
      supabase.channel('public:empresa').on('postgres_changes', { event: '*', schema: 'public', table: 'empresa' }, () => loadData()),
      supabase.channel('public:planos').on('postgres_changes', { event: '*', schema: 'public', table: 'planos' }, () => loadData()),
      supabase.channel('public:banners').on('postgres_changes', { event: '*', schema: 'public', table: 'banners' }, () => loadData()),
      supabase.channel('public:seo').on('postgres_changes', { event: '*', schema: 'public', table: 'seo' }, () => loadData()),
      supabase.channel('public:brand_settings').on('postgres_changes', { event: '*', schema: 'public', table: 'brand_settings' }, () => loadData())
    ];

    channels.forEach(channel => channel.subscribe());

    return () => {
      channels.forEach(channel => supabase.removeChannel(channel));
    };
  }, []);

  const handleNavigate = (newView: 'main' | 'admin') => {
    if (newView === 'admin') {
      navigate('/admin');
    } else {
      navigate('/');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="flex flex-col items-center">
          <div className="relative transform hover:scale-105 transition-transform duration-300">
            <Logo size="lg" className="animate-pulse" logoUrl={siteConfig?.logo_url} />
          </div>
          <p className="text-[11px] font-bold text-slate-400 tracking-widest mt-8 uppercase animate-pulse font-mono">
            GIGATEL • Conectando você ao mundo...
          </p>
        </div>
      </div>
    );
  }

  const activeConfig = siteConfig || {
    nome_empresa: 'GIGATEL',
    logo_url: '',
    whatsapp: '5511910050121',
    telefone: '(11) 91005-0121',
    email: 'contato@gigatel.com.br',
    endereco: 'Rua Antônio Ferraciolli, 331',
    bairro: 'Jardim Catarina',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03910-070',
    tempo_carro: '15 min de carro',
    tempo_moto: '5 min de moto',
    instagram: 'gigatelofc',
    facebook: 'gigatelofc'
  };

  const floatWhatsappClean = activeConfig.whatsapp ? activeConfig.whatsapp.replace(/\D/g, '') : '5511910050121';
  const floatInstagramUser = activeConfig.instagram ? activeConfig.instagram.replace('@', '') : 'gigatelofc';
  const floatInstagramLabel = `@${floatInstagramUser}`;
  const floatWhatsappMsg = `Olá ${activeConfig.nome_empresa}! Quero contratar internet fibra ultraveloz agora.`;

  return (
    <div className="min-h-screen flex flex-col justify-between selection:bg-[#005BFF]/15 selection:text-[#005BFF] bg-white text-slate-900">
      
      {/* Sticky Navigation Header */}
      <Header 
        config={activeConfig} 
        onNavigate={handleNavigate} 
        currentView="main"
      />

      {/* Main View */}
      <main className="flex-grow">
        <div>
          {/* 1. Hero visual section with interactive CTA */}
          <Hero config={activeConfig} banners={bannersList} />
          
          {/* 2. Fiber plans cards dynamic grid */}
          <Planos config={activeConfig} planos={planosList} />
          
          {/* Speed Test Widget */}
          <SpeedTest />
          
          {/* 4. Core corporate differential advantages */}
          <Vantagens config={activeConfig} />

          {/* 5. Company description block */}
          <SobreNos config={activeConfig} />

          {/* 6. Fictional real customer testimonies */}
          <Depoimentos config={activeConfig} />

          {/* 7. Contract and routers accordion FAQ */}
          <FAQ config={activeConfig} />

          {/* 8. Full interactive contact detail indicators */}
          <Contato config={activeConfig} />
        </div>
      </main>

      {/* Global Interactive footer */}
      <div className="w-full h-80 my-8">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3656.321867140954!2d-46.50550478546522!3d-23.59011918466657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce678a1c977f6b%3A0x6b4fb6c123ea3d71!2sRua%20Ant%C3%B4nio%20Ferraciolli%2C%20331%20-%20Jardim%20Catarina%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2003910-070!5e0!3m2!1spt-BR!2sbr!4v1718816656781!5m2!1spt-BR!2sbr" 
          width="100%" 
          height="100%" 
          className="border-0 shadow-lg rounded-lg" 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
      <Footer config={activeConfig} onNavigate={handleNavigate} />

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

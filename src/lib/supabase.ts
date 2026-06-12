import { createClient } from '@supabase/supabase-js';
import { 
  SiteConfig, Plano, Lead, Usuario, Banner, 
  Empresa, RedesSociais, CidadeCobertura, SEOConfig, UploadMedia,
  BrandSettings
} from '../types';

// Support both NEXT_PUBLIC_ styles as well as VITE_ styles
const supabaseUrl = (import.meta as any).env.NEXT_PUBLIC_SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Detect if we have real credentials
export const isRealSupabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && !supabaseUrl.includes('placeholder');

export const supabase = isRealSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initial Seeds
const DEFAULT_CONFIG: SiteConfig = {
  nome_empresa: 'GIGATEL FIBER',
  logo_url: '',
  logo_white_url: '',
  logo_footer_url: '',
  logo_mobile_url: '',
  favicon_url: '',
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
  facebook: 'gigatelfiberofc',
  
  // Hero fallbacks
  hero_titulo: 'INTERNET FIBRA ÓPTICA\nULTRARRÁPIDA',
  hero_subtitulo: 'Mais velocidade.\nMais estabilidade.\nMais tecnologia para sua casa.',
  hero_texto_botao: 'Contratar Agora',
  hero_link_botao: '#planos',

  // Advantages / Benefits fallbacks
  vantagens_titulo: 'POR QUE ESCOLHER A',
  vantagens_subtitulo: 'Unimos excelente infraestrutura tecnológica de fibra óptica com pós-venda humanizado de altíssima velocidade.',
  vantagens_lista_json: JSON.stringify([
    { titulo: 'Fibra Óptica de Ponta', descricao: 'Conexão 100% fibra óptica FTTH diretamente dentro do seu roteador, minimizando perdas de sinal e atrasos.' },
    { titulo: 'Instalação Rápida', descricao: 'Nossa equipe técnica qualificada realiza a implantação de forma ágil e segura sem complicações na sua casa.' },
    { titulo: 'Suporte Especializado', descricao: 'Central técnica qualificada com analistas prontos para monitorar e manter sua estabilidade 24 horas por dia.' },
    { titulo: 'Alta Estabilidade', descricao: 'Navegue sem oscilações climáticas ou gargalos de horário de pico graças à nossa rota de alta capacidade.' },
    { titulo: 'Atendimento Humanizado', descricao: 'Esqueça robôs chatos. Fale direto com profissionais paulistanos focados em resolver o seu problema em minutos.' },
    { titulo: 'Tecnologia de Ponta', descricao: 'Equipamentos de rede de última geração e roteadores dual band inteligentes inclusos na sua assinatura.' }
  ]),

  // Sobre nós fallbacks
  sobre_titulo_tag: 'Sobre Nós',
  sobre_titulo: 'CONECTANDO PESSOAS AO QUE \nREALMENTE IMPORTA',
  sobre_destaque: 'A GIGATEL FIBER nasceu para entregar internet de qualidade real, estabilidade extrema e atendimento próximo. Nosso compromisso inabalável é conectar famílias e empresas com tecnologia de ponta e suporte eficiente.',
  sobre_descricao: 'Trabalhamos incansavelmente para que nossos clientes tenham uma experiência de navegação livre de travamentos ou de atendimentos comerciais demorados. Acreditamos que a conectividade premium deve vir acompanhada por relações de total respeito e rapidez. Por isso, investimos em redes robustas e preparamos equipes capacitadas prontas para te responder imediatamente.',
  sobre_proposito_titulo: 'Nosso Propósito',
  sobre_proposito_desc: 'Garantir estabilidade real que potencialize o crescimento pessoal e digital de cada usuário.',
  sobre_valor_titulo: 'Principal Valor',
  sobre_valor_desc: 'Conexão 100% fibra de ponta a ponta construída sobre transparência, clareza e respeito absoluto aos prazos.',
  sobre_imagem_url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',

  // Contato fallbacks
  contato_titulo: 'PRONTO PARA NAVEGAR \nNA ULTRA VELOCIDADE?',
  contato_subtitulo: 'CONECTE-SE AGORA',
  contato_descricao: 'Fale hoje mesmo com um consultor da GIGATEL FIBER e garanta instalação prioritária qualificada em seu logradouro. Não sofra mais com quedas de sinal ou uploads lentos! Estabilidade real está aqui.',
  contato_legal: '* Todas as suas conversações e simulações são confidenciais e regidas conforme a Lei Geral de Proteção de Dados (LGPD) garantindo criptografia ponta a ponta.',

  // Footer fallbacks
  footer_titulo: 'Navegação',
  footer_descricao: 'Conexões ultrarrápidas, 100% fibra óptica de ponta a ponta e suporte humanizado qualificado para você navegar, jogar e assistir sem travamentos.',
  footer_endereco: 'Rua Antônio Ferraciolli, 331, Jardim Catarina, São Paulo - SP',
  footer_telefone: '(11) 91005-0121',
  footer_whatsapp: '5511910050121',
  footer_email: 'contato@gigatelfiber.com.br',
  footer_instagram: 'gigatelfiberofc',
  footer_facebook: 'gigatelfiberofc',
  footer_links_rapidos: 'Início: #inicio\nPlanos: #planos\nDiferenciais: #vantagens\nCobertura: #cobertura\nFAQ: #faq',
  footer_copyright: 'Todos os direitos reservados.',
  footer_cnpj: '45.182.293/0001-90',
  footer_horario: 'Suporte das 08h às 21h pelo WhatsApp Comercial.',
  footer_texto_legal: 'Sinal estável sem franquias de download para residências, comércios e corporações sob medida.'
};

const DEFAULT_PLANOS: Plano[] = [
  {
    id: '1',
    nome: 'Plano 500 Mega',
    velocidade: '500 MEGA',
    preco: 99.90,
    beneficios: [
      '100% Fibra Óptica',
      'Wi-Fi Incluso',
      'Download ilimitado',
      'Suporte Técnico',
      'Ideal para sua casa'
    ],
    destaque: false,
    ativo: true,
    created_at: new Date().toISOString(),
    status: 'ativo'
  },
  {
    id: '2',
    nome: 'Plano 800 Mega',
    velocidade: '800 MEGA',
    preco: 129.90,
    beneficios: [
      '100% Fibra Óptica',
      'Wi-Fi Incluso',
      'Download ilimitado',
      'Suporte Técnico',
      'Ideal para casa e empresa'
    ],
    destaque: true,
    ativo: true,
    created_at: new Date().toISOString(),
    status: 'ativo'
  }
];

const DEFAULT_BANNERS: Banner[] = [
  {
    id: '1',
    titulo: 'INTERNET FIBRA ÓPTICA ULTRARRÁPIDA',
    subtitulo: 'Mais velocidade. Mais estabilidade. Mais tecnologia para sua casa.',
    texto_botao: 'Contratar Agora',
    link_botao: '#planos',
    imagem_desktop: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200',
    imagem_mobile: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=600',
    ordem: 1,
    status: 'ativo',
    created_at: new Date().toISOString()
  }
];

const DEFAULT_EMPRESA: Empresa = {
  nome_empresa: 'GIGATEL FIBER',
  telefone: '(11) 91005-0121',
  whatsapp: '5511910050121',
  email: 'contato@gigatelfiber.com.br',
  endereco: 'Rua Antônio Ferraciolli',
  numero: '331',
  bairro: 'Jardim Catarina',
  cidade: 'São Paulo',
  estado: 'SP',
  cep: '03910-070',
  latitude: '-23.5505',
  longitude: '-46.6333',
  horario_funcionamento: 'Segunda a Sexta: 08h às 20h, Sábado: 08h às 14h',
  status: 'ativo',
  cnpj: '45.182.293/0001-90',
  instagram: 'gigatelfiberofc',
  facebook: 'gigatelfiberofc',
  logo_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=200',
  logo_white_url: '',
  logo_footer_url: '',
  logo_mobile_url: '',
  favicon_url: '',
  created_at: new Date().toISOString()
};

const DEFAULT_REDES_SOCIAIS: RedesSociais = {
  instagram: 'gigatelfiberofc',
  facebook: 'gigatelfiberofc',
  youtube: 'gigatelfiberofc',
  tiktok: 'gigatelfiberofc',
  linkedin: 'gigatelfiberofc',
  status: 'ativo',
  created_at: new Date().toISOString()
};

const DEFAULT_SEO: SEOConfig = {
  title: 'GIGATEL FIBER | Internet Fibra Óptica Ultraveloz de Alta Performance',
  meta_description: 'Navegue em alta velocidade com a fibra óptica premium GIGATEL. Planos residenciais e corporativos sem travamentos com Wi-Fi inteligente incluso.',
  keywords: 'internet fibra, gigatel, fibra optica sp, internet residencial, wifi dual band',
  open_graph_title: 'GIGATEL FIBER - Conectando você ao que realmente importa',
  open_graph_description: 'Navegue em alta velocidade com a fibra óptica premium da GIGATEL.',
  imagem_compartilhamento: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
  status: 'ativo',
  created_at: new Date().toISOString()
};

const DEFAULT_CIDADES_COBERTURA: CidadeCobertura[] = [
  { id: '1', nome: 'São Paulo', estado: 'SP', status: 'ativo', created_at: new Date().toISOString() },
  { id: '2', nome: 'Guarulhos', estado: 'SP', status: 'ativo', created_at: new Date().toISOString() },
  { id: '3', nome: 'Santo André', estado: 'SP', status: 'ativo', created_at: new Date().toISOString() },
  { id: '4', nome: 'São Bernardo do Campo', estado: 'SP', status: 'ativo', created_at: new Date().toISOString() }
];

const DEFAULT_UPLOADS: UploadMedia[] = [
  {
    id: '1',
    nome: 'avatar-user.png',
    url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
    tamanho: '12 KB',
    tipo: 'image/png',
    status: 'ativo',
    created_at: new Date().toISOString()
  },
  {
    id: '2',
    nome: 'banner-hero-fiber.jpg',
    url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200',
    tamanho: '143 KB',
    tipo: 'image/jpeg',
    status: 'ativo',
    created_at: new Date().toISOString()
  }
];

const DEFAULT_USUARIOS: Usuario[] = [
  {
    id: 'admin-user-id',
    nome: 'Administrador GIGATEL',
    email: 'admin@gigatel.com.br',
    perfil: 'admin',
    nivel: 'Administrador',
    status: 'ativo',
    created_at: new Date().toISOString()
  }
];

const DEFAULT_BRAND_SETTINGS: BrandSettings = {
  logo_url: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=200',
  logo_white_url: '',
  logo_footer_url: '',
  logo_mobile_url: '',
  favicon_url: '',
  created_at: new Date().toISOString()
};

// Helper to use Local Storage
const getLocal = <T>(key: string, backup: T): T => {
  const data = localStorage.getItem(key);
  if (!data) {
    localStorage.setItem(key, JSON.stringify(backup));
    return backup;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return backup;
  }
};

const setLocal = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data));
};

// Update last action key to track update metrics
const updateTimestamp = () => {
  localStorage.setItem('giganet_last_update', new Date().toLocaleString('pt-BR'));
};

export function getLastUpdate(): string {
  return localStorage.getItem('giganet_last_update') || new Date().toLocaleString('pt-BR');
}

// --- SITE CONFIG ---
export async function getSiteConfig(forceRefresh = false): Promise<SiteConfig> {
  if (isRealSupabase && supabase) {
    try {
      // Use a query to bypass some cache layers if needed, though supabase-js usually doesn't cache
      const { data, error } = await supabase
        .from('configuracoes_site')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (data) return data;
      
      const { data: inserted, error: insError } = await supabase
        .from('configuracoes_site')
        .insert([DEFAULT_CONFIG])
        .select()
        .single();
      
      if (insError) throw insError;
      return inserted;
    } catch (e) {
      console.warn('Fallback settings logic active:', e);
      return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
    }
  } else {
    return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data: existing } = await supabase.from('configuracoes_site').select('*').limit(1).maybeSingle();
      let result;
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('configuracoes_site')
          .update(config)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('configuracoes_site')
          .insert([config])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      console.error('Supabase fallback configured.', e);
      setLocal('giganet_site_config', config);
      return config;
    }
  } else {
    setLocal('giganet_site_config', config);
    return config;
  }
}

// --- BANNERS ---
export async function getBanners(force = false): Promise<Banner[]> {
  if (isRealSupabase && supabase) {
    try {
      let query = supabase
        .from('banners')
        .select('*')
        .eq('status', 'ativo');
      
      if (force) {
        // Dummy filter to avoid potential caches
        query = query.neq('id', '00000000-0000-0000-0000-000000000000');
      }

      const { data, error } = await query.order('ordem', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS).filter(b => b.status === 'ativo');
    }
  } else {
    return getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS).filter(b => b.status === 'ativo');
  }
}

export async function saveBanner(banner: Omit<Banner, 'id'> & { id?: string | number }): Promise<Banner> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      let result;
      const clean = { ...banner, updated_at: new Date().toISOString() };
      if (banner.id && String(banner.id).length > 2) {
        const { data, error } = await supabase
          .from('banners')
          .update(clean)
          .eq('id', banner.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('banners')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      const list = getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
      let updated: Banner;
      if (banner.id) {
        updated = { ...banner, id: banner.id } as Banner;
        const index = list.findIndex(item => String(item.id) === String(banner.id));
        if (index > -1) list[index] = updated;
        else list.push(updated);
      } else {
        updated = { ...banner, id: Date.now().toString(), created_at: new Date().toISOString() } as Banner;
        list.push(updated);
      }
      setLocal('giganet_banners', list);
      return updated;
    }
  } else {
    const list = getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
    let updated: Banner;
    if (banner.id) {
      updated = { ...banner, id: banner.id } as Banner;
      const index = list.findIndex(item => String(item.id) === String(banner.id));
      if (index > -1) list[index] = updated;
      else list.push(updated);
    } else {
      updated = { ...banner, id: Date.now().toString(), created_at: new Date().toISOString() } as Banner;
      list.push(updated);
    }
    setLocal('giganet_banners', list);
    return updated;
  }
}

export async function deleteBanner(id: string | number): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('banners').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      const list = getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
      setLocal('giganet_banners', list.filter(item => String(item.id) !== String(id)));
    }
  } else {
    const list = getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
    setLocal('giganet_banners', list.filter(item => String(item.id) !== String(id)));
  }
}

// --- DADOS DA EMPRESA ---
export async function getEmpresa(): Promise<Empresa> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('empresa').select('*').limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data;
      return DEFAULT_EMPRESA;
    } catch (e) {
      return getLocal<Empresa>('giganet_empresa', DEFAULT_EMPRESA);
    }
  } else {
    return getLocal<Empresa>('giganet_empresa', DEFAULT_EMPRESA);
  }
}

export async function saveEmpresa(empresa: Empresa): Promise<Empresa> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data: existing } = await supabase.from('empresa').select('*').limit(1).maybeSingle();
      let result;
      const clean = { ...empresa, updated_at: new Date().toISOString() };
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('empresa')
          .update(clean)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('empresa')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      setLocal('giganet_empresa', empresa);
      return empresa;
    }
  } else {
    setLocal('giganet_empresa', empresa);
    return empresa;
  }
}

// --- REDES SOCIAIS ---
export async function getRedesSociais(): Promise<RedesSociais> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('redes_sociais').select('*').limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data;
      return DEFAULT_REDES_SOCIAIS;
    } catch (e) {
      return getLocal<RedesSociais>('giganet_redes_sociais', DEFAULT_REDES_SOCIAIS);
    }
  } else {
    return getLocal<RedesSociais>('giganet_redes_sociais', DEFAULT_REDES_SOCIAIS);
  }
}

export async function saveRedesSociais(redes: RedesSociais): Promise<RedesSociais> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data: existing } = await supabase.from('redes_sociais').select('*').limit(1).maybeSingle();
      let result;
      const clean = { ...redes, updated_at: new Date().toISOString() };
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('redes_sociais')
          .update(clean)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('redes_sociais')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      setLocal('giganet_redes_sociais', redes);
      return redes;
    }
  } else {
    setLocal('giganet_redes_sociais', redes);
    return redes;
  }
}

// --- SEO CONFIG ---
export async function getSEO(): Promise<SEOConfig> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('seo').select('*').limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data;
      return DEFAULT_SEO;
    } catch (e) {
      return getLocal<SEOConfig>('giganet_seo', DEFAULT_SEO);
    }
  } else {
    return getLocal<SEOConfig>('giganet_seo', DEFAULT_SEO);
  }
}

export async function saveSEO(seo: SEOConfig): Promise<SEOConfig> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data: existing } = await supabase.from('seo').select('*').limit(1).maybeSingle();
      let result;
      const clean = { ...seo, updated_at: new Date().toISOString() };
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('seo')
          .update(clean)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('seo')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      setLocal('giganet_seo', seo);
      return seo;
    }
  } else {
    setLocal('giganet_seo', seo);
    return seo;
  }
}

// --- CIDADES COBERTURA ---
export async function getCidadesCobertura(): Promise<CidadeCobertura[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('cidades_cobertura')
        .select('*')
        .order('nome', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
    }
  } else {
    return getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
  }
}

export async function saveCidadeCobertura(cidade: Omit<CidadeCobertura, 'id'> & { id?: string | number }): Promise<CidadeCobertura> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      let result;
      const clean = { ...cidade, updated_at: new Date().toISOString() };
      if (cidade.id && String(cidade.id).length > 2) {
        const { data, error } = await supabase
          .from('cidades_cobertura')
          .update(clean)
          .eq('id', cidade.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('cidades_cobertura')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      const list = getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
      let updated: CidadeCobertura;
      if (cidade.id) {
        updated = { ...cidade, id: cidade.id } as CidadeCobertura;
        const index = list.findIndex(item => String(item.id) === String(cidade.id));
        if (index > -1) list[index] = updated;
        else list.push(updated);
      } else {
        updated = { ...cidade, id: Date.now().toString(), created_at: new Date().toISOString() } as CidadeCobertura;
        list.push(updated);
      }
      setLocal('giganet_cobertura', list);
      return updated;
    }
  } else {
    const list = getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
    let updated: CidadeCobertura;
    if (cidade.id) {
      updated = { ...cidade, id: cidade.id } as CidadeCobertura;
      const index = list.findIndex(item => String(item.id) === String(cidade.id));
      if (index > -1) list[index] = updated;
      else list.push(updated);
    } else {
      updated = { ...cidade, id: Date.now().toString(), created_at: new Date().toISOString() } as CidadeCobertura;
      list.push(updated);
    }
    setLocal('giganet_cobertura', list);
    return updated;
  }
}

export async function deleteCidadeCobertura(id: string | number): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('cidades_cobertura').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      const list = getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
      setLocal('giganet_cobertura', list.filter(item => String(item.id) !== String(id)));
    }
  } else {
    const list = getLocal<CidadeCobertura[]>('giganet_cobertura', DEFAULT_CIDADES_COBERTURA);
    setLocal('giganet_cobertura', list.filter(item => String(item.id) !== String(id)));
  }
}

// --- UPLOADS / MIDIA ---
export async function getUploads(): Promise<UploadMedia[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
    }
  } else {
    return getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
  }
}

export async function saveUpload(upload: Omit<UploadMedia, 'id'> & { id?: string | number }): Promise<UploadMedia> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      let result;
      const clean = { ...upload, updated_at: new Date().toISOString() };
      if (upload.id && String(upload.id).length > 2) {
        const { data, error } = await supabase
          .from('uploads')
          .update(clean)
          .eq('id', upload.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('uploads')
          .insert([{ ...clean, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      const list = getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
      let updated: UploadMedia;
      if (upload.id) {
        updated = { ...upload, id: upload.id } as UploadMedia;
        const index = list.findIndex(item => String(item.id) === String(upload.id));
        if (index > -1) list[index] = updated;
        else list.push(updated);
      } else {
        updated = { ...upload, id: Date.now().toString(), created_at: new Date().toISOString() } as UploadMedia;
        list.push(updated);
      }
      setLocal('giganet_media_uploads', list);
      return updated;
    }
  } else {
    const list = getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
    let updated: UploadMedia;
    if (upload.id) {
      updated = { ...upload, id: upload.id } as UploadMedia;
      const index = list.findIndex(item => String(item.id) === String(upload.id));
      if (index > -1) list[index] = updated;
      else list.push(updated);
    } else {
      updated = { ...upload, id: Date.now().toString(), created_at: new Date().toISOString() } as UploadMedia;
      list.push(updated);
    }
    setLocal('giganet_media_uploads', list);
    return updated;
  }
}

export async function deleteUpload(id: string | number): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('uploads').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      const list = getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
      setLocal('giganet_media_uploads', list.filter(item => String(item.id) !== String(id)));
    }
  } else {
    const list = getLocal<UploadMedia[]>('giganet_media_uploads', DEFAULT_UPLOADS);
    setLocal('giganet_media_uploads', list.filter(item => String(item.id) !== String(id)));
  }
}

// --- PLANOS ---
export async function getPlanos(): Promise<Plano[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('planos')
        .select('*')
        .order('preco', { ascending: true });
      if (error) throw error;
      
      return (data || []).map(p => ({
        ...p,
        beneficios: Array.isArray(p.beneficios) 
          ? p.beneficios 
          : typeof p.beneficios === 'string'
            ? JSON.parse(p.beneficios)
            : []
      }));
    } catch (e) {
      return getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
    }
  } else {
    return getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
  }
}

export async function savePlano(plano: Omit<Plano, 'id'> & { id?: string | number }): Promise<Plano> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      let result;
      const formattedPlano = {
        ...plano,
        beneficios: Array.isArray(plano.beneficios) ? plano.beneficios : [],
        updated_at: new Date().toISOString()
      };

      if (plano.id && String(plano.id).length > 2) {
        const { data, error } = await supabase
          .from('planos')
          .update(formattedPlano)
          .eq('id', plano.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('planos')
          .insert([{ ...formattedPlano, created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      
      return {
        ...result,
        beneficios: Array.isArray(result.beneficios) ? result.beneficios : JSON.parse(result.beneficios || '[]')
      };
    } catch (e) {
      const planes = getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
      let updated: Plano;
      if (plano.id) {
        updated = { ...plano, id: plano.id } as Plano;
        const index = planes.findIndex(p => String(p.id) === String(plano.id));
        if (index > -1) planes[index] = updated;
        else planes.push(updated);
      } else {
        updated = { ...plano, id: Date.now().toString(), created_at: new Date().toISOString() } as Plano;
        planes.push(updated);
      }
      setLocal('giganet_planos', planes);
      return updated;
    }
  } else {
    const planes = getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
    let updated: Plano;
    if (plano.id) {
      updated = { ...plano, id: plano.id } as Plano;
      const index = planes.findIndex(p => String(p.id) === String(plano.id));
      if (index > -1) planes[index] = updated;
      else planes.push(updated);
    } else {
      updated = { ...plano, id: Date.now().toString(), created_at: new Date().toISOString() } as Plano;
      planes.push(updated);
    }
    setLocal('giganet_planos', planes);
    return updated;
  }
}

export async function deletePlano(id: string | number): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('planos').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      const planes = getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
      const filtered = planes.filter(p => String(p.id) !== String(id));
      setLocal('giganet_planos', filtered);
    }
  } else {
    const planes = getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
    const filtered = planes.filter(p => String(p.id) !== String(id));
    setLocal('giganet_planos', filtered);
  }
}

// --- LEADS ---
export async function getLeads(): Promise<Lead[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<Lead[]>('giganet_leads', []);
    }
  } else {
    return getLocal<Lead[]>('giganet_leads', []);
  }
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
  const newLead: Omit<Lead, 'id'> & { id?: string | number; created_at?: string } = {
    ...lead,
    created_at: new Date().toISOString()
  };

  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([newLead])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      const leads = getLocal<Lead[]>('giganet_leads', []);
      const created: Lead = {
        ...newLead,
        id: Date.now().toString()
      };
      leads.unshift(created);
      setLocal('giganet_leads', leads);
      return created;
    }
  } else {
    const leads = getLocal<Lead[]>('giganet_leads', []);
    const created: Lead = {
      ...newLead,
      id: Date.now().toString()
    };
    leads.unshift(created);
    setLocal('giganet_leads', leads);
    return created;
  }
}

export async function updateLeadStatus(id: string | number, status: Lead['status']): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      const leads = getLocal<Lead[]>('giganet_leads', []);
      const index = leads.findIndex(l => String(l.id) === String(id));
      if (index > -1) {
        leads[index].status = status;
        setLocal('giganet_leads', leads);
      }
    }
  } else {
    const leads = getLocal<Lead[]>('giganet_leads', []);
    const index = leads.findIndex(l => String(l.id) === String(id));
    if (index > -1) {
      leads[index].status = status;
      setLocal('giganet_leads', leads);
    }
  }
}

export async function deleteLead(id: string | number): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      const leads = getLocal<Lead[]>('giganet_leads', []);
      const filtered = leads.filter(l => String(l.id) !== String(id));
      setLocal('giganet_leads', filtered);
    }
  } else {
    const leads = getLocal<Lead[]>('giganet_leads', []);
    const filtered = leads.filter(l => String(l.id) !== String(id));
    setLocal('giganet_leads', filtered);
  }
}

// --- USUARIOS ---
export async function getUsuarios(): Promise<Usuario[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .order('nome', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
    }
  } else {
    return getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
  }
}

export async function saveUsuario(usuario: Omit<Usuario, 'id'> & { id?: string }): Promise<Usuario> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      let result;
      const formatted = {
        ...usuario,
        updated_at: new Date().toISOString()
      };

      if (usuario.id && usuario.id.length > 5) {
        const { data, error } = await supabase
          .from('usuarios')
          .update(formatted)
          .eq('id', usuario.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('usuarios')
          .insert([{ ...formatted, id: Date.now().toString(), created_at: new Date().toISOString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
      const updated = { ...usuario, id: usuario.id || Date.now().toString(), created_at: new Date().toISOString() } as Usuario;
      const idx = users.findIndex(u => u.id === updated.id);
      if (idx > -1) users[idx] = updated;
      else users.push(updated);
      setLocal('giganet_usuarios', users);
      return updated;
    }
  } else {
    const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
    const updated = { ...usuario, id: usuario.id || Date.now().toString(), created_at: new Date().toISOString() } as Usuario;
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx > -1) users[idx] = updated;
    else users.push(updated);
    setLocal('giganet_usuarios', users);
    return updated;
  }
}

export async function deleteUsuario(id: string): Promise<void> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('usuarios').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
      setLocal('giganet_usuarios', users.filter(u => u.id !== id));
    }
  } else {
    const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
    setLocal('giganet_usuarios', users.filter(u => u.id !== id));
  }
}

// --- BRAND SETTINGS ---
export async function getBrandSettings(): Promise<BrandSettings> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('brand_settings')
        .select('*')
        .limit(1)
        .maybeSingle();
      
      if (error) throw error;
      if (data) return data;
      
      const { data: inserted, error: insError } = await supabase
        .from('brand_settings')
        .insert([DEFAULT_BRAND_SETTINGS])
        .select()
        .single();
      
      if (insError) throw insError;
      return inserted;
    } catch (e) {
      console.error('Error fetching brand settings from Supabase:', e);
      return getLocal<BrandSettings>('giganet_brand_settings', DEFAULT_BRAND_SETTINGS);
    }
  } else {
    return getLocal<BrandSettings>('giganet_brand_settings', DEFAULT_BRAND_SETTINGS);
  }
}

export async function saveBrandSettings(settings: BrandSettings): Promise<BrandSettings> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data: existing } = await supabase.from('brand_settings').select('*').limit(1).maybeSingle();
      let result;
      const clean = { ...settings, updated_at: new Date().toISOString() };
      
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('brand_settings')
          .update(clean)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('brand_settings')
          .insert([clean])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      console.error('Error saving brand settings to Supabase:', e);
      setLocal('giganet_brand_settings', settings);
      return settings;
    }
  } else {
    setLocal('giganet_brand_settings', settings);
    return settings;
  }
}

// --- FILE UPLOAD / STORAGE ---
export async function uploadFile(bucket: 'logos' | 'banners' | 'uploads' | 'site-images', path: string, file: File): Promise<string> {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { 
          upsert: true,
          contentType: file.type
        });
      
      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return publicUrl;
    } catch (e) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  } else {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.readAsDataURL(file);
    });
  }
}

// --- AUTH LAYER ---

export interface AdminUser {
  id?: string | number;
  email: string;
  senha?: string;
  ativo: boolean;
  nivel: string;
  created_at?: string;
}

const DEFAULT_ADMIN: AdminUser = {
  email: 'adm@gigatelfiber.com',
  senha: '123456',
  ativo: true,
  nivel: 'admin'
};

export async function ensureDefaultAdmin() {
  const cleanEmail = DEFAULT_ADMIN.email.toLowerCase().trim();
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('email')
        .eq('email', cleanEmail)
        .maybeSingle();
      
      if (error) {
        console.warn('admin_users query error or table does not exist:', error);
        return;
      }
      
      if (!data) {
        const { error: insError } = await supabase
          .from('admin_users')
          .insert([DEFAULT_ADMIN]);
        if (insError) {
          console.error('Failed to auto-seed default admin into Supabase:', insError);
        } else {
          console.log('Seeded default administrator into admin_users Supabase table.');
        }
      }
    } catch (e) {
      console.error('Error in ensureDefaultAdmin:', e);
    }
  } else {
    const localAdmins = getLocal<AdminUser[]>('giganet_admin_users', []);
    const exists = localAdmins.some(u => u.email.toLowerCase().trim() === cleanEmail);
    if (!exists) {
      localAdmins.push(DEFAULT_ADMIN);
      setLocal('giganet_admin_users', localAdmins);
      console.log('Seeded default administrator locally in giganet_admin_users key.');
    }
  }
}

export async function signIn(email: string, pass: string) {
  const cleanEmail = email.toLowerCase().trim();
  
  // Ensure default administrator is registered
  await ensureDefaultAdmin();

  if (isRealSupabase && supabase) {
    try {
      // 13. Verificar se o Supabase está lendo a tabela correta:
      // select * from admin_users where email = emailDigitado limit 1
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .ilike('email', cleanEmail)
        .maybeSingle();

      // 14. Exibir no console o resultado retornado pelo Supabase
      console.log('Resultado retornado pelo Supabase para a query na tabela admin_users:', { data, error });

      if (error) {
        throw error;
      }

      if (!data) {
        // 9. Caso não encontre usuário
        console.error('Usuário não encontrado');
        return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
      }

      // 8.1 Usuário encontrado
      console.log('Usuário encontrado');

      if (data.senha !== pass) {
        // 10. Caso senha incorreta
        console.error('Senha incorreta');
        return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
      }

      // 8.2 Senha válida
      console.log('Senha válida');

      if (data.ativo !== true) {
        return { user: null, session: null, error: { message: 'Seu acesso está inativo. Contrate o administrador.' } };
      }

      // 8.3 Login realizado
      console.log('Login realizado');

      const user = {
        id: data.id || 'supa-admin-user',
        email: data.email,
        nivel: data.nivel || 'admin',
        nome: data.nome || 'Administrador Giganet'
      };

      const session = { access_token: 'supabase-db-token-' + Date.now(), user };
      
      // PERSIST SESSION
      localStorage.setItem('admin_logged', 'true');
      localStorage.setItem('admin_email', data.email);
      localStorage.setItem('giganet_session', JSON.stringify(session));

      // Redirecionar para: /admin/dashboard
      setTimeout(() => {
        window.history.pushState({}, '', '/admin/dashboard');
        window.dispatchEvent(new Event('popstate'));
      }, 50);

      return { user, session, error: null };
    } catch (e: any) {
      console.warn('Supabase auth failed or table missing, fallback to simulator:', e);
      const localAdmins = getLocal<AdminUser[]>('giganet_admin_users', []);
      const match = localAdmins.find(u => u.email.toLowerCase().trim() === cleanEmail);
      
      if (!match) {
        console.error('Usuário não encontrado');
        return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
      }

      console.log('Usuário encontrado');

      if (match.senha !== pass) {
        console.error('Senha incorreta');
        return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
      }

      console.log('Senha válida');

      if (match.ativo !== true) {
        return { user: null, session: null, error: { message: 'Seu acesso está inativo.' } };
      }

      console.log('Login realizado');

      const user = {
        id: match.id || 'local-admin-user',
        email: match.email,
        nivel: match.nivel || 'admin',
        nome: 'Administrador Giganet'
      };

      const session = { access_token: 'local-token-' + Date.now(), user };
      
      localStorage.setItem('admin_logged', 'true');
      localStorage.setItem('admin_email', email);
      localStorage.setItem('giganet_session', JSON.stringify(session));

      setTimeout(() => {
        window.history.pushState({}, '', '/admin/dashboard');
        window.dispatchEvent(new Event('popstate'));
      }, 50);

      return { user, session, error: null };
    }
  } else {
    const localAdmins = getLocal<AdminUser[]>('giganet_admin_users', []);
    const match = localAdmins.find(u => u.email.toLowerCase().trim() === cleanEmail);
    
    if (!match) {
      console.error('Usuário não encontrado');
      return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
    }

    console.log('Usuário encontrado');

    if (match.senha !== pass) {
      console.error('Senha incorreta');
      return { user: null, session: null, error: { message: 'Usuário ou senha inválidos' } };
    }

    console.log('Senha válida');

    if (match.ativo !== true) {
      return { user: null, session: null, error: { message: 'Seu acesso está inativo.' } };
    }

    console.log('Login realizado');

    const user = {
      id: match.id || 'local-admin-user',
      email: match.email,
      nivel: match.nivel || 'admin',
      nome: 'Administrador Giganet'
    };

    const session = { access_token: 'local-token-' + Date.now(), user };
    
    localStorage.setItem('admin_logged', 'true');
    localStorage.setItem('admin_email', email);
    localStorage.setItem('giganet_session', JSON.stringify(session));

    setTimeout(() => {
      window.history.pushState({}, '', '/admin/dashboard');
      window.dispatchEvent(new Event('popstate'));
    }, 50);

    return { user, session, needsPasswordChange: pass === '123456', error: null };
  }
}

export async function changePassword(newPassword: string) {
  updateTimestamp();
  const sessionUser = await getCurrentUser();
  if (!sessionUser || !sessionUser.email) {
    return { error: { message: 'Nenhum usuário logado para alteração de senha.' } };
  }

  const cleanEmail = sessionUser.email.toLowerCase().trim();

  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('admin_users')
        .update({ senha: newPassword })
        .eq('email', cleanEmail);
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  } else {
    const localAdmins = getLocal<AdminUser[]>('giganet_admin_users', []);
    const idx = localAdmins.findIndex(u => u.email.toLowerCase().trim() === cleanEmail);
    if (idx > -1) {
      localAdmins[idx].senha = newPassword;
      setLocal('giganet_admin_users', localAdmins);
    }
    return { error: null };
  }
}

export async function resetPassword(email: string) {
  const cleanEmail = email.toLowerCase().trim();
  
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', cleanEmail)
        .maybeSingle();

      if (error) throw error;
      if (!data) {
        return { error: { message: 'Este e-mail não confere com nenhum operador em nosso sistema.' } };
      }

      return { error: null, message: `Uma requisição de redefinição de acesso para ${cleanEmail} foi registrada no portal. Fale com o suporte.` };
    } catch (e: any) {
      return { error: e };
    }
  } else {
    const localAdmins = getLocal<AdminUser[]>('giganet_admin_users', []);
    const idx = localAdmins.findIndex(u => u.email.toLowerCase().trim() === cleanEmail);
    if (idx === -1) {
      return { error: { message: 'Este e-mail não confere com nenhum operador de teste cadastrado.' } };
    }
    localAdmins[idx].senha = '123456';
    setLocal('giganet_admin_users', localAdmins);
    return { error: null, message: `Sua senha de teste para ${cleanEmail} foi restaurada com sucesso para "123456".` };
  }
}

export async function signOut() {
  localStorage.removeItem('giganet_session');
  localStorage.removeItem('admin_logged');
  localStorage.removeItem('admin_email');
  
  setTimeout(() => {
    window.history.pushState({}, '', '/');
    window.dispatchEvent(new Event('popstate'));
  }, 50);
}

export async function getCurrentUser() {
  const sessionStr = localStorage.getItem('giganet_session');
  if (sessionStr) {
    try {
      const session = JSON.parse(sessionStr);
      return session.user;
    } catch (e) {
      return null;
    }
  }
  return null;
}


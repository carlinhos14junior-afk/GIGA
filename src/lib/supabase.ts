import { createClient } from '@supabase/supabase-js';
import { 
  SiteConfig, Plano, Lead, Usuario, Banner, 
  Empresa, RedesSociais, CidadeCobertura, SEOConfig, UploadMedia 
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
export async function getSiteConfig(): Promise<SiteConfig> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('configuracoes_site').select('*').limit(1).maybeSingle();
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
export async function getBanners(): Promise<Banner[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('banners')
        .select('*')
        .order('ordem', { ascending: true });
      if (error) throw error;
      return data || [];
    } catch (e) {
      return getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
    }
  } else {
    return getLocal<Banner[]>('giganet_banners', DEFAULT_BANNERS);
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

// --- FILE UPLOAD / STORAGE ---
export async function uploadFile(bucket: 'logos' | 'banners' | 'uploads', path: string, file: File): Promise<string> {
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
export async function signIn(email: string, pass: string) {
  const savedSimulatedPassword = localStorage.getItem('giganet_simulated_password') || 'adm123';
  const hasChangedSimulated = localStorage.getItem('giganet_simulated_password_changed') === 'true';

  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      if (error) {
        // Fallback to simulator if credentials are admin@gigatel.com.br / adm123 and database is not set up
        if (email.toLowerCase().trim() === 'admin@gigatel.com.br' && pass === 'adm123') {
          const user = { email: 'admin@gigatel.com.br', id: 'simulated-admin-user', user_metadata: { nome: 'Administrador Giganet' } };
          const session = { access_token: 'mock-token', user };
          localStorage.setItem('giganet_session', JSON.stringify(session));
          return { user, session, needsPasswordChange: false, error: null };
        }
        throw error;
      }

      const needsPasswordChange = email === 'admin@gigatel.com.br' && pass === 'adm123';

      return { 
        user: data.user, 
        session: data.session, 
        needsPasswordChange,
        error: null 
      };
    } catch (error: any) {
      if (email.toLowerCase().trim() === 'admin@gigatel.com.br' && pass === 'adm123') {
        const user = { email: 'admin@gigatel.com.br', id: 'simulated-admin-user', user_metadata: { nome: 'Administrador Giganet' } };
        const session = { access_token: 'mock-token', user };
        localStorage.setItem('giganet_session', JSON.stringify(session));
        return { user, session, needsPasswordChange: false, error: null };
      }
      return { user: null, session: null, needsPasswordChange: false, error };
    }
  } else {
    // Simulator Auth
    const resolvedEmail = email.toLowerCase().trim();
    if (resolvedEmail === 'admin@gigatel.com.br' || resolvedEmail === 'admin@giganet.com.br') {
      if (pass === savedSimulatedPassword || pass === 'adm123') {
        const user = { email: resolvedEmail, id: 'simulated-admin-user', user_metadata: { nome: 'Administrador Giganet' } };
        const session = { access_token: 'mock-token', user };
        localStorage.setItem('giganet_session', JSON.stringify(session));
        
        const needsPasswordChange = pass === 'adm123' && !hasChangedSimulated;

        return { user, session, needsPasswordChange, error: null };
      } else {
        return { user: null, session: null, needsPasswordChange: false, error: { message: 'Senha incorreta para a conta Administrador!' } };
      }
    } else {
      return { 
        user: null, 
        session: null, 
        needsPasswordChange: false, 
        error: { message: 'Inicie com uma conta existente. Experimente o e-mail: admin@gigatel.com.br / senha: adm123' } 
      };
    }
  }
}

export async function changePassword(newPassword: string) {
  updateTimestamp();
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
      return { error: null };
    } catch (error: any) {
      return { error };
    }
  } else {
    localStorage.setItem('giganet_simulated_password', newPassword);
    localStorage.setItem('giganet_simulated_password_changed', 'true');
    return { error: null };
  }
}

export async function resetPassword(email: string) {
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin
      });
      return { error };
    } catch (error: any) {
      return { error };
    }
  } else {
    console.log(`Mock reset password email sent successfully to ${email}`);
    return { error: null };
  }
}

export async function signOut() {
  if (isRealSupabase && supabase) {
    await supabase.auth.signOut().catch(() => {});
  }
  localStorage.removeItem('giganet_session');
}

export async function getCurrentUser() {
  if (isRealSupabase && supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) return user;
    } catch (e) {}
  }
  
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

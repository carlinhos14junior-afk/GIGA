import { createClient } from '@supabase/supabase-js';
import { SiteConfig, Plano, LeadCobertura } from '../types';

const supabaseUrl = (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Detect if we have real credentials
export const isRealSupabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL';

export const supabase = isRealSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initial seeds in case we are in simulated local environment
const DEFAULT_CONFIG: SiteConfig = {
  nome_empresa: 'GIGANET',
  logo_url: '',
  whatsapp: '5511999999999',
  telefone: '(11) 4004-9999',
  email: 'contato@giganetfibra.com.br',
  endereco: 'Av. Paulista, 1000 - Bela Vista, São Paulo - SP, CEP 01311-100',
  instagram: 'giganet_fibra',
  facebook: 'giganetfibra'
};

const DEFAULT_PLANOS: Plano[] = [
  {
    id: '1',
    nome: 'Plano Smart 500 Mega',
    velocidade: '500 MEGA',
    preco: 99.90,
    beneficios: [
      '100% Fibra Óptica',
      'Wi-Fi incluso',
      'Download ilimitado',
      'Suporte técnico humanizado',
      'Ideal para navegar e assistir streaming'
    ],
    destaque: false,
    ativo: true
  },
  {
    id: '2',
    nome: 'Plano Ultra 800 Mega',
    velocidade: '800 MEGA',
    preco: 129.90,
    beneficios: [
      '100% Fibra Óptica',
      'Wi-Fi Dual Band incluso',
      'Download e Upload de alta performance',
      'Ideal para jogos, streaming e Home Office',
      'Prioridade de suporte técnico',
      'Instalação expressa'
    ],
    destaque: true,
    ativo: true
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

export async function getSiteConfig(): Promise<SiteConfig> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.from('site_config').select('*').limit(1).maybeSingle();
      if (error) throw error;
      if (data) return data;
      
      // If table exists but has no data, insert default
      const { data: inserted, error: insError } = await supabase
        .from('site_config')
        .insert([DEFAULT_CONFIG])
        .select()
        .single();
      
      if (insError) throw insError;
      return inserted;
    } catch (e) {
      console.warn('Real Supabase active but config fetch failed, using local/fallback config:', e);
      return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
    }
  } else {
    return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
  if (isRealSupabase && supabase) {
    try {
      // Check if config exists
      const { data: existing } = await supabase.from('site_config').select('*').limit(1).maybeSingle();
      let result;
      if (existing && existing.id) {
        const { data, error } = await supabase
          .from('site_config')
          .update(config)
          .eq('id', existing.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        const { data, error } = await supabase
          .from('site_config')
          .insert([config])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      console.error('Failed to save to real Supabase, fallback to localStorage', e);
      setLocal('giganet_site_config', config);
      return config;
    }
  } else {
    setLocal('giganet_site_config', config);
    return config;
  }
}

export async function getPlanos(): Promise<Plano[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('planos')
        .select('*')
        .order('preco', { ascending: true });
      if (error) throw error;
      
      // Map benefits back to array if stored as JSON or string
      return (data || []).map(p => ({
        ...p,
        beneficios: Array.isArray(p.beneficios) 
          ? p.beneficios 
          : typeof p.beneficios === 'string'
            ? JSON.parse(p.beneficios)
            : []
      }));
    } catch (e) {
      console.warn('Real Supabase active but planes fetch failed, using local/fallback:', e);
      return getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
    }
  } else {
    return getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
  }
}

export async function savePlano(plano: Omit<Plano, 'id'> & { id?: string | number }): Promise<Plano> {
  if (isRealSupabase && supabase) {
    try {
      let result;
      const formattedPlano = {
        ...plano,
        // serialize benefits array to json standard for postgres
        beneficios: Array.isArray(plano.beneficios) ? plano.beneficios : []
      };

      if (plano.id && String(plano.id).length > 2) {
        // Probably uuid
        const { data, error } = await supabase
          .from('planos')
          .update(formattedPlano)
          .eq('id', plano.id)
          .select()
          .single();
        if (error) throw error;
        result = data;
      } else {
        // Insert new
        const { data, error } = await supabase
          .from('planos')
          .insert([formattedPlano])
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
      console.error('Failed to save plano to real Supabase, fallback to localStorage', e);
      const planes = getLocal<Plano[]>('giganet_planos', DEFAULT_PLANOS);
      let updated: Plano;
      if (plano.id) {
        updated = { ...plano, id: plano.id } as Plano;
        const index = planes.findIndex(p => String(p.id) === String(plano.id));
        if (index > -1) planes[index] = updated;
        else planes.push(updated);
      } else {
        updated = { ...plano, id: Date.now().toString() } as Plano;
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
      updated = { ...plano, id: Date.now().toString() } as Plano;
      planes.push(updated);
    }
    setLocal('giganet_planos', planes);
    return updated;
  }
}

export async function deletePlano(id: string | number): Promise<void> {
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('planos').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Supabase delete plano failed, fallback to local', e);
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

export async function getLeads(): Promise<LeadCobertura[]> {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads_cobertura')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data || [];
    } catch (e) {
      console.warn('Real Supabase active but leads fetch failed, using local fallback:', e);
      return getLocal<LeadCobertura[]>('giganet_leads', []);
    }
  } else {
    return getLocal<LeadCobertura[]>('giganet_leads', []);
  }
}

export async function saveLead(lead: Omit<LeadCobertura, 'id' | 'created_at'>): Promise<LeadCobertura> {
  const newLead: Omit<LeadCobertura, 'id'> & { id?: string | number; created_at?: string } = {
    ...lead,
    created_at: new Date().toISOString()
  };

  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase
        .from('leads_cobertura')
        .insert([newLead])
        .select()
        .single();
      if (error) throw error;
      return data;
    } catch (e) {
      console.error('Failed to submit lead to real Supabase, fallback to localStorage', e);
      const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
      const created: LeadCobertura = {
        ...newLead,
        id: Date.now().toString()
      };
      leads.unshift(created);
      setLocal('giganet_leads', leads);
      return created;
    }
  } else {
    const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
    const created: LeadCobertura = {
      ...newLead,
      id: Date.now().toString()
    };
    leads.unshift(created);
    setLocal('giganet_leads', leads);
    return created;
  }
}

export async function updateLeadStatus(id: string | number, status: LeadCobertura['status']): Promise<void> {
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads_cobertura')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to update lead in real Supabase, fallback to local', e);
      const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
      const index = leads.findIndex(l => String(l.id) === String(id));
      if (index > -1) {
        leads[index].status = status;
        setLocal('giganet_leads', leads);
      }
    }
  } else {
    const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
    const index = leads.findIndex(l => String(l.id) === String(id));
    if (index > -1) {
      leads[index].status = status;
      setLocal('giganet_leads', leads);
    }
  }
}

export async function deleteLead(id: string | number): Promise<void> {
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads_cobertura')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to delete lead from real Supabase, fallback to local', e);
      const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
      const filtered = leads.filter(l => String(l.id) !== String(id));
      setLocal('giganet_leads', filtered);
    }
  } else {
    const leads = getLocal<LeadCobertura[]>('giganet_leads', []);
    const filtered = leads.filter(l => String(l.id) !== String(id));
    setLocal('giganet_leads', filtered);
  }
}

// User-friendly Auth Layer (handles Auth Simulation if Supabase is offline)
export async function signIn(email: string, pass: string) {
  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      return { user: data.user, session: data.session, error };
    } catch (error) {
      return { user: null, session: null, error };
    }
  } else {
    // Simulated authentication: standard email/password or admin/admin123
    // This allows testing the control panel fully offline
    if ((email === 'admin@giganet.com.br' && pass === 'admin123') || (email === 'demo' && pass === 'demo')) {
      const user = { email, id: 'simulated-admin-user' };
      const session = { access_token: 'mock-token', user };
      localStorage.setItem('giganet_session', JSON.stringify(session));
      return { user, session, error: null };
    } else {
      return { user: null, session: null, error: { message: 'Selecione o e-mail admin@giganet.com.br e senha admin123 para o login de testes ou configure as credenciais do Supabase!' } };
    }
  }
}

export async function signOut() {
  if (isRealSupabase && supabase) {
    await supabase.auth.signOut();
  } else {
    localStorage.removeItem('giganet_session');
  }
}

export async function getCurrentUser() {
  if (isRealSupabase && supabase) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user;
    } catch (e) {
      return null;
    }
  } else {
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
}

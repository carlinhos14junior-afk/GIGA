import { createClient } from '@supabase/supabase-js';
import { SiteConfig, Plano, Lead, Usuario } from '../types';

// Let's support both NEXT_PUBLIC_ styles as well as VITE_ styles
const supabaseUrl = (import.meta as any).env.NEXT_PUBLIC_SUPABASE_URL || (import.meta as any).env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = (import.meta as any).env.NEXT_PUBLIC_SUPABASE_ANON_KEY || (import.meta as any).env.VITE_SUPABASE_ANON_KEY || '';

// Detect if we have real credentials
export const isRealSupabase = supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL' && !supabaseUrl.includes('placeholder');

export const supabase = isRealSupabase ? createClient(supabaseUrl, supabaseAnonKey) : null;

// Initial seeds
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
    ativo: true
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
    ativo: true
  }
];

const DEFAULT_USUARIOS: Usuario[] = [
  {
    id: 'admin-user-id',
    nome: 'Administrador GIGATEL',
    email: 'admin@gigatel.com.br',
    perfil: 'admin'
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
      console.warn('Supabase configuracoes_site fetch failed, trying site_config or local fallback:', e);
      try {
        const { data, error } = await supabase.from('site_config').select('*').limit(1).maybeSingle();
        if (!error && data) return data;
      } catch (err) {
        console.warn('Fallback to site_config failed too:', err);
      }
      return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
    }
  } else {
    return getLocal<SiteConfig>('giganet_site_config', DEFAULT_CONFIG);
  }
}

export async function saveSiteConfig(config: SiteConfig): Promise<SiteConfig> {
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
      console.error('Failed to save to configuracoes_site, trying site_config fallback', e);
      try {
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
      } catch (innerError) {
        console.error('Failed to save to site_config fallback, falling back to localStorage', innerError);
        setLocal('giganet_site_config', config);
        return config;
      }
    }
  } else {
    setLocal('giganet_site_config', config);
    return config;
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
      console.warn('Supabase fetch query for planos failed, fallback:', e);
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
        beneficios: Array.isArray(plano.beneficios) ? plano.beneficios : []
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
      console.error('Failed to save plano, fallback to localStorage', e);
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
      console.warn('Supabase fetch query for leads failed, trying fallback:', e);
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
      console.error('Failed to submit lead to real Supabase, fallback to localStorage', e);
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
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to update lead in real Supabase, fallback to local', e);
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
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to delete lead from real Supabase, fallback to local', e);
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
      console.warn('Supabase fetch usuarios query failed (Rls or table), using fallback:', e);
      return getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
    }
  } else {
    return getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
  }
}

export async function saveUsuario(usuario: Omit<Usuario, 'id'> & { id?: string }): Promise<Usuario> {
  if (isRealSupabase && supabase) {
    try {
      let result;
      const formatted = {
        ...usuario,
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
          .insert([{ ...formatted, id: Date.now().toString() }])
          .select()
          .single();
        if (error) throw error;
        result = data;
      }
      return result;
    } catch (e) {
      console.error('Failed to save usuario to real Supabase, fallback to local', e);
      const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
      const updated = { ...usuario, id: usuario.id || Date.now().toString() } as Usuario;
      const idx = users.findIndex(u => u.id === updated.id);
      if (idx > -1) users[idx] = updated;
      else users.push(updated);
      setLocal('giganet_usuarios', users);
      return updated;
    }
  } else {
    const users = getLocal<Usuario[]>('giganet_usuarios', DEFAULT_USUARIOS);
    const updated = { ...usuario, id: usuario.id || Date.now().toString() } as Usuario;
    const idx = users.findIndex(u => u.id === updated.id);
    if (idx > -1) users[idx] = updated;
    else users.push(updated);
    setLocal('giganet_usuarios', users);
    return updated;
  }
}

export async function deleteUsuario(id: string): Promise<void> {
  if (isRealSupabase && supabase) {
    try {
      const { error } = await supabase.from('usuarios').delete().eq('id', id);
      if (error) throw error;
    } catch (e) {
      console.error('Failed to delete usuario in real Supabase, fallback local', e);
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
  if (isRealSupabase && supabase) {
    try {
      // Standard file upload
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(path, file, { 
          upsert: true,
          contentType: file.type
        });
      
      if (error) {
        // Code '3f000' or similar bucket not created - try to see if bucket exists, or just fallback, maybe we need to create the bucket dynamically!
        throw error;
      }

      // Return public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(path);

      return publicUrl;
    } catch (e) {
      console.error(`Failed uploading file to bucket ${bucket}:`, e);
      // Let's fallback to standard local Base64 resolution so the UI loads preview successfully!
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  } else {
    // Simulated upload - read as base64 to store in config State/localStorage
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
// Track password changes and first access status in LocalStorage or cookies
export async function signIn(email: string, pass: string) {
  // Let's get simulated password in case user changed it from Admin@123
  const savedSimulatedPassword = localStorage.getItem('giganet_simulated_password') || 'Admin@123';
  const hasChangedSimulated = localStorage.getItem('giganet_simulated_password_changed') === 'true';

  if (isRealSupabase && supabase) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      
      if (error) throw error;

      // Check if it's the admin@giganet.com.br and needs password change
      const needsPasswordChange = email === 'admin@giganet.com.br' && pass === 'Admin@123';

      return { 
        user: data.user, 
        session: data.session, 
        needsPasswordChange,
        error: null 
      };
    } catch (error: any) {
      return { user: null, session: null, needsPasswordChange: false, error };
    }
  } else {
    // Simulator Auth
    const resolvedEmail = email.toLowerCase().trim();
    if (resolvedEmail === 'admin@giganet.com.br') {
      if (pass === savedSimulatedPassword) {
        const user = { email: resolvedEmail, id: 'simulated-admin-user', user_metadata: { nome: 'Administrador Giganet' } };
        const session = { access_token: 'mock-token', user };
        localStorage.setItem('giganet_session', JSON.stringify(session));
        
        // Needs password change if he logged in with Admin@123 and hadn't changed it yet
        const needsPasswordChange = pass === 'Admin@123' && !hasChangedSimulated;

        return { user, session, needsPasswordChange, error: null };
      } else {
        return { user: null, session: null, needsPasswordChange: false, error: { message: 'Senha incorreta para a conta Administrador!' } };
      }
    } else {
      return { 
        user: null, 
        session: null, 
        needsPasswordChange: false, 
        error: { message: 'Inicie com uma conta existente. Experimente o e-mail: admin@giganet.com.br' } 
      };
    }
  }
}

export async function changePassword(newPassword: string) {
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
    // Simulated OK
    console.log(`Mock reset password email sent successfully to ${email}`);
    return { error: null };
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

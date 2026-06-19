import { createClient } from '@supabase/supabase-js';
import { 
  SiteConfig, Plano, Lead, Usuario, Banner, 
  Empresa, RedesSociais, CidadeCobertura, SEOConfig, UploadMedia,
  BrandSettings, HeroSectionEntry, BlogPost
} from '../types';

const supabaseUrl =
  (import.meta as any).env?.VITE_SUPABASE_URL ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  (import.meta as any).env?.VITE_SUPABASE_ANON_KEY ||
  (import.meta as any).env?.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("supabaseUrl is required")
}

if (!supabaseKey) {
  throw new Error("supabaseKey is required")
}

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

export const isRealSupabase = true;

const updateTimestamp = () => {};

export async function getSiteConfig(forceRefresh = false): Promise<SiteConfig> {
  const { data, error } = await supabase.from('configuracoes_site').select('*').limit(1).maybeSingle();
  if (error) throw error;
  if (!data) return {
    id: 1,
    nome_empresa: 'GIGATEL',
    logo_url: '',
    whatsapp: '5511910050121',
    telefone: '(11) 91005-0121',
    email: 'contato@gigatel.com.br',
    endereco: 'Rua Antônio Ferraciolli, 331',
    bairro: 'Jardim Catarina',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03910-070'
  } as SiteConfig;
  return data;
}

export async function saveSiteConfig(config: Partial<SiteConfig>): Promise<SiteConfig> {
  const { data, error } = await supabase.from('configuracoes_site').update(config).eq('id', 1).select().single();
  if (error) throw error;
  return data;
}

export async function getHeroSection(): Promise<HeroSectionEntry[]> {
  const { data, error } = await supabase.from('hero_section').select('*').order('ordem', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function saveHeroSection(entry: Omit<HeroSectionEntry, 'id'> & { id?: string | number }): Promise<HeroSectionEntry> {
  const { data, error } = await supabase.from('hero_section').upsert([entry]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteHeroSection(id: string | number): Promise<void> {
  const { error } = await supabase.from('hero_section').delete().eq('id', id);
  if (error) throw error;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveBlogPost(post: Omit<BlogPost, 'id'> & { id?: string | number }): Promise<BlogPost> {
  const { data, error } = await supabase.from('blog_posts').upsert([post]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBlogPost(id: string | number): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

export async function getBanners(forceRefresh = false): Promise<Banner[]> {
  const { data, error } = await supabase.from('banners').select('*').order('ordem', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function saveBanner(banner: Omit<Banner, 'id'> & { id?: string | number }): Promise<Banner> {
  const { data, error } = await supabase.from('banners').upsert([banner]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteBanner(id: string | number): Promise<void> {
  const { error } = await supabase.from('banners').delete().eq('id', id);
  if (error) throw error;
}

export async function getEmpresa(): Promise<Empresa> {
  const { data, error } = await supabase.from('empresa').select('*').limit(1).maybeSingle();
  if (error) throw error;
  if (!data) return {
    id: 1,
    nome_empresa: 'GIGATEL',
    telefone: '(11) 91005-0121',
    whatsapp: '5511910050121',
    email: 'contato@gigatel.com.br',
    endereco: 'Rua Antônio Ferraciolli, 331',
    numero: '331',
    bairro: 'Jardim Catarina',
    cidade: 'São Paulo',
    estado: 'SP',
    cep: '03910-070'
  } as Empresa;
  return data;
}

export async function saveEmpresa(empresa: Empresa): Promise<Empresa> {
  const { data, error } = await supabase.from('empresa').upsert([empresa]).select().single();
  if (error) throw error;
  return data;
}

export async function getRedesSociais(): Promise<RedesSociais> {
  const { data, error } = await supabase.from('redes_sociais').select('*').limit(1).maybeSingle();
  if (error) {
    if (error.code === 'PGRST205') {
       console.warn('Tabela redes_sociais não encontrada.');
       return {
         id: 1,
         instagram: 'gigatelofc',
         facebook: 'gigatelofc'
       } as RedesSociais;
    }
    throw error;
  }
  if (!data) return {
    id: 1,
    instagram: 'gigatelofc',
    facebook: 'gigatelofc'
  } as RedesSociais;
  return data;
}

export async function saveRedesSociais(redes: RedesSociais): Promise<RedesSociais> {
  const { data, error } = await supabase.from('redes_sociais').upsert([redes]).select().single();
  if (error) throw error;
  return data;
}

export async function getSEO(): Promise<SEOConfig> {
  const { data, error } = await supabase.from('seo').select('*').limit(1).maybeSingle();
  if (error) {
    if (error.code === 'PGRST205') {
       console.warn('Tabela seo não encontrada.');
       return {
         id: 1,
         title: 'GIGATEL - Internet Ultraveloz',
         meta_description: 'Internet Fibra Ultraveloz para sua casa.',
         keywords: 'GIGATEL, INTERNET, FIBRA',
         status: 'inativo'
       } as SEOConfig;
    }
    throw error;
  }
  if (!data) return {
    id: 1,
    title: 'GIGATEL - Internet Ultraveloz',
    meta_description: 'Internet Fibra Ultraveloz para sua casa.',
    keywords: 'GIGATEL, INTERNET, FIBRA',
    status: 'inativo'
  } as SEOConfig;
  return data;
}

export async function saveSEO(seo: SEOConfig): Promise<SEOConfig> {
  const { data, error } = await supabase.from('seo').upsert([seo]).select().single();
  if (error) throw error;
  return data;
}

export async function getCidadesCobertura(): Promise<CidadeCobertura[]> {
  const { data, error } = await supabase.from('cidades_cobertura').select('*').order('nome', { ascending: true });
  if (error) throw error;
  return data || [];
}

export async function saveCidadeCobertura(cidade: Omit<CidadeCobertura, 'id'> & { id?: string | number }): Promise<CidadeCobertura> {
  const { data, error } = await supabase.from('cidades_cobertura').upsert([cidade]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteCidadeCobertura(id: string | number): Promise<void> {
  const { error } = await supabase.from('cidades_cobertura').delete().eq('id', id);
  if (error) throw error;
}

export async function getUploads(): Promise<UploadMedia[]> {
  const { data, error } = await supabase.from('uploads').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data || [];
}

export async function saveUpload(upload: Omit<UploadMedia, 'id'> & { id?: string | number }): Promise<UploadMedia> {
  const { data, error } = await supabase.from('uploads').upsert([upload]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteUpload(id: string | number): Promise<void> {
  const { error } = await supabase.from('uploads').delete().eq('id', id);
  if (error) throw error;
}

export async function getPlanos(): Promise<Plano[]> {
  const { data, error } = await supabase.from('planos').select('*').order('id', { ascending: true });
  if (error) {
    if (error.code === 'PGRST205') return [];
    throw error;
  }
  
  // Fix nested JSON inside string issue that might happen
  return (data || []).map(p => ({
     ...p, 
     beneficios: Array.isArray(p.beneficios) ? p.beneficios : (typeof p.beneficios === 'string' ? JSON.parse(p.beneficios || '[]') : [])
  }));
}

export async function savePlano(plano: Omit<Plano, 'id'> & { id?: string | number }): Promise<Plano> {
  const { data, error } = await supabase.from('planos').upsert([plano]).select().single();
  if (error) throw error;
  return data;
}

export async function deletePlano(id: string | number): Promise<void> {
  const { error } = await supabase.from('planos').delete().eq('id', id);
  if (error) throw error;
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
  if (error) {
    if (error.code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

export async function saveLead(lead: Omit<Lead, 'id' | 'created_at'>): Promise<Lead> {
  const { data, error } = await supabase.from('leads').insert([lead]).select().single();
  if (error) throw error;
  return data;
}

export async function updateLeadStatus(id: string | number, status: string): Promise<void> {
  const { error } = await supabase.from('leads').update({ status }).eq('id', id);
  if (error) throw error;
}

export async function deleteLead(id: string | number): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', id);
  if (error) throw error;
}

export async function getUsuarios(): Promise<Usuario[]> {
  const { data, error } = await supabase.from('usuarios').select('*').order('nome', { ascending: true });
  if (error) {
    if (error.code === 'PGRST205') return [];
    throw error;
  }
  return data || [];
}

export async function saveUsuario(usuario: Omit<Usuario, 'id'> & { id?: string }): Promise<Usuario> {
  const { data, error } = await supabase.from('usuarios').upsert([usuario]).select().single();
  if (error) throw error;
  return data;
}

export async function deleteUsuario(id: string): Promise<void> {
  const { error } = await supabase.from('usuarios').delete().eq('id', id);
  if (error) throw error;
}

export async function getBrandSettings() {
  try {
    const { data, error } = await supabase
      .from("brand_settings")
      .select("*")
      .single();

    if (error) {
      console.warn("Brand settings não encontrada:", error);
      return null;
    }

    return data;
  } catch (err) {
    console.warn("Erro ao carregar configurações da marca:", err);
    return null;
  }
}

export async function saveBrandSettings(settings: BrandSettings): Promise<BrandSettings> {
  const { data, error } = await supabase.from('brand_settings').upsert([{ ...settings, id: 1 }]).select().single();
  if (error) throw error;
  return data;
}

export async function uploadFile(bucket: 'logos' | 'banners' | 'uploads' | 'site-images', path: string, file: File): Promise<string> {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error('Supabase credentials not configured');
  }

  const { data, error } = await supabase.storage.from(bucket).upload(path, file, { 
    upsert: true,
    contentType: file.type,
    cacheControl: '3600'
  });
  
  if (error) {
    console.error("Upload error details:", error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage.from(bucket).getPublicUrl(path);
  return publicUrl;
}

export interface AdminUser {
  id?: string | number;
  nome: string;
  email: string;
  senha?: string;
  role: 'admin' | 'operador';
  status: 'ativo' | 'inativo';
}

export const ensureDefaultAdmin = async () => {};

export const signIn = async (email: string, pass: string): Promise<{ user: any, session: any, error: any, message?: string }> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
  return { user: data?.user, session: data?.session, error, message: error?.message };
}

export const getCurrentUser = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

export const getLastUpdate = async () => {
  return new Date().toISOString();
}

export const changePassword = async (email: string, pass: string) => {
  const { error } = await supabase.auth.updateUser({ password: pass });
  return { error };
}

export const resetPassword = async (email: string): Promise<{ error: any; message?: string }> => {
  const { error } = await supabase.auth.resetPasswordForEmail(email);
  return { error, message: error ? undefined : 'E-mail de redefinição enviado' };
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
}

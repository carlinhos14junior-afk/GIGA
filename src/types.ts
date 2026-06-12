export interface BrandSettings {
  id?: string | number;
  logo_url: string;
  logo_white_url: string;
  logo_footer_url: string;
  logo_mobile_url: string;
  favicon_url: string;
  updated_at?: string;
  created_at?: string;
}

export interface SiteConfig {
  id?: string | number;
  nome_empresa: string;
  logo_url: string;
  logo_white_url?: string;
  logo_footer_url?: string;
  logo_mobile_url?: string;
  favicon_url?: string;
  whatsapp: string;
  telefone: string;
  email: string;
  endereco: string;
  instagram: string;
  facebook: string;
  bairro?: string;
  cidade?: string;
  estado?: string;
  cep?: string;
  tempo_carro?: string;
  tempo_moto?: string;
  cnpj?: string;
  numero?: string;
  horario_funcionamento?: string;
  created_at?: string;
  site_status?: 'Ativo' | 'Manutenção';

  // Hero and general site texts
  hero_titulo?: string;
  hero_subtitulo?: string;
  hero_texto_botao?: string;
  hero_link_botao?: string;
  
  // Advantages / Benefits Section
  vantagens_titulo?: string;
  vantagens_subtitulo?: string;
  vantagens_lista_json?: string;
  
  // Sobre Nós
  sobre_titulo_tag?: string;
  sobre_titulo?: string;
  sobre_destaque?: string;
  sobre_descricao?: string;
  sobre_proposito_titulo?: string;
  sobre_proposito_desc?: string;
  sobre_valor_titulo?: string;
  sobre_valor_desc?: string;
  sobre_imagem_url?: string;
  
  // Contato
  contato_titulo?: string;
  contato_subtitulo?: string;
  contato_descricao?: string;
  contato_legal?: string;
  
  // Footer custom edit fields (Rodapé aba)
  footer_titulo?: string;
  footer_descricao?: string;
  footer_endereco?: string;
  footer_telefone?: string;
  footer_whatsapp?: string;
  footer_email?: string;
  footer_instagram?: string;
  footer_facebook?: string;
  footer_links_rapidos?: string;
  footer_copyright?: string;
  footer_cnpj?: string;
  footer_horario?: string;
  footer_texto_legal?: string;
  
  // FAQ & Depoimentos
  faq_titulo?: string;
  faq_subtitulo?: string;
  faq_lista_json?: string;
  depoimentos_titulo?: string;
  depoimentos_subtitulo?: string;
  depoimentos_lista_json?: string;
}

export interface Banner {
  id: string | number;
  titulo: string;
  subtitulo: string;
  texto_botao: string;
  link_botao: string;
  image_url: string;
  mobile_image_url: string;
  ordem: number;
  status: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface Empresa {
  id?: string | number;
  nome_empresa: string;
  telefone: string;
  whatsapp: string;
  email: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  latitude: string;
  longitude: string;
  horario_funcionamento: string;
  status: 'ativo' | 'inativo';
  cnpj?: string;
  instagram?: string;
  facebook?: string;
  logo_url?: string;
  logo_white_url?: string;
  logo_footer_url?: string;
  logo_mobile_url?: string;
  favicon_url?: string;
  created_at?: string;
  updated_at?: string;
}

export interface RedesSociais {
  id?: string | number;
  instagram: string;
  facebook: string;
  youtube: string;
  tiktok: string;
  linkedin: string;
  status: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface Plano {
  id: string | number;
  nome: string;
  velocidade: string;
  preco: number;
  descricao?: string;
  beneficios: string[];
  ordem?: number;
  destaque: boolean;
  ativo: boolean;
  detalhes?: string;
  status?: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface Lead {
  id: string | number;
  nome: string;
  whatsapp: string;
  email: string;
  cep: string;
  endereco: string;
  plano_interesse?: string;
  observacoes?: string;
  status: 'novo' | 'em atendimento' | 'convertido' | 'cancelado';
  created_at?: string;
}

export interface CidadeCobertura {
  id: string | number;
  nome: string;
  estado: string;
  status: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface SEOConfig {
  id?: string | number;
  title: string;
  meta_description: string;
  keywords: string;
  open_graph_title: string;
  open_graph_description: string;
  imagem_compartilhamento: string;
  status: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface UploadMedia {
  id: string | number;
  nome: string;
  url: string;
  tamanho: string;
  tipo: string;
  status: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'colaborador';
  nivel?: 'Administrador' | 'Editor';
  status?: 'ativo' | 'inativo';
  created_at?: string;
  updated_at?: string;
}

export interface HeroSectionEntry {
  id: string;
  title: string;
  subtitle: string;
  image_url?: string;
  active: boolean;
  created_at?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  image_url?: string;
  published: boolean;
  created_at?: string;
}

export type LeadStatus = 'novo' | 'em atendimento' | 'convertido' | 'cancelado';

export interface SiteConfig {
  id?: string | number;
  nome_empresa: string;
  logo_url: string;
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
  created_at?: string;
}

export interface Plano {
  id: string | number;
  nome: string;
  velocidade: string;
  preco: number;
  beneficios: string[];
  destaque: boolean;
  ativo: boolean;
  detalhes?: string;
  created_at?: string;
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

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  perfil: 'admin' | 'colaborador';
  created_at?: string;
}

export type LeadStatus = 'novo' | 'em atendimento' | 'convertido' | 'cancelado';

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
}

export interface Plano {
  id: string | number;
  nome: string;
  velocidade: string;
  preco: number;
  beneficios: string[]; // will be stored as JSON/array in Supabase or text split
  destaque: boolean;
  ativo: boolean;
}

export interface LeadCobertura {
  id: string | number;
  nome: string;
  whatsapp: string;
  cep: string;
  rua: string;
  numero: string;
  bairro: string;
  status: 'novo' | 'em atendimento' | 'finalizado';
  created_at?: string;
}

export type LeadStatus = 'novo' | 'em atendimento' | 'finalizado';

import { supabase } from './supabase';

interface SafeQueryResult<T> {
  data: T | null;
  error: any;
  isEmpty: boolean;
}

/**
 * Safe query wrapper for Supabase queries
 * Handles PGRST205 and other table-missing errors gracefully
 */
export async function safeQuery<T = any>(
  query: PromiseLike<{ data: T | null; error: any }>
): Promise<SafeQueryResult<T>> {
  try {
    const { data, error } = await query;

    // Table doesn't exist (PGRST205)
    if (error?.code === 'PGRST205') {
      console.warn('Tabela não encontrada:', error.message);
      return { data: null, error: null, isEmpty: true };
    }

    // Other error
    if (error) {
      console.error('Erro Supabase:', error);
      return { data: null, error, isEmpty: false };
    }

    return { data, error: null, isEmpty: false };
  } catch (err) {
    console.error('Erro inesperado na consulta do banco:', err);
    return { data: null, error: err, isEmpty: false };
  }
}

/**
 * Fetch villes/cidades with fallback
 */
export async function getCidades() {
  const result = await safeQuery(
    supabase
      .from('cidades_cobertura')
      .select('*')
      .order('nome')
  );

  return result.data || [];
}

/**
 * Fetch SEO with fallback
 */
export async function getSEO(page: string) {
  const result = await safeQuery(
    supabase
      .from('seo')
      .select('*')
      .limit(1)
      .maybeSingle()
  );

  return result.data || {
    title: 'Site Padrão',
    meta_description: 'Descrição padrão'
  };
}

/**
 * Fetch social networks/redes sociais with fallback
 */
export async function getRedesSociais() {
  const result = await safeQuery(
    supabase
      .from('redes_sociais')
      .select('*')
      .limit(1)
      .maybeSingle()
  );

  return result.data || {};
}

/**
 * Fetch general brand settings with fallback
 */
export async function getBrandSettings() {
  const result = await safeQuery(
    supabase
      .from('brand_settings')
      .select('*')
      .limit(1)
      .maybeSingle()
  );

  return result.data || {};
}

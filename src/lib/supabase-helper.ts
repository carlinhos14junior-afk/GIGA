import { PostgrestError } from '@supabase/supabase-js'

export function handleSupabaseError(error: PostgrestError | null, defaultValue: any = []) {
  if (!error) return null
  
  if (error.code === 'PGRST205') {
    console.warn('⚠️ Tabela não encontrada:', error.message)
    return defaultValue
  }
  
  if (error.code === 'PGRST116') {
    console.warn('⚠️ Erro de política RLS:', error.message)
    return defaultValue
  }
  
  console.error('❌ Erro Supabase:', error)
  return defaultValue
}

export async function safeQuery<T>(
  queryFn: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  defaultValue: T
): Promise<T> {
  try {
    const { data, error } = await queryFn()
    
    if (error) {
      const fallback = handleSupabaseError(error, defaultValue)
      return fallback ?? defaultValue
    }
    
    return data ?? defaultValue
  } catch (err) {
    console.error('❌ Erro na query:', err)
    return defaultValue
  }
}

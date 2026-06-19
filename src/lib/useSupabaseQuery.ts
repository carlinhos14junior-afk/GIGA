import { useState, useEffect } from 'react';
import { safeQuery } from './supabase-safe';

interface UseSupabaseQueryOptions<T> {
  query: PromiseLike<{ data: T | null; error: any }>;
  defaultData?: T;
  onError?: (error: any) => void;
}

export function useSupabaseQuery<T>({
  query,
  defaultData,
  onError
}: UseSupabaseQueryOptions<T>) {
  const [data, setData] = useState<T | null>(defaultData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;

    async function fetchData() {
      try {
        setLoading(true);
        const result = await safeQuery(query);

        if (!mounted) return;

        if (result.error) {
          setError(result.error);
          onError?.(result.error);
        } else {
          setData(result.data || (defaultData as T));
        }
      } catch (err) {
        if (!mounted) return;
        setError(err);
        onError?.(err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return { data, loading, error };
}

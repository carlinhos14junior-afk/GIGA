import fs from 'fs';

let content = fs.readFileSync('src/lib/supabase.ts', 'utf8');

content = content.replace(/const getLocal\s*=\s*<T>\(key: string, backup: T\): T => \{[\s\S]*?^};/m, 
`const getLocal = <T>(key: string, backup: T): T => {
  throw new Error("Modo offline desativado. Verifique as credenciais do Supabase nas configurações.");
};`);

content = content.replace(/const setLocal\s*=\s*<T>\(key: string, data: T\) => \{[\s\S]*?^};/m,
`const setLocal = <T>(key: string, data: T) => {
  throw new Error("Modo offline desativado.");
};`);

fs.writeFileSync('src/lib/supabase.ts', content);

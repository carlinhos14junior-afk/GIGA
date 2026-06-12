import fs from 'fs';
let content = fs.readFileSync('src/lib/supabase.ts', 'utf8');
content = content.replace(/const setLocal = <T>\(key: string, data: T\): void => \{[\s\S]*?^};/m,
`const setLocal = <T>(key: string, data: T): void => {
  throw new Error("Modo offline desativado.");
};`);
fs.writeFileSync('src/lib/supabase.ts', content);

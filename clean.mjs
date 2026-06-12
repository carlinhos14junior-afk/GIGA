import fs from 'fs';

let content = fs.readFileSync('src/lib/supabase.ts', 'utf8');

// 1. Remove getLocal / setLocal definitions
content = content.replace(/function getLocal[\s\S]*?\}\n/g, '');
content = content.replace(/function setLocal[\s\S]*?\}\n/g, '');
content = content.replace(/function updateTimestamp[\s\S]*?\}\n/g, '');
content = content.replace(/updateTimestamp\(\);/g, '');

// 2. We can do a string replace because the functions are fairly uniform.
// Let's replace "if (isRealSupabase && supabase) { \n try { ... } catch { ... } } else { ... }"

// A simple way is to find the opening of `if (isRealSupabase && supabase)`
// Wait, we replaced isRealSupabase boolean with `export const isRealSupabase = true;` earlier so that's ok.
// But we want to remove the try-catch for local fallback

// Instead of being clever, let's just use string replacements on the specific file since it's consistent.
// We just remove the catch block body that uses getLocal, and throw error instead!
content = content.replace(/catch\s*\([^\)]+\)\s*\{[^}]*getLocal[^}]*\}/g, 'catch(e) { console.error(e); throw e; }');
content = content.replace(/catch\s*\([^\)]+\)\s*\{[^}]*setLocal[^}]*\}/g, 'catch(e) { console.error(e); throw e; }');

// Remove the `else { ... getLocal ... }` strings
content = content.replace(/\} else \{\s*return getLocal[^}]+;\s*\}/g, '}');
content = content.replace(/\} else \{\s*const.*getLocal[^}]*setLocal[^}]*\}/g, '}');

// Specific replacements:
content = content.replace(/\} else \{\s*(?:const|let|setLocal|return)[^}]*getLocal[^}]*\}/g, '}');

// We also have cases where there's `if (isRealSupabase && supabase)` without try/catch
content = content.replace(/\} else \{\s*const [^=]+ = getLocal.*?setLocal.*?\}/gs, '}');

// Wait, let's just replace all `} else { ... getLocal ... }` blocks
while (content.match(/\} else \{[^{}]*getLocal[^{}]*\}/)) {
    content = content.replace(/\} else \{[^{}]*getLocal[^{}]*\}/g, '}');
}

while (content.match(/catch\s*\([^{}]*\)\s*\{[^{}]*getLocal[^{}]*\}/)) {
    content = content.replace(/catch\s*\([^{}]*\)\s*\{[^{}]*getLocal[^{}]*\}/g, 'catch(e) { throw e; }');
}

// In case we missed any `setLocal`
while (content.match(/\} else \{[^{}]*setLocal[^{}]*\}/)) {
    content = content.replace(/\} else \{[^{}]*setLocal[^{}]*\}/g, '}');
}

fs.writeFileSync('src/lib/supabase.ts', content);

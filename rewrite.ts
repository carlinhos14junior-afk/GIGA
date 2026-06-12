import { Project, SyntaxKind } from 'ts-morph';

const project = new Project();
const sourceFile = project.addSourceFileAtPath('src/lib/supabase.ts');

// Function to simplify isRealSupabase and try/catch fallback
function simplifyFunction(func) {
  const body = func.getBody();
  if (!body) return;

  // We are looking for:
  // if (isRealSupabase && supabase) { ... } else { ... }
  // OR
  // try { ... } catch (e) { getLocal... }
  const ifStatements = body.getDescendantsOfKind(SyntaxKind.IfStatement);
  for (const ifStmt of ifStatements) {
    const expr = ifStmt.getExpression().getText();
    if (expr.includes('isRealSupabase')) {
      const thenStmt = ifStmt.getThenStatement();
      
      // If the then block is a block, get its statements
      if (thenStmt.getKind() === SyntaxKind.Block) {
        let statements = thenStmt.getStatements();
        
        // Remove the outer if/else, replace with then block contents
        ifStmt.replaceWithText(statements.map(s => s.getText()).join('\n'));
      }
    }
  }

  // Now remove try/catch where catch contains getLocal
  const tryStatements = func.getDescendantsOfKind(SyntaxKind.TryStatement);
  for (const tryStmt of tryStatements) {
    const catchClause = tryStmt.getCatchClause();
    if (catchClause && catchClause.getText().includes('getLocal')) {
      // Just extract the try block and replace the whole try/catch
      const tryBlock = tryStmt.getTryBlock();
      tryStmt.replaceWithText(tryBlock.getStatements().map(s => s.getText()).join('\n'));
    }
  }
}

// Get all exported functions
for (const func of sourceFile.getFunctions()) {
  if (func.getName() === 'getLocal' || func.getName() === 'setLocal' || func.getName() === 'updateTimestamp') {
    func.remove();
    continue;
  }
  simplifyFunction(func);
}

// Run multiple times to catch nested/unwrapped
for (let i =0; i < 3; i++) {
  for (const func of sourceFile.getFunctions()) {
     simplifyFunction(func);
  }
}

// Let's also enforce removing getLocal completely anywhere.
sourceFile.saveSync();
console.log('Cleaned supabase.ts');

import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
let c = readFileSync(p, 'utf8');

// ONLY replace Unicode chars that break TS parsing when inside string literals.
// These are raw Unicode codepoints that TypeScript/Turbopack cannot handle
// inside template/string literals at the character level.
// We use charCodeAt to avoid shell encoding issues.

// U+2014 em dash — only when surrounded by spaces in TEXT content (not in attributes)
// Pattern: word_char SPACE U+2014 SPACE word_char -> use &mdash;
// But we must NOT touch the TS string delimiters.
// Safest: replace â€" (the corrupted Latin-1 version) if it still exists
// and replace raw U+2014 with &mdash;

const EM_DASH = String.fromCharCode(0x2014);
const EN_DASH = String.fromCharCode(0x2013);
const BULL    = String.fromCharCode(0x2022);
const HELLIP  = String.fromCharCode(0x2026);
const LSQUO   = String.fromCharCode(0x2018);
const RSQUO   = String.fromCharCode(0x2019);
const REG     = String.fromCharCode(0x00AE);
const TRADE   = String.fromCharCode(0x2122);
// Smart quotes — these break TS parsing when they appear as the string delimiter char
const LDQUO   = String.fromCharCode(0x201C);
const RDQUO   = String.fromCharCode(0x201D);

c = c.split(EM_DASH).join('&mdash;');
c = c.split(EN_DASH).join('&ndash;');
c = c.split(BULL).join('&bull;');
c = c.split(HELLIP).join('&hellip;');
c = c.split(LSQUO).join("'");
c = c.split(RSQUO).join("'");
c = c.split(REG).join('&reg;');
c = c.split(TRADE).join('&trade;');
// Smart double quotes — replace with HTML entities (safe inside TS string literals)
c = c.split(LDQUO).join('&ldquo;');
c = c.split(RDQUO).join('&rdquo;');

writeFileSync(p, c, 'utf8');

// Verify
const v = readFileSync(p, 'utf8');
const checks = [EM_DASH, EN_DASH, LDQUO, RDQUO, LSQUO, RSQUO, BULL, TRADE];
let found = false;
for (const ch of checks) {
  if (v.includes(ch)) {
    console.log('STILL HAS:', ch.codePointAt(0).toString(16));
    found = true;
  }
}
if (!found) console.log('All clean - no problematic Unicode chars remain');
const i = v.indexOf('Syntra v2');
if (i !== -1) console.log('Syntra v2:', JSON.stringify(v.substring(i, i+50)));
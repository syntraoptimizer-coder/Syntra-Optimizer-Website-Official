import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
let c = readFileSync(p, 'utf8');
const Q = String.fromCharCode(34);

// Find ALL occurrences of " (ASCII 34) that appear between word chars in HTML text content
// Pattern: word/space + " + space + word (not an attribute value)
// Replace those with &mdash;
c = c.split(' ' + Q + ' ').join(' &mdash; ');

writeFileSync(p, c, 'utf8');

// Verify no raw quote between spaces remains in text content
const count = (c.match(/ " /g) || []).length;
console.log('Remaining space-quote-space:', count);
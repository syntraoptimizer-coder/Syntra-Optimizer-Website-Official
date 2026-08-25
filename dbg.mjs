import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
const c = readFileSync(p, 'utf8');
const i = c.indexOf('Syntra v2');
const chunk = c.substring(i, i+25);
const codes = [];
for(let x=0;x<chunk.length;x++) codes.push(chunk.charCodeAt(x));
console.log(codes.join(','));
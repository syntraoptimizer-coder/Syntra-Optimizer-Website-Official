import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
let c = readFileSync(p, 'utf8');
// Fix the one remaining broken pattern: \" followed by &rdquo; in text
c = c.split('\\"&rdquo;').join('&mdash;');
c = c.split('\\"&ldquo;').join('&mdash;');
writeFileSync(p, c, 'utf8');
const v = readFileSync(p, 'utf8');
const i = v.indexOf('Syntra v2');
console.log('Syntra v2:', JSON.stringify(v.substring(i, i+55)));
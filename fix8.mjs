import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
let c = readFileSync(p, 'utf8');
const QT = String.fromCharCode(34);
// The actual sequence is: ASCII_34 + &rdquo; (not backslash-quote)
c = c.split(QT + '&rdquo;').join('&mdash;');
c = c.split(QT + '&ldquo;').join('&mdash;');
// Also fix any remaining space + ASCII_34 + space pattern that breaks TS
// but only when it appears inside an HTML text node (after > and before <)
c = c.split('>' + QT + ' ').join('>&mdash; ');
c = c.split(' ' + QT + '<').join(' &mdash;<');
writeFileSync(p, c, 'utf8');
const v = readFileSync(p, 'utf8');
const i = v.indexOf('Syntra v2');
console.log(JSON.stringify(v.substring(i, i+55)));
const codes = [];
const chunk = v.substring(i, i+15);
for(let x=0;x<chunk.length;x++) codes.push(chunk.charCodeAt(x));
console.log('codes:', codes.join(','));
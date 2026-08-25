import { readFileSync, writeFileSync } from 'fs';
const p = 'app/span/span-html.ts';
let c = readFileSync(p, 'utf8');
const Q = String.fromCharCode(34);
const BS = String.fromCharCode(92);

// Fix 1: class=&mdash; patterns — our replace broke HTML attribute escapes like class=\"
// Restore: &mdash; framer- back to escaped quote + space
c = c.split('=&mdash; framer-').join('=\\"framer-');
c = c.split('=&mdash; data-').join('=\\"data-');
c = c.split('=&mdash; hidden').join('=\\"hidden');
c = c.split('=&mdash; ssr-').join('=\\"ssr-');
c = c.split('class=&mdash;').join('class=\\"');
c = c.split('id=&mdash;').join('id=\\"');
c = c.split('style=&mdash;').join('style=\\"');
c = c.split('href=&mdash;').join('href=\\"');
c = c.split('src=&mdash;').join('src=\\"');
c = c.split('data-framer-name=&mdash;').join('data-framer-name=\\"');
c = c.split('name=&mdash;').join('name=\\"');
c = c.split('aria-label=&mdash;').join('aria-label=\\"');
c = c.split('tabindex=&mdash;').join('tabindex=\\"');
c = c.split('target=&mdash;').join('target=\\"');
c = c.split('role=&mdash;').join('role=\\"');
c = c.split('dir=&mdash;').join('dir=\\"');
c = c.split('type=&mdash;').join('type=\\"');
c = c.split('rel=&mdash;').join('rel=\\"');
c = c.split('alt=&mdash;').join('alt=\\"');
c = c.split('width=&mdash;').join('width=\\"');
c = c.split('height=&mdash;').join('height=\\"');
c = c.split('loading=&mdash;').join('loading=\\"');
c = c.split('decoding=&mdash;').join('decoding=\\"');
c = c.split('crossorigin=&mdash;').join('crossorigin=\\"');
c = c.split('placeholder=&mdash;').join('placeholder=\\"');
c = c.split('value=&mdash;').join('value=\\"');
c = c.split('for=&mdash;').join('for=\\"');
c = c.split('action=&mdash;').join('action=\\"');
c = c.split('method=&mdash;').join('method=\\"');
c = c.split('content=&mdash;').join('content=\\"');
c = c.split('media=&mdash;').join('media=\\"');
c = c.split('as=&mdash;').join('as=\\"');
c = c.split('property=&mdash;').join('property=\\"');

// Fix 2: Syntra v2 " now — the quote ASCII char casses the TS string
c = c.split('Syntra v2 ' + Q + ' now').join('Syntra v2 &mdash; now');

writeFileSync(p, c, 'utf8');
const v = readFileSync(p, 'utf8');
const i = v.indexOf('Syntra v2');
console.log('Syntra v2 context:', i !== -1 ? JSON.stringify(v.substring(i, i+50)) : 'not found');
const j = v.indexOf('class=&mdash;');
console.log('class=&mdash; remaining:', j !== -1 ? 'YES at ' + j : 'NONE - clean');
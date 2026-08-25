import { readFileSync, writeFileSync } from 'fs';
const path = 'app/span/span-html.ts';
let c = readFileSync(path, 'utf8');
// Remove literal backslash-u sequences left from previous runs
c = c.replaceAll('\\u201C', '');
c = c.replaceAll('\\u201D', '');
c = c.replaceAll('\\u2018', "'");
c = c.replaceAll('\\u2019', "'");
// Fix the residual backslash-quote before "now" — leftover from corrupted em dash
c = c.replace(/Syntra v2 \\\" now/g, 'Syntra v2 &mdash; now');
c = c.replace(/Discord \\\" /g, 'Discord &mdash; ');
c = c.replace(/refund \\\"/g, 'refund &mdash;');
// Remove any remaining isolated backslash-quote that isn't a real TS escape
c = c.replace(/(\\")(?=[a-z\s])/g, '&mdash; ');
// Replace raw Unicode that TS cant handle
c = c.replaceAll('\u2014', '&mdash;');
c = c.replaceAll('\u2013', '&ndash;');
c = c.replaceAll('\u201C', '&ldquo;');
c = c.replaceAll('\u201D', '&rdquo;');
c = c.replaceAll('\u2018', "'");
c = c.replaceAll('\u2019', "'");
c = c.replaceAll('\u2022', '&bull;');
c = c.replaceAll('\u2026', '&hellip;');
c = c.replaceAll('\u00AE', '&reg;');
c = c.replaceAll('\u2122', '&trade;');
writeFileSync(path, c, 'utf8');
console.log('Done');

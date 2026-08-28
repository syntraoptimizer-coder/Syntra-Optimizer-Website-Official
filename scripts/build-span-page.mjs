// Build script: port the downloaded Framer "Span" template into the Next.js homepage.
// - Extracts the template's <style> blocks + body markup
// - Flattens animation-split spans (char/word splits) into plain text
// - Neutralizes JS-only hidden states (opacity:0 -> 1)
// - Rewrites asset/font URLs to local files
// - Applies the Syntra Optimizer content map (text, links, logos)
// - Injects a tiny enhancement script (FAQ accordion)
// - Emits app/span/span-html.ts consumed by the React page
//
// Usage: node scripts/build-span-page.mjs [--dump]

import fs from 'node:fs'
import path from 'node:path'

const TEMPLATE = 'C:/Users/Luro/Downloads/span.framer.ai-1787405307381/index.html'
const OUT_DIR = '.freebuff/span-build'
const OUT_TS = 'app/span/span-html.ts'
const LOGO_VIDEO_SOURCE = 'C:/Users/Luro/Videos/Composition 1.mp4'
const LOGO_VIDEO_DEST = 'public/span/syntra-logo.mp4'

const html = fs.readFileSync(TEMPLATE, 'utf8')

// ── 1. Extract head <style> blocks ─────────────────────────────────────────
const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1] ?? ''
const styles = [...head.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/g)].map(m => m[1]).join('\n')

// ── 2. Extract body inner ──────────────────────────────────────────────────
const bodyMatch = html.match(/<body[^>]*>([\s\S]*?)<\/body>/)
if (!bodyMatch) throw new Error('No body found')
let body = bodyMatch[1]

// normalize newlines inside text (Framer splits lines with literal \n)
body = body.replace(/\s*\r?\n\s*/g, ' ')

// ── 3. Remove scripts, form, framer chrome ─────────────────────────────────
body = body
  .replace(/<script[^>]*>[\s\S]*?<\/script>/g, '')
  .replace(/<script[^>]*\/>/g, '')
  .replace(/<link[^>]*rel="modulepreload"[^>]*>/g, '')
  .replace(/<link[^>]*rel="preload"[^>]*>/g, '')
  .replace(/<form class="framer-4zbncr"[\s\S]*?<\/form>/g, '')
  .replace(/<div id="__framer-badge-container"[\s\S]*?<\/div>/g, '')
  .replace(/<div id="overlay"><\/div>/g, '')
  .replace(/<div id="overlay"[\s\S]*?<\/div>/g, '')
  .replace(/<div id="template-overlay"><\/div>/g, '')

// ── 4. Flatten per-char split spans (nav links etc. — random class prefix) ─
body = body.replace(/<span class="[A-Za-z0-9]{8}-span"[^>]*>([^<]*)<\/span>/g, '$1')
// some splitters use a different class shape
body = body.replace(/<span class="[A-Za-z0-9]{8}-span[^"]*"[^>]*>([^<]*)<\/span>/g, '$1')

// ── 5. Flatten the char-split hero "System™" wordmark (h1 line-mask-split) ─
body = body.replace(/<div class="char"[^>]*>([^<]*)<\/div>/g, '$1')

// ── 6. Flatten scroll-reveal word spans to plain text (preserve spaces) ────
body = body.replace(
  /<span style="display: inline-block; margin-right: 0\.25em;[^"]*">([^<]*)<\/span>/g,
  '$1 '
)

// ── 7. Neutralize JS-only hidden states (opacity:0 -> 1) in inline styles ──
body = body.replace(
  /(style="[^"]*?)(?:opacity:\s*0(?=[;"\s]))/g,
  '$1opacity: 1'
)// ── 8. Local asset rewrites ────────────────────────────────────────────────
body = body.replace(/(["'])\.\/images\//g, '$1/span/images/')
body = body.replace(/&quot;\.\/images\//g, '&quot;/span/images/')
body = body.replace(/\s+srcset="[^"]*"/g, '')

// ── 9. Link targets (routes exist on this site) ────────────────────────────
const LINK_MAP = [
  ['./pages/..html', '/'],
  ['./pages/waitlist.html', '/checkout?plan=premium'],
  ['./pages/pricing.html', '#pricing'],
  ['./pages/updates.html', '/changelog'],
  ['./pages/blog.html', '/teams'],
  ['./pages/careers.html', '/dashboard'],
  ['./pages/about.html', '#features'],
  ['./pages/contact.html', '#faq'],
  ['./pages/privacy-policy.html', '/privacy'],
  ['./pages/terms-of-service.html', '/terms'],
  ['./pages/mailto:hello@span.ai.html', 'https://discord.gg/syntra'],
  ['https://instagram.com', 'https://discord.gg/syntra'],
  ['https://youtube.com', 'https://discord.gg/syntra'],
  ['https://x.com', 'https://discord.gg/syntra'],
  ['https://tiktok.com', 'https://discord.gg/syntra'],
  ['https://facebook.com', 'https://discord.gg/syntra'],
]
for (const [find, rep] of LINK_MAP) {
  body = body.split(find).join(rep)
}

// ── 10. Logos ──────────────────────────────────────────────────────────────
// Nav + footer wordmark -> Syntra logo
body = body.split('/span/images/AkaNUFNmyu51UrpEidt9k7PbVY8.png').join('/syntra-logo.png')
// Hero "Full Logo" raster (the System™ wordmark is text now) -> drop the img
body = body.replace(/<img[^>]*src="\/span\/images\/SolTjI9w08XPWH3a9RS8BXj4TZA\.png"[^>]*>/g, '')

// ── 11. Hero "Watch Demo" button -> View Pricing (href #pricing) ───────────
body = body.replace(
  /(<a[^>]*?href=")[^"]*("[\s\S]{0,4000}?Watch Demo)/,
  '$1#pricing$2'
)

// ── 12. Content replacements ───────────────────────────────────────────────
let n = 0
function must(find, rep, min = 1) {
  const count = body.split(find).length - 1
  if (count < min) throw new Error(`REPLACEMENT ${n} NOT FOUND (${count}x): ${find.slice(0, 90)}`)
  body = body.split(find).join(rep)
  console.log(`  [${n}] ${count}x  ${find.slice(0, 70)}`)
  n++
}
function mustNth(find, reps) {
  const parts = body.split(find)
  const count = parts.length - 1
  if (count !== reps.length) {
    throw new Error(`REPLACEMENT ${n} occurrence mismatch for "${find.slice(0, 60)}": found ${count}, expected ${reps.length}`)
  }
  const out = [parts[0]]
  for (let i = 0; i < reps.length; i++) out.push(reps[i], parts[i + 1])
  body = out.join('')
  console.log(`  [${n}] ${count}x  ${find.slice(0, 70)} (positional)`)
  n++
}

console.log('Applying content replacements…')

// ── Announcement toast ──
must('Did you know?', 'New update')
must('Only 3 in 10 ad landing pages actually match what the ad that brought the click promised.',
  'Syntra v2 — now with advanced memory tuning')

// ── Hero ──
must('Workflow Studio 2.0 is now live', 'Syntra v2 is now live — advanced memory tuning')
must('Deploy&#160;AI systems that run your B2B operations',
  'Optimize your PC.<br><span style="opacity:0.55">Instantly.</span>')
must('Span  gives B2B companies the infrastructure to deploy AI workflows across sales, support, and operations in days.',
  'Syntra scans, fixes, and fine-tunes your Windows machine in one click — debloating, tuning your network, and squeezing every last frame from your games.')
must('Join Waitlist', 'Get Started')
must('Watch Demo', 'View Pricing')
must('No credit card required · 14-day trial · SOC 2 Type II certified',
  'No subscription · Lifetime updates · Windows 10 & 11')
must('>6<', '>NEW<')
must('Deploy time', 'Avg FPS boost')
must('9 days', '+30%')
must('Pipeline lift', 'Boot time saved')
must('+38%', '41%')
must('SOC 2', 'Optimization score')
must('Type II', '92/100')
must('Trusted by revenue and operations teams at', 'Trusted by 100+ gamers and creators')

// ── Problem / Solution ──
must('The Problem', 'Why Syntra')
must('Span helps B2B teams automate operations, streamline communication, and scale workflows with AI-powered systems built for modern businesses.',
  'Syntra Optimizer boosts Windows performance, cleans your system, and squeezes every last frame from your games — all in one click.')
must('From lead qualification to internal coordination, Span reduces manual work and turns fragmented processes into efficient operational pipelines.',
  'From boot times to latency, Syntra finds the invisible bloat slowing your PC down and turns a sluggish machine into a fast one.')
must('The Solution', 'The Syntra Suite')
must('One platform. Three compounding outcomes.', 'One app. Three compounding outcomes.')
must('Three operational pillars. One integrated platform that brings everything together.',
  'Three optimization pillars. One integrated app that brings everything together.')
must('Clarify the offer', 'Windows Performance')
must('Encode your ICP, pricing, and value into a single source of truth your AI can speak from.',
  'Boost responsiveness, speed up startup, and eliminate background activity. Disable telemetry and remove auto-start programs.')
must('Automate operations', 'Gaming Experience')
must('Turn repeatable revenue and support motions into deterministic AI workflows with audit trails.',
  'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources for consistent high frames.')
must('Increase conversions', 'Network Boost')
must('Route every signal to the right action — instantly. Measure outcomes against KPIs, not vibes.',
  'Reduce latency with TCP/IP stack tuning, DNS prefetch, and QoS prioritization. Cut your average ping by 15–30ms.')

// ── How it Works ──
must('How it Works', 'How it works')
must('From business logic to deployed AI in days.', 'From install to optimized in minutes.')
must('One platform. Three compounding outcomes.', '281 reversible tweaks. Built for better performance.', 2)
must('Deep Cleanup', 'Network Boost', 1)
must('Network Boost', 'Deep Cleanup', 1)
must('Connect business logic', 'Scan your system')
must('Sync your CRM, docs, and tools. Relay ingests entities, policies, and playbooks.',
  'Syntra analyzes your Windows install — startup items, services, network stack, and memory — and builds a health report.')
must('Deploy AI workflows', 'Apply the fixes')
must('Compose agents, prompts, and guardrails in Studio. Ship to production with one click.',
  'One click applies every optimization: debloat, network tuning, memory tweaks, and game settings.')
must('Scale the system', 'Play and enjoy')
must('Monitor KPIs, version workflows, and roll out improvements safely across the org.',
  'Watch your FPS climb, boot times shrink, and ping drop. Re-run or revert any tweak anytime.')

// ── Product showcase ──
must('Inside the Product', 'Inside the App')
must('See Span in actiion', 'See Syntra in action')
must('Span dashboard', 'Syntra dashboard')

// ── Features (order matters: eyebrow first, then About->Features) ──
must('Features', 'Performance Suite', 1)
must('Built for revenue, ops, and support teams.', 'Everything your PC needs to perform at its best.')
must('Pre-built system templates for the most critical B2B automation use cases — deployable in hours.',
  'Professional-grade tools built to maximize Windows performance, boost gaming FPS, reduce latency, and keep your machine clean.')
mustNth('AI Operations', ['Gaming Experience', 'Deep Cleanup'])
must('AI Sales', 'Windows Performance')
must('AI Support', 'Network Boost')
must('Workflow Automation', 'Memory Optimization')
must('Compliance Guardrails', 'Advanced Tweaks')
must('Inbound qualification, outbound research, MEDDIC scoring, and pipeline acceleration.',
  'Boost responsiveness, speed up startup, and eliminate background activity. Disable telemetry, clean registry bloat, and remove auto-start programs.')
must('Procurement, finance ops, internal request automation, and process orchestration.',
  'Improve FPS, reduce stuttering, minimize input lag, and optimize CPU and GPU resources. Per-game priority and HAGS for consistent high frames.')
must('Tier-1 resolution, ticket triage, knowledge synthesis, and agent-assisted escalation.',
  'Reduce latency with TCP/IP stack tuning, DNS prefetch, Nagle algorithm disable, and QoS prioritization.')
must('Real-time enrichment and routing across channels, with intent-based scoring.',
  'Remove temp files, cache, and system clutter. Recover 8–15GB on average.')
must('Multi-step processes with human-in-loop, conditional branching, and retries.',
  'Release trapped kernel memory, compress standby list, and keep RAM allocation optimal during intensive sessions.')
must('Policy-aware agents with audit logs and approvals, ensuring regulatory traceability.',
  'Expose BIOS-level settings, Resizable BAR, XMP/EXPO memory profiles, and GPU driver tweaks.')

// ── Results ──
must('Results', 'Benchmarks')
must('What changes when systems replace processes', 'Real hardware, real gains')
must('Measured outcomes across 340+ enterprise deployments in the past 18 months.',
  'Average FPS measured on real PC configurations before and after Syntra Game Optimizer.')
must('Span replaced three tools and a full-time ops hire.',
  'Syntra replaced three tools and a full-time optimizer.')
must('We went from manually triaging 400 inbound leads a week to having a live workflow that qualifies, enriches, and routes every single one in under a minute.',
  'We went from manually tweaking 40 registry keys a week to one click that fixes everything in under a minute.')
must("It's the closest thing to an AI coworker I've seen actually work in production.",
  "It's the closest thing to a game optimizer I've seen actually work in production.")
must('Jordan Mercer', 'Da1ko')
must('Northwind Logistics', 'Valorant Player')
must('94%', '+30%')
must('68.0x', '41%')
must('68%', '92/100')
must('38%', '4.8/5')
must('Reduction in response time', 'Average FPS boost')
must('Increase in qualified pipeline', 'Boot time saved')
must('Reduction in manual ops work', 'Optimization score')
must('Reduction in operational costs', 'Average rating')

// ── Testimonials (quotes first — they contain "Span") ──
const Q1 = 'Huge thanks — absolutely incredible! My PC feels much faster, everything is smoother, and I noticed the improvement right away.'
const Q2 = "I didn't expect such a huge improvement. My PC boots faster, games run noticeably smoother, and I've gained several FPS. Just a few clicks."
const Q3 = "I've tried several tools before, but this genuinely stands out. My system feels more responsive and gaming performance has noticeably improved."
const Q4 = 'Surprised by how much of a difference this made. No more stutters while gaming. Quick and straightforward. Definitely worth trying.'
const Q5 = 'Syntra Optimizer exceeded my expectations. Faster system, smoother multitasking, better game stability. One-click optimization is incredibly convenient.'
const Q6 = 'Been using it for a few days — difference is clear. Shorter boot times, smoother games, improved performance. Reliable and does what it promises.'

must('"R&amp;D allocation was a complete black box before Span. Now I see FTE costs per project clearly and confidently. It turned a guessing game into an actual budget conversation."', `"${Q1}"`)
must('"Responsive, curious, genuinely collaborative at every step. Feature requests get real engagement, not just a ticket number. Rare to find that level of care after the sale."', `"${Q2}"`)
must('"PR cycle time views and bottleneck flags are genuinely useful day to day. Customization feels limited at our scale, but the core insight is consistently solid and actionable."', `"${Q3}"`)
must('"Plugged Span in over a weekend, had DORA metrics by Monday morning. Zero workflow changes for the team. That zero-integration promise is completely real and I didn\'t expect it."', `"${Q4}"`)
must('I used to guess at AI adoption across our eng org. Now I walk into board meetings with real, defensible numbers. That shift alone justified the subscription within the first month.', `"${Q5}"`)
must('"Color-coded bottleneck tiles sound gimmicky at first — they\'re really not. My leads review them every morning and it\'s changed how we prioritize code review bandwidth fast."', `"${Q6}"`)
must('"Most tools in this space demand a three-week setup ritual. We were fully live in hours. Even our senior devs appreciated that it never touched their existing daily workflow."', `"${Q1}"`)
must('"One misaligned sprint costs more than a full year of Span. The Slack alerts keep nothing hidden from the team. ROI was obvious to everyone within the first two weeks."', `"${Q2}"`)
must('"Detection accuracy is seriously impressive — we can finally quantify copilot ROI with confidence. Would love deeper multi-tool breakdowns, but it leads the space by a margin."', `"${Q3}"`)

must('Tom Wierstra', 'Da1ko')
must('Stackwell', 'Valorant Player')
must('Aiko Tanaka', 'Crinok')
must('Devlane', 'FPS Player')
must('Priya Nair', 'NovalPusl')
must('Freightly', 'PC Enthusiast')
must('Sarah Mitchell', 'Zenitud')
must('Finmark', 'Casual Gamer')
must('Daniel Osei', 'Kevin12')
must('Loopbase', 'PC Gamer')
must('Lena Hoffmann', 'Min12_')
mustNth('Bridgestack', ['Daily User', 'Daily User', 'Valorant Player', 'Valorant Player'])
must('James Okafor', 'Da1ko')
must('Clara Voss', 'Crinok')
must('Risepoint', 'FPS Player')
must('Reubne Clark', 'NovalPusl')
must('Medsync', 'PC Enthusiast')

// ── Integrations ──
must('Integrations', 'Supported Games')
must('Integrates with your existing tools', 'Works with every game you play')
must('Native integrations with the tools your team already uses. No rip-and-replace required.',
  'Syntra applies system-wide tweaks that benefit every title — no per-game setup needed.')
must('50+ native integrations — HubSpot, Salesforce, Slack, Stripe, OpenAI, Zapier, and more.',
  '100,000+ titles supported — Valorant, Fortnite, CS2, GTA V, Apex Legends, and more.')

// ── FAQ ──
must('Questions? Here are the answers.', 'Questions, answered.')
must('Everything you need to know about deploying Span inside your B2B operation.',
  'Everything you need to know about optimizing with Syntra.')
must('Get a custom walkthrough with a solutions engineer, no pressure, no pitch deck.',
  'Jump into our Discord — real humans, fast answers.')
must('Reach out to us', 'Contact us')
must('How long does it take to deploy Span into our existing stack?', 'Is Syntra safe to use on my PC?')
must('Do we need an engineering team to set up and maintain workflows?', 'Which versions of Windows are supported?')
must('How does Span handle data security and compliance?', 'What is your refund policy?')
must('Can Span integrate with tools we already use — HubSpot, Salesforce, Slack?', 'How does the Done-For-You service work?')
must("What's the difference between Span and tools like Zapier or Make?", 'Is remote access safe for the Done-For-You plan?')
must('What does pricing look like — and is there a free trial?', 'Will optimizing affect my warranty or files?')

// ── CTA ──
must('Get started', 'Start optimizing today', 1)
must('Start automating your workflows today', 'Your PC has more to give.')
must('Build and deploy AI systems that streamline operations, reduce manual work, and scale your B2B processes.',
  'Join 100+ gamers and creators running faster, cleaner machines. Optimize in minutes — or let an expert handle it for you.')
must('Learn more', 'Explore features')

// ── Footer ──
must('AI-powered operations infrastructure for B2B companies. Deploy sales, support, and workflow automation in days.',
  'PC optimization infrastructure for gamers and creators. Boost FPS, clean Windows, reduce latency — in one click.')
must('Resources', 'Product')
must('Get in touch', 'Resources')
must('About', 'Features')
must('Careers', 'Dashboard')
must('Contact', 'FAQ')
must('Updates', 'Changelog')
must('Blog', 'Teams')
must('HIRING', 'NEW')
must('©2026 Span. All rights reserved.', '© 2026 Syntra Optimizer. All rights reserved.')
must('Create a free website with Framer, the website builder loved by startups, designers and agencies.',
  'Built for Windows 10 & 11.')

// ── Hero wordmark ──
must('System™', 'Syntra™')

// ── 13. Enhancement script (FAQ accordion) ─────────────────────────────────
const FAQ_ANSWERS = [
  'Yes. Every change Syntra makes is reversible, and the app creates a restore point before optimizing. You can review and undo any tweak at any time.',
  'Syntra fully supports Windows 10 and Windows 11 (64-bit). Older versions are not supported.',
  'If Syntra does not improve your system, contact us within 14 days of purchase for a full refund — no questions asked.',
  'After booking, a Syntra expert connects to your PC through a secure remote tool. They run the full optimization while you watch, then share a before/after report.',
  'Absolutely. Sessions use encrypted, one-time access that you approve and can end instantly. Access is revoked the moment the session finishes.',
  'No. Syntra only adjusts software settings and clears temporary data — it never touches your personal files or hardware warranty.',
]
const ENHANCE_JS = `(function(){
  var ANSWERS = ${JSON.stringify(FAQ_ANSWERS)};
  var items = Array.prototype.slice.call(document.querySelectorAll('.framer-okz85z-container [tabindex="0"]'));
  if (!items.length) return;
  items.forEach(function(item, idx){
    if (idx >= ANSWERS.length) return;
    var a = document.createElement('div');
    a.className = 'syntra-faq-answer';
    a.textContent = ANSWERS[idx];
    a.style.cssText = 'display:none;padding:0 2px 24px;font-size:0.9rem;line-height:1.7;color:rgba(255,255,255,0.45);letter-spacing:-0.02em;';
    item.appendChild(a);
    item.addEventListener('click', function(){
      var open = a.style.display === 'block';
      items.forEach(function(o){
        var oa = o.querySelector('.syntra-faq-answer');
        if (oa) oa.style.display = 'none';
        o.style.backgroundColor = '';
      });
      a.style.display = open ? 'none' : 'block';
      if (!open) item.style.backgroundColor = 'rgba(255,255,255,0.03)';
    });
  });
})();`

// ── 14. Font URL rewrites (local copies in /span/images) ───────────────────
function rewriteFonts(css) {
  return css
    .replace(/https:\/\/framerusercontent\.com\/assets\/([A-Za-z0-9]+)\.woff2/g, '/span/images/assets_$1.woff2')
    .replace(/https:\/\/framerusercontent\.com\/third-party-assets\/fontshare\/wf\/([^/"']+)\/([^/"']+)\/([^/"']+)\.woff2/g, '/span/images/third-party-assets_fontshare_wf_$1_$2_$3.woff2')
    .replace(/https:\/\/fonts\.gstatic\.com\/s\/([^/"']+)\/([^/"']+)\/([^/"']+)\.woff2/g, '/span/images/s_$1_$2_$3.woff2')
    .replace(/https:\/\/fonts\.gstatic\.com\/s\/([^/"']+)\/([^/"']+)\.woff2/g, '/span/images/s_$1_$2.woff2')
}
const stylesFinal = rewriteFonts(styles)

fs.mkdirSync(OUT_DIR, { recursive: true })
fs.mkdirSync(path.dirname(LOGO_VIDEO_DEST), { recursive: true })
if (fs.existsSync(LOGO_VIDEO_SOURCE)) {
  fs.copyFileSync(LOGO_VIDEO_SOURCE, LOGO_VIDEO_DEST)
  console.log(`copied hero logo video to ${LOGO_VIDEO_DEST}`)
} else {
  console.warn(`hero logo source not found: ${LOGO_VIDEO_SOURCE}`)
}
fs.writeFileSync(path.join(OUT_DIR, 'styles.css'), stylesFinal)
fs.writeFileSync(path.join(OUT_DIR, 'body.html'), body)

// ── 15. Final verification ─────────────────────────────────────────────────
const leftovers = [...body.matchAll(/\bSpan\b/g)].length
console.log(`\nremaining "Span" occurrences in body: ${leftovers}`)
if (leftovers > 0) {
  const re = /[^]{60}\bSpan\b[^]{80}/g
  let m
  while ((m = re.exec(body))) {
    console.log('   …', m[0].replace(/\n/g, ' ').trim().slice(0, 150))
    if (--leftovers <= 0) break
  }
}
const leftSystem = (body.match(/System™/g) || []).length
console.log(`remaining "System™": ${leftSystem}`)

if (process.argv.includes('--dump')) {
  const links = [...new Set([...body.matchAll(/<a[^>]*href="([^"]+)"/g)].map(m => m[1]))]
  console.log('\n── final link targets:', links.length)
  links.forEach(u => console.log('  ', u))
  const imgs = [...new Set([...body.matchAll(/<img[^>]*src="([^"]+)"/g)].map(m => m[1]))]
  console.log('\n── img srcs:', imgs.length)
  imgs.slice(0, 20).forEach(u => console.log('  ', u))
}

// ── 16. Split body at the FAQ section so React can slot <Pricing/> between ──
//      the Integrations section and the FAQ section.
const SPLIT_MARKER = '<div class="framer-278p6r" data-framer-name="FAQ" id="general-content-faq">'
const splitIdx = body.indexOf(SPLIT_MARKER)
if (splitIdx < 0) throw new Error('FAQ split marker not found')
const bodyPre = body.slice(0, splitIdx)
const bodyPost = body.slice(splitIdx)

// ── 17. Write the TS module ────────────────────────────────────────────────
const stylesJson = JSON.stringify(stylesFinal)
const bodyPreJson = JSON.stringify(bodyPre)
const bodyPostJson = JSON.stringify(bodyPost)
const enhanceJson = JSON.stringify(ENHANCE_JS)
const ts = `// AUTO-GENERATED by scripts/build-span-page.mjs — do not edit by hand.\n` +
  `// Pixel-perfect HTML/CSS of the downloaded Framer "Span" template with\n` +
  `// Syntra Optimizer content and local asset paths applied.\n\n` +
  `export const SPAN_STYLES: string = ${stylesJson}\n\n` +
  `export const SPAN_BODY_PRE: string = ${bodyPreJson}\n\n` +
  `export const SPAN_BODY_POST: string = ${bodyPostJson}\n\n` +
  `export const SPAN_ENHANCE_JS: string = ${enhanceJson}\n`
fs.mkdirSync(path.dirname(OUT_TS), { recursive: true })
fs.writeFileSync(OUT_TS, ts)
console.log(`\nwrote ${OUT_TS} (styles ${(stylesJson.length / 1024).toFixed(0)}KB, pre ${(bodyPreJson.length / 1024).toFixed(0)}KB, post ${(bodyPostJson.length / 1024).toFixed(0)}KB)`)

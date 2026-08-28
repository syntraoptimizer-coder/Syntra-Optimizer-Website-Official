'use client'

import { useEffect } from 'react'

/* ─── Data ─────────────────────────────────────────────────────── */
const FAQ = [
  { q: 'Is Syntra safe to use on my PC?',           a: 'Yes. Every change Syntra makes is reversible, and the app creates a restore point before optimizing. You can review and undo any tweak at any time.' },
  { q: 'Which versions of Windows are supported?',  a: 'Syntra fully supports Windows 10 and Windows 11 (64-bit). Older versions are not supported.' },
  { q: 'What is your refund policy?',               a: 'If Syntra does not improve your system, contact us within 14 days of purchase for a full refund — no questions asked.' },
  { q: 'How does the Done-For-You service work?',   a: 'After booking, a Syntra expert connects to your PC through a secure remote tool. They run the full optimization while you watch, then share a before/after report.' },
  { q: 'Is remote access safe?',                    a: 'Absolutely. Sessions use encrypted, one-time access that you approve and can end instantly. Access is revoked the moment the session finishes.' },
  { q: 'Will optimizing affect my warranty or files?', a: 'No. Syntra only adjusts software settings and clears temporary data — it never touches your personal files or hardware warranty.' },
]

const HIW = {
  self: [
    { step: '01', title: 'Download the app',       desc: 'Get the Syntra Optimizer — a single .exe, no install required. Launch it and see your system score instantly.' },
    { step: '02', title: 'Optimize in one click',  desc: 'Apply any of 281 reversible tweaks. Watch live CPU, GPU and RAM stats as each change takes effect immediately.' },
    { step: '03', title: 'Feel the difference',    desc: 'Higher FPS, faster boot, lower ping. Every tweak can be undone at any time — nothing is permanent unless you want it.' },
  ],
  dfy: [
    { step: '01', title: 'Pick your session',      desc: 'Choose your package and book a time that works for you. Most sessions are available within 1 to 2 days.' },
    { step: '02', title: 'A specialist connects',  desc: 'A Syntra expert connects remotely through a secure, one-time session. You watch every step live.' },
    { step: '03', title: 'PC fully optimized',     desc: 'Drivers, BIOS, network, game settings — all tuned for your exact hardware. You get a before/after report.' },
  ],
}

const VOUCHES = [
  { name: 'Da1ko',     handle: '@da1ko_',    date: 'Oct 2025', text: 'Really high quality, fast, smooth, zero problems. Solid gains that keep the FPS drops away.' },
  { name: 'Crinok',    handle: '@cr1nok',    date: 'Nov 2025', text: "I didn't expect such a huge improvement. My PC boots faster, games run noticeably smoother. Just a few clicks." },
  { name: 'NovalPusl', handle: '@novalpusl', date: 'Nov 2025', text: 'Absolutely insane. Rock-solid performance. This genuinely stands out from every other tool I tried.' },
  { name: 'Zenitud',   handle: '@zenitud_',  date: 'Dec 2025', text: 'Surprised by how much of a difference this made. No more stutters while gaming. Worth every penny.' },
  { name: 'Kevin12',   handle: '@kevin12__', date: 'Jan 2026', text: 'Syntra exceeded my expectations. Faster system, smoother multitasking, better game stability.' },
  { name: 'Min12_',    handle: '@min12_',    date: 'Mar 2026', text: 'Difference is clear. Shorter boot times, smoother games, improved performance. Does exactly what it promises.' },
]

const GAME_LOGOS = [
  { src: '/images/game-valorant.png',  alt: 'Valorant' },
  { src: '/images/game-fortnite.png',  alt: 'Fortnite' },
  { src: '/images/game-apex.jpg',      alt: 'Apex Legends' },
  { src: '/images/game-cs2.png',       alt: 'Counter-Strike 2' },
  { src: '/images/game-gta5.jpg',      alt: 'GTA V' },
  { src: '/images/game-minecraft.png', alt: 'Minecraft' },
  { src: '/images/game-cyberpunk.png', alt: 'Cyberpunk 2077' },
  { src: '/images/game-roblox.png',    alt: 'Roblox' },
]

const AV_COLORS = [
  'linear-gradient(135deg,#144dc7,#3b82f6)',
  'linear-gradient(135deg,#6366f1,#8b5cf6)',
  'linear-gradient(135deg,#0ea5e9,#38bdf8)',
  'linear-gradient(135deg,#10b981,#34d399)',
  'linear-gradient(135deg,#f59e0b,#fbbf24)',
  'linear-gradient(135deg,#ec4899,#f472b6)',
]

/* ─── Inline SVGs ───────────────────────────────────────────────── */
const ARROW   = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`
const DL      = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`
const SLIDERS = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>`
const ZAP     = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`
const SHIELD  = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/></svg>`
const EYE     = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>`
const STAR    = `<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.12 2.12 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.12 2.12 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.12 2.12 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16z"/></svg>`
const PLUS    = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none"><line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>`
const STEP_ICONS = [
  `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/></svg>`,
  `<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
]

/* ─── CSS ───────────────────────────────────────────────────────── */
const CSS = `
.sn-announce{position:fixed;top:0;left:0;right:0;z-index:200;display:flex;align-items:center;justify-content:center;gap:10px;height:36px;padding:0 48px 0 16px;background:#000309;border-bottom:1px solid rgba(20,77,199,0.22);font-family:'Geist','Switzer',sans-serif;font-size:.76rem;color:rgba(255,255,255,.48);letter-spacing:-.02em;white-space:nowrap;overflow:hidden;}
.sn-announce svg{flex-shrink:0;color:#b8d7ff;}
.sn-announce a{color:#b8d7ff;font-weight:600;text-decoration:none;display:inline-flex;align-items:center;gap:4px;}
.sn-announce a:hover{opacity:.72;}
.sn-announce-x{position:absolute;right:14px;background:none;border:none;color:rgba(255,255,255,.28);cursor:pointer;font-size:17px;line-height:1;padding:0 4px;}
.sn-announce-x:hover{color:rgba(255,255,255,.6);}
.sn-bar-offset{margin-top:36px;}

.sn-hiw{width:100%;max-width:1100px;margin:0 auto;padding:100px 24px 80px;}
.sn-section-head{text-align:center;margin-bottom:48px;}
.sn-eyebrow{display:inline-flex;align-items:center;gap:7px;font-family:ui-monospace,'Fragment Mono',monospace;font-size:.7rem;font-weight:400;letter-spacing:.1em;text-transform:uppercase;color:#b8d7ff;margin-bottom:12px;}
.sn-eyebrow::before{content:'';width:6px;height:6px;border-radius:50%;background:#144dc7;box-shadow:0 0 8px #144dc7;}
.sn-h2{margin:0 0 14px;font-family:'Geist','Switzer',sans-serif;font-size:clamp(1.9rem,3.5vw,2.9rem);font-weight:600;letter-spacing:-.055em;line-height:1.08;color:#fff;}
.sn-h2 em{font-style:italic;font-family:'Instrument Serif',Georgia,serif;font-weight:400;color:rgba(255,255,255,.4);}
.sn-section-sub{font-family:'Switzer','Geist',sans-serif;font-size:.95rem;color:rgba(255,255,255,.45);line-height:1.65;max-width:50ch;margin:0 auto;letter-spacing:-.03em;}
.sn-toggle{display:inline-flex;align-items:center;position:relative;padding:4px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1);border-radius:40px;margin-bottom:40px;}
.sn-toggle-thumb{position:absolute;top:4px;bottom:4px;border-radius:40px;background:rgba(20,77,199,.22);border:1px solid rgba(20,77,199,.4);transition:left .22s cubic-bezier(.4,0,.2,1),width .22s cubic-bezier(.4,0,.2,1);pointer-events:none;z-index:0;}
.sn-tab{position:relative;z-index:1;padding:8px 22px;border:none;background:none;border-radius:40px;font-family:'Geist','Switzer',sans-serif;font-size:.86rem;font-weight:500;letter-spacing:-.03em;cursor:pointer;color:rgba(255,255,255,.4);transition:color .15s;white-space:nowrap;}
.sn-tab.is-active{color:#fff;}
.sn-flow-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:12px;list-style:none;padding:0;margin:0;}
.sn-panel{display:none;}
.sn-panel.is-active{display:block;}
.sn-flow-card{background:#0a1628;border:1.5px solid rgba(14,31,66,.9);border-radius:20px;overflow:hidden;transition:border-color .2s,transform .2s,box-shadow .2s;}
.sn-flow-card:hover{border-color:rgba(20,77,199,.35);transform:translateY(-3px);box-shadow:0 8px 40px -12px rgba(20,77,199,.3);}
.sn-flow-visual{width:100%;aspect-ratio:4/3;background:linear-gradient(135deg,#0a1f42 0%,#060d1e 100%);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.sn-flow-dots{position:absolute;inset:0;background-image:radial-gradient(circle,rgba(184,215,255,.1) 1px,transparent 1px);background-size:28px 28px;mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,#000 30%,transparent 100%);}
.sn-flow-icon{width:62px;height:62px;border-radius:16px;background:rgba(20,77,199,.2);border:1px solid rgba(20,77,199,.3);display:flex;align-items:center;justify-content:center;position:relative;z-index:1;}
.sn-flow-icon svg{color:#b8d7ff;}
.sn-flow-body{padding:22px 22px 24px;}
.sn-flow-step{display:inline-flex;align-items:center;gap:6px;font-family:ui-monospace,monospace;font-size:.68rem;color:#b8d7ff;letter-spacing:.06em;margin-bottom:10px;}
.sn-flow-step i{width:1px;height:10px;background:rgba(184,215,255,.25);}
.sn-flow-h3{margin:0 0 8px;font-family:'Geist','Switzer',sans-serif;font-size:1.05rem;font-weight:600;color:#fff;letter-spacing:-.04em;line-height:1.25;}
.sn-flow-p{margin:0;font-size:.85rem;line-height:1.65;color:rgba(255,255,255,.45);letter-spacing:-.02em;}
.sn-hiw-cta{text-align:center;margin-top:40px;}
.sn-hiw-btn{display:inline-flex;align-items:center;gap:8px;padding:12px 24px;background:#fff;color:#000309;border-radius:13px;font-family:'Switzer','Geist',sans-serif;font-size:15px;font-weight:600;letter-spacing:-.04em;text-decoration:none;transition:transform .15s,filter .15s;}
.sn-hiw-btn:hover{transform:translateY(-1px);filter:brightness(1.04);}

.sn-games{width:100%;padding:72px 0;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden;}
.sn-games-head{text-align:center;margin-bottom:44px;padding:0 24px;}
.sn-games-title{margin:8px 0 0;font-family:'Geist','Switzer',sans-serif;font-size:clamp(1.7rem,3.2vw,2.6rem);font-weight:600;letter-spacing:-.055em;color:#fff;line-height:1.1;}
.sn-games-title em{font-style:italic;font-family:'Instrument Serif',Georgia,serif;font-weight:400;color:rgba(255,255,255,.4);}
.sn-games-rule{width:100%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.08) 20%,rgba(255,255,255,.08) 80%,transparent);margin-top:16px;}
.sn-mq-mask{mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);}
@keyframes sn-mq{from{transform:translateX(0);}to{transform:translateX(-50%);}}
.sn-mq-track{display:flex;width:max-content;align-items:center;gap:48px;padding:16px 24px;animation:sn-mq 32s linear infinite;will-change:transform;}
.sn-mq-track:hover{animation-play-state:paused;}
.sn-game-logo{display:block;height:180px;width:320px;object-fit:cover;flex-shrink:0;opacity:.9;border-radius:12px;border:1px solid rgba(255,255,255,.1);box-shadow:0 8px 30px rgba(0,0,0,.28);transition:opacity .2s,transform .2s,border-color .2s;}
.sn-game-logo:hover{opacity:1;transform:translateY(-3px);border-color:rgba(184,215,255,.35);}

.sn-vouches{display:none!important;border-top:1px solid rgba(255,255,255,.06);border-bottom:1px solid rgba(255,255,255,.06);overflow:hidden;}
.sn-vouches-head{max-width:1100px;margin:0 auto;padding:96px 24px 48px;text-align:center;}
.sn-vc-mask{mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 8%,#000 92%,transparent 100%);padding-bottom:96px;}
@keyframes sn-vc{from{transform:translateX(0);}to{transform:translateX(-33.333%);}}
.sn-vc-track{display:flex;width:max-content;animation:sn-vc 48s linear infinite;will-change:transform;}
.sn-vc-track:hover{animation-play-state:paused;}
.sn-vc-card{flex-shrink:0;width:318px;margin:0 6px;background:#0a1628;border:1.5px solid rgba(14,31,66,.9);border-radius:20px;padding:22px 22px 20px;transition:border-color .2s,transform .2s;}
.sn-vc-card:hover{border-color:rgba(20,77,199,.35);transform:translateY(-2px);}
.sn-vc-head{display:flex;align-items:center;gap:10px;margin-bottom:12px;}
.sn-vc-av{width:40px;height:40px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-family:'Geist',sans-serif;font-size:.68rem;font-weight:700;color:rgba(255,255,255,.9);}
.sn-vc-who{display:flex;flex-direction:column;gap:2px;}
.sn-vc-name{font-family:'Geist','Switzer',sans-serif;font-size:.88rem;font-weight:600;color:#fff;letter-spacing:-.03em;line-height:1.2;}
.sn-vc-handle{font-family:ui-monospace,monospace;font-size:.67rem;color:rgba(255,255,255,.36);}
.sn-vc-stars{display:flex;gap:2px;margin-bottom:10px;}
.sn-vc-stars svg{color:#f5c518;}
.sn-vc-text{margin:0 0 14px;font-size:.84rem;line-height:1.65;color:rgba(255,255,255,.5);letter-spacing:-.02em;}
.sn-vc-date{display:block;font-family:ui-monospace,monospace;font-size:.67rem;color:rgba(255,255,255,.24);border-top:1px solid rgba(255,255,255,.07);padding-top:13px;}

.sn-faq{width:min(680px,calc(100% - 48px));margin:0 auto;padding:96px 0 110px;text-align:center;}
.sn-faq-title{margin:0;font-family:'Geist','Switzer',sans-serif;font-size:clamp(1.9rem,3.5vw,2.8rem);font-weight:600;letter-spacing:-.055em;line-height:1.1;color:#fff;}
.sn-faq-title span{color:rgba(255,255,255,.38);}
.sn-faq-sub{margin:14px auto 44px;max-width:46ch;font-size:.95rem;line-height:1.65;color:rgba(255,255,255,.42);letter-spacing:-.03em;}
.sn-faq-list{display:flex;flex-direction:column;text-align:left;}
.sn-faq-item{border-top:1px solid rgba(255,255,255,.08);}
.sn-faq-item:last-child{border-bottom:1px solid rgba(255,255,255,.08);}
.sn-faq-q{width:100%;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px 0;background:none;border:none;outline:none;cursor:pointer;text-align:left;font:500 .95rem/1.45 'Geist','Switzer',sans-serif;letter-spacing:-.03em;color:rgba(255,255,255,.56);transition:color .15s;}
.sn-faq-item.is-open .sn-faq-q{color:#fff;}
.sn-faq-icon{flex-shrink:0;width:28px;height:28px;display:flex;align-items:center;justify-content:center;border-radius:8px;border:1px solid rgba(255,255,255,.1);background:rgba(255,255,255,.03);transition:background .18s,border-color .18s,transform .25s cubic-bezier(.4,0,.2,1);color:rgba(255,255,255,.35);}
.sn-faq-item.is-open .sn-faq-icon{transform:rotate(45deg);border-color:rgba(20,77,199,.5);background:rgba(20,77,199,.15);color:#b8d7ff;}
.sn-faq-body{height:0;overflow:hidden;transition:height .3s cubic-bezier(.4,0,.2,1);}
.sn-faq-a{margin:0;padding-bottom:22px;font-size:.88rem;line-height:1.72;color:rgba(255,255,255,.42);letter-spacing:-.02em;}

/* hide Framer chrome */
.framer-1h6q7na-container,.framer-19c4v0-container,.framer-ov318o-container,
.syntra-hero-bar,[data-framer-name="Announcement"],[data-framer-name="Announcement Bar"],
[data-framer-name="Logo Scroller"],#general-content-trusted-by{display:none!important;}
body>[data-layout-template="true"] .ssr-variant:has([data-framer-name="Announcement"]),
body>[data-layout-template="true"] [data-framer-name="Announcement"]{display:none!important;}
[aria-label="Open video lightbox"]{pointer-events:none!important;cursor:default!important;}
[aria-label="Open video lightbox"] video{pointer-events:none!important;}
.framer-dfpppx,.framer-v30vy,.framer-1lf64g2,.framer-848mnf,.framer-1fyk3f7,
.framer-8qcs2t,.framer-m1bp1y,.framer-g7w9g7,.framer-1k68mn5,.framer-1c204pz
{position:relative!important;top:auto!important;left:auto!important;}
[data-framer-name="Logo Scroller"] ul{transform:translateX(0)!important;}
.framer-1lhws0f,[data-framer-name="CTA Section Content"],
#general-content-inside-the-product{display:none!important;}
.framer-278p6r,#general-content-faq{display:block!important;width:100%!important;max-width:none!important;height:auto!important;min-height:0!important;overflow:visible!important;position:relative!important;left:0!important;right:0!important;top:auto!important;transform:none!important;}

/* nav logo */
[data-layout-template="true"] a.framer-1cx1864{display:flex!important;align-items:center!important;gap:8px!important;}
[data-layout-template="true"] [data-framer-name="Full Logo"],[data-layout-template="true"] .framer-gxpyok-container,[data-layout-template="true"] .framer-8flibh,[data-layout-template="true"] .framer-1avakym-container{width:auto!important;min-width:0!important;height:auto!important;overflow:visible!important;}
[data-layout-template="true"] .syntra-nav-logo-wrap{display:flex!important;align-items:center!important;justify-content:center!important;width:28px!important;height:28px!important;flex-shrink:0!important;padding:2px!important;border-radius:8px!important;border:1px solid rgba(255,255,255,.85)!important;background:rgba(0,3,9,.7)!important;overflow:hidden!important;}
[data-layout-template="true"] .syntra-nav-logo{display:block!important;width:22px!important;height:22px!important;border-radius:5px!important;object-fit:contain!important;}

@media(prefers-reduced-motion:reduce){
  .sn-mq-track,.sn-vc-track{animation:none;}
}
`

/* ─── SpanEnhance ───────────────────────────────────────────────── */
export function SpanEnhance() {
  useEffect(() => {
    let raf = 0

    const enhance = () => {
      if (!document.querySelector('#main')) return
      if ((window as any).__snEnhanced) return
      ;(window as any).__snEnhanced = true

      /* CSS + font */
      const styleEl = document.createElement('style')
      styleEl.textContent = CSS
      document.head.appendChild(styleEl)

      const seriface = document.createElement('style')
      seriface.textContent = `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&display=swap');`
      document.head.appendChild(seriface)

      // Announce bar désactivée

      /* How It Works — injected after the Framer hero section */
      const heroSection = document.querySelector<HTMLElement>(
        '#general-content-hero-section, .framer-1y0aoy6'
      )
      if (!document.getElementById('sn-hiw')) {
        const buildCards = (steps: typeof HIW.self) =>
          steps.map((s, i) => `
            <li class="sn-flow-card">
              <div class="sn-flow-visual"><div class="sn-flow-dots"></div><div class="sn-flow-icon">${STEP_ICONS[i]}</div></div>
              <div class="sn-flow-body">
                <span class="sn-flow-step"><b>${s.step}</b><i></i>Step ${i + 1}</span>
                <h3 class="sn-flow-h3">${s.title}</h3>
                <p class="sn-flow-p">${s.desc}</p>
              </div>
            </li>`).join('')

        const hiw = document.createElement('section')
        hiw.id = 'sn-hiw'
        hiw.setAttribute('id', 'how-it-works')
        hiw.innerHTML = `
          <div class="sn-hiw">
            <div class="sn-section-head">
              <p class="sn-eyebrow">Two ways to fix your PC</p>
              <h2 class="sn-h2">Three steps to <em>more FPS.</em></h2>
              <p class="sn-section-sub">Tune it yourself with the Syntra app, or book a specialist to do it remotely while you watch.</p>
            </div>
            <div style="display:flex;justify-content:center;margin-bottom:40px;">
              <div class="sn-toggle" id="sn-toggle">
                <span class="sn-toggle-thumb" id="sn-thumb"></span>
                <button class="sn-tab is-active" data-panel="self" type="button">Do it myself</button>
                <button class="sn-tab" data-panel="dfy" type="button">Do it for me</button>
              </div>
            </div>
            <div class="sn-panel is-active" data-panel-body="self"><ol class="sn-flow-grid">${buildCards(HIW.self)}</ol></div>
            <div class="sn-panel" data-panel-body="dfy"><ol class="sn-flow-grid">${buildCards(HIW.dfy)}</ol></div>
            <div class="sn-hiw-cta"><a href="/checkout?plan=premium" class="sn-hiw-btn">${DL} Get Started ${ARROW}</a></div>
          </div>`

        if (heroSection) {
          heroSection.insertAdjacentElement('afterend', hiw)
        } else {
          document.querySelector('#main')?.appendChild(hiw)
        }

        /* Toggle */
        const tabs   = Array.from(hiw.querySelectorAll<HTMLButtonElement>('.sn-tab'))
        const panels = Array.from(hiw.querySelectorAll<HTMLElement>('[data-panel-body]'))
        const thumb  = hiw.querySelector<HTMLElement>('#sn-thumb')
        const updateThumb = (t: HTMLButtonElement) => {
          if (!thumb) return
          thumb.style.left  = `${t.offsetLeft}px`
          thumb.style.width = `${t.offsetWidth}px`
        }
        const first = hiw.querySelector<HTMLButtonElement>('.sn-tab.is-active')
        if (first) requestAnimationFrame(() => requestAnimationFrame(() => updateThumb(first)))
        tabs.forEach(tab => tab.addEventListener('click', () => {
          tabs.forEach(t => t.classList.toggle('is-active', t === tab))
          panels.forEach(p => p.classList.toggle('is-active', p.dataset.panelBody === tab.dataset.panel))
          updateThumb(tab)
        }))
      }

      /* Games marquee */
      const hiwEl = document.getElementById('how-it-works') || document.getElementById('sn-hiw')
      if (hiwEl && !document.getElementById('sn-games')) {
        const logos = [...GAME_LOGOS, ...GAME_LOGOS]
          .map(g => `<img class="sn-game-logo" src="${g.src}" alt="${g.alt}" width="320" height="180" loading="lazy" decoding="async">`)
          .join('')
        const games = document.createElement('section')
        games.id = 'sn-games'
        games.className = 'sn-games'
        games.innerHTML = `
          <div class="sn-games-head">
            <p class="sn-eyebrow" style="justify-content:center;">Supported games</p>
            <h2 class="sn-games-title">Tuned for the games<br><em>you actually play.</em></h2>
            <div class="sn-games-rule"></div>
          </div>
          <div class="sn-mq-mask"><div class="sn-mq-track">${logos}</div></div>`
        hiwEl.insertAdjacentElement('afterend', games)
      }

      /* Vouches disabled — the site already has a reviews section.
      const gamesEl = document.getElementById('sn-games')
      if (gamesEl && !document.getElementById('sn-vouches')) {
        const card = (v: typeof VOUCHES[0], idx: number, hidden = false) => `
          <article class="sn-vc-card" ${hidden ? 'aria-hidden="true"' : ''}>
            <div class="sn-vc-head">
              <div class="sn-vc-av" style="background:${AV_COLORS[idx % AV_COLORS.length]}">${v.name.slice(0, 2).toUpperCase()}</div>
              <div class="sn-vc-who"><span class="sn-vc-name">${v.name}</span><span class="sn-vc-handle">${v.handle}</span></div>
            </div>
            <div class="sn-vc-stars">${STAR.repeat(5)}</div>
            <p class="sn-vc-text">"${v.text}"</p>
            <time class="sn-vc-date">${v.date}</time>
          </article>`
        const allCards = [
          ...VOUCHES.map((v, i) => card(v, i)),
          ...VOUCHES.map((v, i) => card(v, i, true)),
          ...VOUCHES.map((v, i) => card(v, i, true)),
        ].join('')
        const vouches = document.createElement('section')
        vouches.id = 'sn-vouches'
        vouches.className = 'sn-vouches'
        vouches.innerHTML = `
          <div class="sn-vouches-head">
            <p class="sn-eyebrow">Done-for-you tuning</p>
            <h2 class="sn-h2">Gamers vouch for <em>Syntra.</em></h2>
            <p class="sn-section-sub">These players booked Syntra PC Optimization. Each left feedback after their session.</p>
          </div>
          <div class="sn-vc-mask"><div class="sn-vc-track">${allCards}</div></div>`
        gamesEl.insertAdjacentElement('afterend', vouches)
      }
      */

      /* FAQ */
      const faqEl = document.querySelector<HTMLElement>('#general-content-faq')
      if (faqEl && !faqEl.querySelector('.sn-faq')) {
        faqEl.innerHTML = `
          <div class="sn-faq">
            <p class="sn-eyebrow" style="justify-content:center;">Questions</p>
            <h2 class="sn-faq-title">Questions, <span>answered.</span></h2>
            <p class="sn-faq-sub">Everything you need to know about optimizing with Syntra.</p>
            <div class="sn-faq-list">
              ${FAQ.map(f => `
                <div class="sn-faq-item">
                  <button class="sn-faq-q" type="button" aria-expanded="false">
                    <span>${f.q}</span>
                    <span class="sn-faq-icon" aria-hidden="true">${PLUS}</span>
                  </button>
                  <div class="sn-faq-body"><p class="sn-faq-a">${f.a}</p></div>
                </div>`).join('')}
            </div>
          </div>`
        const items = Array.from(faqEl.querySelectorAll<HTMLElement>('.sn-faq-item'))
        items.forEach(item => {
          const btn  = item.querySelector<HTMLButtonElement>('.sn-faq-q')
          const body = item.querySelector<HTMLElement>('.sn-faq-body')
          if (!btn || !body) return
          btn.addEventListener('click', () => {
            const opening = !item.classList.contains('is-open')
            items.forEach(o => {
              o.classList.remove('is-open')
              o.querySelector('.sn-faq-q')?.setAttribute('aria-expanded', 'false')
              const b = o.querySelector<HTMLElement>('.sn-faq-body')
              if (b) b.style.height = '0'
            })
            if (opening) {
              item.classList.add('is-open')
              btn.setAttribute('aria-expanded', 'true')
              body.style.height = `${body.scrollHeight}px`
            }
          })
        })
      }

      /* Nav logo */
      document.querySelectorAll<HTMLElement>('[data-layout-template="true"] [data-framer-name="Full Logo"]').forEach(logo => {
        if (logo.querySelector('.syntra-nav-logo-wrap')) return
        logo.querySelectorAll('img').forEach(img => img.remove())
        const host = logo.querySelector<HTMLElement>('.framer-1avakym-container')
                  || logo.querySelector<HTMLElement>('.framer-8flibh') || logo
        const wrap = document.createElement('div')
        wrap.className = 'syntra-nav-logo-wrap'
        const img = document.createElement('img')
        img.className = 'syntra-nav-logo'
        img.src = '/syntra-logo.png'
        img.alt = 'Syntra'
        wrap.appendChild(img)
        host.appendChild(wrap)
      })

      /* Lock video lightbox */
      document.querySelectorAll<HTMLElement>('[aria-label="Open video lightbox"]').forEach(el => {
        el.style.pointerEvents = 'none'
        el.addEventListener('click', e => { e.preventDefault(); e.stopPropagation() }, true)
        el.querySelectorAll('video').forEach(v => {
          v.pause(); v.autoplay = false
          v.addEventListener('play', () => v.pause())
        })
      })
    }

    const wait = () => {
      if (document.querySelector('#main')) { enhance(); return }
      raf = requestAnimationFrame(wait)
    }
    wait()

    return () => {
      cancelAnimationFrame(raf)
      ;(window as any).__snEnhanced = false
    }
  }, [])

  return null
}

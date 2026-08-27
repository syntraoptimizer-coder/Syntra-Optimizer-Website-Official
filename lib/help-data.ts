import type { LucideIcon } from 'lucide-react'
import { BookOpen, Gamepad2, HelpCircle, LifeBuoy, Shield, Wrench } from 'lucide-react'

export type HelpCategory = {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  questions: readonly [string, string][]
}

export const HELP_CATEGORIES: readonly HelpCategory[] = [
  {
    slug: 'getting-started', title: 'Getting started', icon: BookOpen,
    description: 'Understand the system score and safely apply your first tweak.',
    questions: [
      ['What is the system score?', "The system score is Syntra Optimizer's health estimate of your Windows installation. It is computed from your hardware, running services, startup programs and the current state of the tweaks applied. A higher score means fewer optimization opportunities remain. It is an estimate, not a benchmark."],
      ['How do I apply my first tweak?', 'Open the Optimize page, pick a category (Performance, Hardware, Network, Privacy), and toggle any card on. Syntra creates a Windows restore point automatically before the first batch of changes, so you can always roll back. Every tweak is reversible from the same card.'],
      ['Do I need to restart after applying tweaks?', 'Most tweaks apply instantly. A few registry and service changes need a restart or a reboot to take effect; the app tells you when one is required. Restarting after a batch of optimizations is always a good idea.'],
      ['Is Syntra Optimizer safe to use?', 'Yes. Every tweak uses the official Windows mechanism for its setting (registry keys, PowerShell, service control). Nothing is deleted without your explicit action, no user data is touched, and every change is reversible. The Cleaner page only removes files you choose.'],
    ],
  },
  {
    slug: 'optimization-guide', title: 'Optimization guide', icon: Wrench,
    description: 'Learn what Performance, Hardware, Network and Privacy controls do.',
    questions: [
      ['What does the Performance section do?', 'The Performance tab in General applies latency and responsiveness tweaks: scheduler settings, power and latency optimizations, multimedia/gaming scheduling, memory and sleep behavior, and I/O reliability settings. These reduce input lag and background overhead.'],
      ['What is the GPU latency optimization?', 'GPU Latency Optimization tunes the graphics driver registry values (display class GUID {4d36e968-e325-11ce-bfc1-08002be10318} and GraphicsDrivers keys) to reduce frame-to-display latency. It is applied to all detected GPUs, not just one vendor.'],
      ["What do the Network tweaks change?", "Network tweaks adjust TCP/IP parameters (Nagle's algorithm, ACK frequency, window sizes, offloads, RSC, jumbo frames) and adapter behavior to reduce latency and packet overhead. They are most useful for online gaming and real-time apps."],
      ['What does the Cleaner remove?', 'The Cleaner targets Windows temporary files, cache folders, recycle bin contents and leftover files from previous sessions. You select what gets removed; nothing is ever cleaned without your confirmation.'],
    ],
  },
  {
    slug: 'gaming-guide', title: 'Gaming guide', icon: Gamepad2,
    description: 'Build a game profile and optimize FPS without changing every setting.',
    questions: [
      ['How do I create a game profile?', 'Open the Game Optimizer page, select your installed game from the detected list (Steam, Epic, Riot, Xbox/Store, etc.), and choose Apply. The profile sets process priority, network QoS and the recommended GPU/system tweaks for that game.'],
      ['Which games are detected automatically?', 'Syntra scans Steam, Epic Games, Riot, Battle.net, EA, Ubisoft, Xbox/Store apps, registry installs, running processes and common folders. Games that are not auto-detected can still be added by pointing to their executable.'],
      ['Will game optimization lower my FPS?', 'No. The optimizations reduce background interference and input latency, which typically raises or stabilizes frame rates. If a specific game misbehaves, toggle its profile off or revert the tweak from the same screen.'],
      ['Does it overclock my hardware?', 'No. Syntra never changes clock speeds, voltages or BIOS settings. All optimizations are software-level Windows and driver settings.'],
    ],
  },
  {
    slug: 'tweaks-explained', title: 'Tweaks explained', icon: Shield,
    description: 'Review warnings, reversibility and the impact of each control.',
    questions: [
      ['Can I undo a tweak?', 'Yes. Every card you enable can be disabled the same way. Syntra keeps the original value of each setting it changes and restores it (or the Windows default) when you turn the card off.'],
      ['What do the warning badges mean?', 'Some tweaks carry a warning such as "thermal", "breaks features" or "compatibility". These tell you the tweak trades a Windows feature for performance. Read the card description before enabling them.'],
      ['Why did the app create a restore point?', 'Before the first batch of system changes, Syntra creates a Windows System Restore point so you can roll back the whole session if needed. You can also create restore points manually on the Restore Points page.'],
      ['What if a tweak fails?', 'Each tweak reports its own status in the action history (Settings → Performance → Action history). A failed tweak leaves your system unchanged and shows the reason, usually a missing setting or a permission issue.'],
    ],
  },
  {
    slug: 'troubleshooting', title: 'Troubleshooting', icon: HelpCircle,
    description: 'What to check when a tweak fails or a setting needs to be reverted.',
    questions: [
      ['A tweak did not apply. What should I check?', '1) Make sure Syntra is running as administrator (it requests elevation at launch). 2) Check the action history for the error message. 3) Some settings are protected by Group Policy or an antivirus — the error will say which. 4) Reboot and try once more.'],
      ['The app shows an error screen or does not start?', 'Close Syntra completely (including the system tray) and relaunch it. If the issue persists, reinstall the latest setup and make sure no antivirus is blocking the app files. The integrity check warns but never blocks the app.'],
      ['Can I restore my system after applying tweaks?', 'Yes. On the Restore Points page you can create points, see every real Windows restore point on the machine, open the System Restore wizard, and open System Protection settings to manage disk usage.'],
      ['How do I report a bug?', 'Use the Reviews tab in Settings to send feedback, or join the Discord community from the Help page. Include the action history entries and the exact card name so the team can reproduce it.'],
    ],
  },
  {
    slug: 'account-updates', title: 'Account & updates', icon: LifeBuoy,
    description: 'Login, license, updates and the security integrity check.',
    questions: [
      ['How do updates work?', 'Updates are checked in Settings → Performance → Software Update. You can check manually at any time. When a new version is ready, the app downloads it and asks you to restart to install. You can also download the latest installer from the website.'],
      ['What is the Syntra Security Warning?', 'It is a non-blocking integrity check. At launch, Syntra verifies that its critical files match the signed release hashes. If a file was changed or the manifest is missing, it shows a warning but continues running normally — nothing is deleted or modified.'],
      ['Can I sign in with Google or Discord?', 'Yes. The login page supports email/password and Google. You can also link Discord from Settings → Account to unlock Discord-based features such as premium checks.'],
      ['Where is my license stored?', 'Licenses are validated against your account on the website. No license keys are stored in plain text on your machine.'],
    ],
  },
]

export function getHelpCategory(slug: string) {
  return HELP_CATEGORIES.find(category => category.slug === slug)
}

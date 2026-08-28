# Preview runbook

## Reproduce artifacts

- Use this worktree as the project root.
- Copy `.env.local` from the main checkout into this worktree when creating a fresh worktree; never commit or document secret values.
- Install dependencies with `npm install` using `package-lock.json`.

## Run the server

- Start the development server with `npm run dev`.
- The default port may be occupied; use the port reported by Next.js. This preview is currently running at `http://127.0.0.1:53551`.
- On Windows, start detached with PowerShell `Start-Process` using `npm.cmd`, redirecting stdout and stderr to separate log files, then confirm the printed process ID is alive.

# memos-pub-2026

Run `pnpm install --frozen-lockfile`, then `pnpm test` with Node.js 24.

Routing tests live in `src/proxy.test.ts` and `src/host/custom.test.ts`.
They use real Next.js request and response objects with mocked DNS.
GitHub Actions runs them on pull requests and pushes to `main`.

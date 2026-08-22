# memos.pub

## Communication

We always use Orwell writing in all communication and copywriting.

We do one thing at a time.
You write less than 50 lines of code per increment.
I'll review and usually rewrite them.
You always read files after.

## Structure

We put our business modules under `src`.
We keep framework files and folders thin.
E.g., Next.js' `page.tsx` contains only Next.js' details.

## Coding

We prefer `.at` over `[]`.

We use object params when there're more than 1 params.

Env vars start with `MEMOS_`. Read them with `getEnvVar`.

# Contributing

## Local development

1. Duplicate `.env.sample` to `.env.local` and fill it
2. `yarn install` then `yarn dev`
3. Navigating to localhost:3000:
    - localhost:3000 -> memos-pub.thien.do
    - thien-do.localhost:3000 -> thien-do.memos-pub.thien.do

Note:

-   Safari doesn't support subdomain of localhost so you'll need to update your
    host if you want to use Safari.

## Deployment

-   `main` branch is auto deployed via Vercel

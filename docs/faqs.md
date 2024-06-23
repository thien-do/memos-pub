# FAQs

### How to have custom domains?

Create a PR to add your domain to ["members.ts"][domain-file] (like [this][domain-pr])

[domain-file]: https://github.com/thien-do/memos-pub.thien.do/blob/main/lib/member/list.ts
[domain-pr]: https://github.com/thien-do/memos-pub.thien.do/pull/42

### How to have clean URLs?

1. Name your files as [clean URLs][url-wiki] (like [this][url-files])
2. Use README.md as your index (like [this][url-readme])
3. (Optional) Hide the default index via the ["readme"][url-source] config (like [this][url-config])

[url-wiki]: https://en.wikipedia.org/wiki/Clean_URL
[url-config]: https://github.com/huyng12/30-days-japanese/blob/618bdd9b89d3277e25fd7808d90d9b0d9c13858c/memos-pub.thien.do.json#L2
[url-source]: https://github.com/thien-do/memos-pub.thien.do/blob/ae56afbb44f94bf25d00b7af90dc2e436e3105de/lib/blog/config/type.ts#L16-L27
[url-files]: https://github.com/huyng12/30-days-japanese/tree/618bdd9b89d3277e25fd7808d90d9b0d9c13858c/essays
[url-readme]: https://github.com/huyng12/30-days-japanese/blob/618bdd9b89d3277e25fd7808d90d9b0d9c13858c/essays/README.md?plain=1

### How long does it take for changes to show?

It should take [1 minute][cache-time]. memos-pub.thien.do uses Next.js's [ISR][cache-isr] with [stale-while-revalidate][cache-swr] caching behaviour.

[cache-time]: https://github.com/thien-do/memos-pub.thien.do/blob/ae56afbb44f94bf25d00b7af90dc2e436e3105de/lib/blog/page/props.ts#L11
[cache-isr]: https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
[cache-swr]: https://web.dev/stale-while-revalidate/

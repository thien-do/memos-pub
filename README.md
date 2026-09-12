# memos-pub-2026

Add an optional `memos.json` at the root of a content repository:

```json
{
  "color": "jade"
}
```

| Color            | Gray palette |
| ---------------- | ------------ |
| `blue` (default) | slate        |
| `crimson`        | mauve        |
| `jade`           | sage         |

The palette applies to all pages in the repository, in light and dark mode.
A missing file or omitted setting uses the schema defaults. Invalid values for
known settings and malformed JSON throw an error for the selected repository.
Owner repository lists use the same rendering path with the schema defaults.

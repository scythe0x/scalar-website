# Case article authoring

Case studies live in `content/cases/en` and `content/cases/ru`. Keep matching
filenames for both languages.

## Headings

Use `##` for the main chapters of a case and `###` for a smaller subsection
inside a chapter:

```mdx
## Building the editor

The main chapter begins here.

### Handling generated content

This heading is intentionally only slightly larger than body copy.
```

## Images

Put case assets in:

```text
public/cases/<case-slug>/
```

For example:

```text
public/cases/begemot-ai/editor.webp
```

Then add an image to the MDX article:

```mdx
<Figure
  src="/cases/begemot-ai/editor.webp"
  alt="Begemot AI document editor with the section navigation open"
  caption="The editor keeps document structure visible while the user works."
  width={1600}
  height={1000}
  size="wide"
/>
```

Available sizes:

- `reading` — the same width as the text column;
- `wide` — wider than the text, recommended for product screenshots;
- `full` — the full available article width.

Use WebP or AVIF for screenshots when possible. PNG is suitable when lossless
UI detail or transparency matters. GIF works for short animations; use
`<Video>` with WebM or MP4 for longer or heavier recordings.

## Image beside text

Use `MediaSplit` when the image should sit beside a short piece of text:

```mdx
<MediaSplit side="right">
  <div>

### Editing without losing structure

The navigation remains visible while the user changes individual sections.

  </div>

  <Figure
    src="/cases/begemot-ai/editor-detail.webp"
    alt="Document section navigation beside the editor"
    width={1200}
    height={900}
    size="full"
  />
</MediaSplit>
```

Set `side="left"` to place the image on the left. On narrow screens the layout
automatically becomes a single readable column.

## Video

Put the video in the same public case folder and use:

```mdx
<Video
  src="/cases/begemot-ai/editor-flow.webm"
  poster="/cases/begemot-ai/editor-flow-poster.webp"
  label="Editing a generated document"
/>
```

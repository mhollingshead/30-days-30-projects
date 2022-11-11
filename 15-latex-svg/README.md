## Usage

The API 'wraps' the [CodeCogs LaTeX engine](https://editor.codecogs.com/docs/) in order to add additional formatting for use in GitHub READMEs.

### Requests

A simple request might look something like this:

```
http://localhost:8084/?tex=E=mc^2
```

**`tex`** is the only required query parameter: the LaTeX expression that you would like to render. If necessary, you can [encode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent) the LaTeX string to escape any problematic characters that may be present in the equation.

The API will respond with an SVG image of the LaTeX expression, formatted for use in GitHub READMEs.

### Embedding LaTeX in a README

To embed a LaTeX expression in [GitHub Flavored Markdown](https://github.github.com/gfm/), simply use an `img` element and set the `src` to the request url:

**Markdown:**

```markdown
Einstein's famous formula <img src="http://localhost:8084/?tex=E=mc^2" align="middle" /> describes the relationship between mass and energy.
```

**Result:**

Einstein's famous formula <img src="http://localhost:8084/?tex=E=mc^2" align="middle" /> describes the relationship between mass and energy.

> **NOTE**: By default, equations are assumed to be `inline`. When embedding inline equations, make sure to add `align="middle"` so the equation properly aligns with the text around it.

### Options

The API provides several options for customization:

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `tex` (required) | `String` | `undefined` | A valid LaTeX expression to be rendered as an SVG. |
| `display` | `Boolean` | `false` | If `true`, the expression will be rendered as a display equation rather than an inline equation. For differences between `display` and `inline`, see the [equations](#equations) section. |
| `theme` | `String` | `default-light` | The GitHub theme that should be used to style the equation. At the moment, `default-light`, `default-dark`, `dark-dimmed`, and `dark-high-contrast` are currently supported. For examples, see the [themes](#themes) section. |
| `background` | `Boolean` | `false` | If `true`, the expression will be rendered with a background (specified by the `theme`). This is useful if you'd like to ensure the expression is visible regardless of the reader's theme (without using GitHub's `#gh-dark-mode-only` / `#gh-light-mode-only` theme contexts).

## Equations

The API allows you to render two different types of equations: **`inline`** and **`display`**. Equations are rendered as `inline` by default. To render the equation as `display`, add the query param `&display=true` to the request url.

### Inline

This is an example of an inline equation: <img align="middle" src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}" />.

Inline equations are meant to appear in the middle of the main text and are usually 'minimized' to fit with the natural flow of a paragraph.

**In order to properly align an inline equation with a body of text, make sure that the `img` element's `align` property is set to `middle`.** For example:

```markdown
<img align="middle" src="..." />
```

This is necessary because the API will automatically add vertical padding to make sure that both the markdown and equation baselines line up.

In this way, bottom-heavy equations like <img align="middle" src="http://localhost:8084/?tex=x_{a_{b_{c_{d_{e}}}}}" /> and top-heavy equations like <img align="middle" src="http://localhost:8084/?tex=x^{a^{b^{c^{d^{e}}}}}" /> are both properly aligned.

### Display

This is an example of a display equation:

<p align="center">
    <img src="http://localhost:8084/?tex=\lim_{n\to\infty}\sum_{k=1}^n\frac{1}{2^n}=2&display=true" />
</p>

Display equations are usually separate from the main text and aren't 'minimized' in the same way inline equations are. For comparison, here's the same equation inline: <img align="middle" src="http://localhost:8084/?tex=\lim_{n\to\infty}\sum_{k=1}^n\frac{1}{2^n}=2" />.

To center the equation and add proper margins, you can wrap the `<img />` tag in `<p align="center">` tags (or `<center><p>` tags). For example:

```markdown
<p align="center">
    <img src="..." />
</p>
```

Notice that display equations don't require the `img`'s `align` property to be set to `middle`. Because display equations are meant to be kept separate from the main text, there is no baseline to align them to, so no vertical padding is added.

## Themes

Refer to the table below to see examples of each supported theme:

| Theme | `&background=true` | `&background=false` |
| --- | --- | --- |
| `default-light` | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=default-light&background=true" /> | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=default-light&background=false" /> |
| `default-dark` | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=default-dark&background=true" /> | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=default-dark&background=false" /> |
| `dark-dimmed` | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=dark-dimmed&background=true" /> | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=dark-dimmed&background=false" /> |
| `dark-high-contrast` | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=dark-high-contrast&background=true" /> | <img src="http://localhost:8084/?tex=x=\frac{-b\pm\sqrt{b^2-4ac}}{2a}&display=true&theme=dark-high-contrast&background=false" /> |
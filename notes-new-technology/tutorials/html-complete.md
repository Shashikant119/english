# Complete HTML Tutorial

Learn HTML from the first tag to an accessible, production-ready page. Type every example, open it in a browser, and inspect it with DevTools.

## 1. What HTML does

HTML gives content **meaning and structure**. CSS controls presentation, and JavaScript controls behavior.

```text
HTML = structure
CSS = appearance
JavaScript = interaction
```

An HTML element usually contains an opening tag, content, and a closing tag.

```html
<p>This is a paragraph.</p>
```

## 2. Create your first page

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="A short description of this page">
  <title>My First Website</title>
</head>
<body>
  <h1>Hello, world!</h1>
  <p>I am learning HTML.</p>
</body>
</html>
```

- `<!doctype html>` selects modern HTML.
- `lang` helps screen readers and search engines.
- UTF-8 supports international characters.
- The viewport tag makes mobile layouts work correctly.
- Each page should have a useful, unique title and description.

## 3. Text and content elements

Use headings in a meaningful hierarchy, not for visual size.

```html
<h1>One main page heading</h1>
<h2>Main section</h2>
<h3>Section inside that section</h3>

<p>A paragraph with <strong>important text</strong> and <em>emphasis</em>.</p>
<p>Press <kbd>Ctrl</kbd> + <kbd>S</kbd> to save.</p>
<blockquote cite="https://example.com/source">A quotation from another source.</blockquote>
<code>const total = 10;</code>
```

Avoid using `<br>` to create layout spacing. Use separate paragraphs and CSS margins.

## 4. Links and navigation

```html
<nav aria-label="Main navigation">
  <a href="/">Home</a>
  <a href="/about.html">About</a>
  <a href="#contact">Contact section</a>
  <a href="mailto:hello@example.com">Email us</a>
</nav>
```

Use descriptive link text such as **View pricing**, not **Click here**. When opening a new tab, protect the original page.

```html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit example.com
</a>
```

## 5. Images and responsive media

Every meaningful image needs useful alternative text. Decorative images use an empty `alt`.

```html
<img
  src="product-800.jpg"
  srcset="product-400.jpg 400w, product-800.jpg 800w, product-1200.jpg 1200w"
  sizes="(max-width: 600px) 100vw, 50vw"
  alt="Blue cotton shirt with a button-down collar"
  width="800"
  height="600"
  loading="lazy"
>
```

Width and height prevent layout shift. Do not lazy-load the main hero image above the fold.

Use `<figure>` when media needs a caption.

```html
<figure>
  <img src="chart.png" alt="Sales increased from January to June">
  <figcaption>Monthly sales for the first half of the year.</figcaption>
</figure>
```

## 6. Lists

```html
<ul>
  <li>HTML</li>
  <li>CSS</li>
</ul>

<ol>
  <li>Create the file.</li>
  <li>Write the markup.</li>
  <li>Open it in a browser.</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>The language that structures web content.</dd>
</dl>
```

## 7. Semantic page structure

Semantic elements explain the role of content to browsers and assistive technology.

```html
<body>
  <header>
    <a href="/" aria-label="Acme home">Acme</a>
    <nav aria-label="Main navigation">...</nav>
  </header>
  <main>
    <article>
      <header><h1>Article title</h1></header>
      <section aria-labelledby="features-title">
        <h2 id="features-title">Features</h2>
      </section>
    </article>
    <aside aria-label="Related articles">...</aside>
  </main>
  <footer>...</footer>
</body>
```

Use one `<main>` element. A `<section>` generally needs a heading. Use `<div>` only when no semantic element fits.

## 8. Tables

Tables are for tabular data, never for page layout.

```html
<table>
  <caption>Quarterly revenue</caption>
  <thead>
    <tr><th scope="col">Quarter</th><th scope="col">Revenue</th></tr>
  </thead>
  <tbody>
    <tr><th scope="row">Q1</th><td>₹80,000</td></tr>
    <tr><th scope="row">Q2</th><td>₹95,000</td></tr>
  </tbody>
</table>
```

## 9. Forms and validation

Every input needs a label. Use the correct input type so mobile devices show the right keyboard and browsers can validate values.

```html
<form action="/contact" method="post">
  <div>
    <label for="name">Full name</label>
    <input id="name" name="name" autocomplete="name" required>
  </div>

  <div>
    <label for="email">Email address</label>
    <input id="email" name="email" type="email" autocomplete="email" required>
  </div>

  <fieldset>
    <legend>Preferred contact method</legend>
    <label><input type="radio" name="contact" value="email" checked> Email</label>
    <label><input type="radio" name="contact" value="phone"> Phone</label>
  </fieldset>

  <label for="message">Message</label>
  <textarea id="message" name="message" minlength="10" required></textarea>
  <button type="submit">Send message</button>
</form>
```

Client-side validation improves usability but is not security. Validate and sanitize data again on the server.

## 10. Audio, video, iframe, and disclosure

```html
<video controls width="720" poster="thumbnail.jpg">
  <source src="lesson.mp4" type="video/mp4">
  <track kind="captions" src="captions-en.vtt" srclang="en" label="English" default>
  Your browser cannot play this video.
</video>

<details>
  <summary>View the answer</summary>
  <p>Semantic HTML is the answer.</p>
</details>
```

Give iframes a title and load non-critical embeds lazily.

```html
<iframe src="map.html" title="Office location map" loading="lazy"></iframe>
```

## 11. Metadata and sharing

```html
<link rel="canonical" href="https://example.com/products/blue-shirt">
<meta property="og:title" content="Blue Cotton Shirt">
<meta property="og:description" content="Comfortable everyday cotton shirt.">
<meta property="og:image" content="https://example.com/images/blue-shirt.jpg">
<meta name="robots" content="index,follow">
```

Use JSON-LD structured data only when it accurately describes visible page content.

## 12. Accessibility checklist

- Use semantic elements before adding ARIA.
- Keep heading levels logical.
- Make every control usable with a keyboard.
- Give form fields labels and errors that identify the field.
- Write meaningful alt text.
- Do not use color as the only way to communicate status.
- Add captions or transcripts for recorded media.
- Keep visible focus styles.
- Set the document language.
- Test zoom at 200% and navigate using only Tab, Enter, Space, and Escape.

> ARIA can improve semantics when native HTML cannot express a pattern, but incorrect ARIA can make accessibility worse.

## 13. Performance and security habits

- Compress images and choose modern formats where appropriate.
- Add explicit image dimensions.
- Load scripts with `defer` unless execution timing requires something else.
- Avoid unnecessary third-party embeds.
- Never put passwords, API secrets, or private tokens in HTML.
- Escape untrusted content before inserting it into the page.
- Use HTTPS and a Content Security Policy in production.

```html
<script src="app.js" defer></script>
```

## 14. Complete practice project

Build a responsive portfolio using only HTML first.

1. Header with logo and navigation.
2. Hero with one heading, introduction, and call-to-action link.
3. Skills section using a list.
4. Three projects using `<article>` elements.
5. Accessible contact form.
6. Footer with email and social links.
7. Validate the document and test keyboard navigation.

## 15. Common interview questions

1. What is semantic HTML and why does it matter?
2. What is the difference between `section`, `article`, and `div`?
3. Why are labels important in forms?
4. What is the difference between `async` and `defer` scripts?
5. How do `srcset` and `sizes` improve responsive images?
6. When should alt text be empty?
7. Why should page layout not use tables?
8. What does the viewport meta tag do?

## Completion checklist

- Build a valid document without copying the starter.
- Explain the purpose of every element you use.
- Build an accessible form and data table.
- Create responsive images with useful alt text.
- Complete the portfolio project.
- Review the page with browser DevTools and an HTML validator.

[Continue to the Complete CSS Tutorial](css-complete.md)

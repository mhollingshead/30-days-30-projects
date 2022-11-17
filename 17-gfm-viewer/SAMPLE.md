# GitHub Flavored Markdown Kitchen Sink

<p>An index of all valid GFM syntax.</p>

<details>
<summary>

<b>Headings</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#headings"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#headings"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#atx-headings">Specs</a></b></sup>

</summary>
<p></p>

<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>

<h4>Markdown</h4>

```markdown
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
```

<h4>HTML</h4>

```html
<h1>Heading 1</h1>
<h2>Heading 2</h2>
<h3>Heading 3</h3>
<h4>Heading 4</h4>
<h5>Heading 5</h5>
<h6>Heading 6</h6>
```

</details>

---

<details>
<summary>

<b>Paragraphs</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#paragraphs"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#paragraphs-1"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#paragraphs">Specs</a></b></sup>

</summary>
<p></p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> 
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

<h4>Markdown</h4>

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

<h4>HTML</h4>

```html
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p> 
<p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
```

</details>

---

<details>
<summary>

<b>Line Breaks</b>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" />

<a href="https://www.markdownguide.org/basic-syntax/#line-breaks"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#hard-line-breaks">Specs</a></b></sup>

</summary>
<p></p>

<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit,</br>
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

<h4>Markdown</h4>

```markdown
Lorem ipsum dolor sit amet, consectetur adipiscing elit,  
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

<div markdown="1">
> **Note**: to create a line break, end the first line with **two or more** spaces.
</div>

<h4>HTML</h4>

```html
<p>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br/>
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
</p>
```

</details>

---

<details>
<summary>

<b>Horizontal Rules</b>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" />

<a href="https://www.markdownguide.org/basic-syntax/#horizontal-rules"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#thematic-breaks">Specs</a></b></sup>

</summary>
<p></p>

<hr>

<h4>Markdown</h4>

```markdown
---
```
```markdown
___
```
```markdown
***
```

<h4>HTML</h4>

```html
<hr>
```

</details>

---

<details>
<summary>

<b>Text Styling</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#styling-text"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#bold-and-italic"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a><sup>*</sup>

<sup><b><a href="https://github.github.com/gfm/#emphasis-and-strong-emphasis">Specs</a></b></sup>

</summary>
<p></p>

<h2>Bold</h2>

<strong>This text is bold.</strong>

<h4>Markdown</h4>

```markdown
**This text is bold.**
```

```markdown
__This text is bold.__
```

<h4>HTML</h4>

```html
<strong>This text is bold.</strong>
```

```html
<b>This text is bold.</b>
```

<h2>Italic</h2>

<em>This text is italic.</em>

<h4>Markdown</h4>

```markdown
*This text is italic.*
```

```markdown
_This text is italic._
```

<h4>HTML</h4>

```html
<em>This text is italic.</em>
```

```html
<i>This text is italic.</i>
```

<h2>Strikethrough <a href="https://github.github.com/gfm/#strikethrough-extension-">(extension)</a></h2>

<s>This text is struck through.</s>

<h4>Markdown</h4>

```markdown
~~This text is struck through.~~
```

<h4>HTML</h4>

```html
<s>This text is struck through.</s>
```

</details>

---

<details>
<summary>

<b>Superscript / Subscript</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#styling-text"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" />

</summary>
<p></p>

Normal<sup>Superscript</sup><sub>Subscript</sub><sup><sub>Supersubscript</sub></sup>

<h4>Markdown / HTML</h4>

```html
Normal
<sup>Superscript</sup>
<sub>Subscript</sub>
<sup>
    <sub>Supersubscript</sub>
</sup>
```

</details>

---

<details>
<summary>

<b>Blockquotes</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-text"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#blockquotes-1"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#block-quotes">Specs</a></b></sup>

</summary>
<p></p>

<div markdown="1">
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
> 
> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

<h4>Markdown</h4>

```markdown
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
> 
> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

<h4>HTML</h4>

```html
<blockquote>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
</blockquote>
```

<h2>Nested</h2>

<div markdown="1">
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
> 
>> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
</div>

<h4>Markdown</h4>

```markdown
> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
> 
>> Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

<h4>HTML</h4>

```html
<blockquote>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <blockquote>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    </blockquote>
</blockquote>
```

</details>

---

<details>
<summary>

<b>Note / Warning Blocks</b> (extension)

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" />

<sup><b><a href="https://github.com/community/community/discussions/16925">Beta</a></b></sup>

</summary>
<p></p>

<div markdown="1">

> **Note**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> **Warning**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

</div>

<h4>Markdown</h4>

```markdown
> **Note**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.

> **Warning**: Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

</details>

---

<details>
<summary>

<b>Lists</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#lists"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#lists-1"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#lists">Specs</a></b></sup>

</summary>
<p></p>

<h2>Unordered</h2>

<div markdown="1">

- Item 1
- Item 2
- Item 3

</div>

<h4>Markdown</h4>

```markdown
- Item 1
- Item 2
- Item 3
```

```markdown
* Item 1
* Item 2
* Item 3
```

```markdown
+ Item 1
+ Item 2
+ Item 3
```

<h4>HTML</h4>

```html
<ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ul>
```

<h2>Ordered</h2>

<div markdown="1">

1. Item 1
2. Item 2
3. Item 3

</div>

<h4>Markdown</h4>

```markdown
1. Item 1
2. Item 2
3. Item 3
```

```markdown
1) Item 1
2) Item 2
3) Item 3
```

<h4>HTML</h4>

```html
<ol>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
</ol>
```

<h2>Nested</h2>

<div markdown="1">

1. Item 1
    * Item 1.1
        1. Item 1.1.1
    * Item 1.2
2. Item 2
    - Item 2.1

</div>

<h4>Markdown</h4>

```markdown
1. Item 1
    * Item 1.1
        1. Item 1.1.1
    * Item 1.2
2. Item 2
    - Item 2.1
```

<h4>HTML</h4>

```html
<ol>
    <li>Item 1
        <ul>
            <li>Item 1.1
                <ol>
                    <li>Item 1.1.1</li>
                </ol>
            </li>
            <li>Item 1.2</li>
        </ul>
    </li>
    <li>Item 2
        <ul>
            <li>Item 2.1</li>
        <ul>
    </li>
</ol>
```

</details>

---

<details>
<summary>

<b>Code</b>

<a href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#quoting-code"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

<a href="https://www.markdownguide.org/basic-syntax/#code"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/markdown/markdown-original.svg" height="16" /></a>

<sup><b><a href="https://github.github.com/gfm/#indented-code-blocks">Specs</a></b></sup>

</summary>
<p></p>

<h2>Inline</h2>

<div markdown="1">

Run `npm install` to install the necessary dependencies.

</div>

<h4>Markdown</h4>

```markdown
Run `npm install` to install the necessary dependencies.
```

<h4>HTML</h4>

```html
Run <code>npm install</code> to install the necessary dependencies.
```

<h2>Block</h2>

```
function helloWorld() {
    console.log('Hello, world!');
}
```

<h4>Markdown</h4>

````markdown
```
function helloWorld() {
    console.log('Hello, world!');
}
```
````

```markdown
    function helloWorld() {
        console.log('Hello, world!');
    }
```

<div markdown="1">

> **Note**: code blocks can be *fenced* using <code>```</code> or *indented*, using at least four spaces.

</div>

<h4>HTML</h4>

```html
<pre><code>function helloWorld() {
    console.log('Hello, world!');
}</code></pre>
```

<h2>Highlighted</h2>

```javascript
function helloWorld() {
    console.log('Hello, world!');
}
```

<h4>Markdown</h4>

````markdown
```javascript
function helloWorld() {
    console.log('Hello, world!');
}
```
````

<div markdown="1">

> **Note**: Fences code blocks can contain an *info string* to specify language. [Most languages](https://github.com/github/linguist/blob/master/lib/linguist/languages.yml) are highlighted by GitHub.

</div>

</details>

---

<details>
<summary>

<b>Collapsed Sections</b> (Extension)

<a href="https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/organizing-information-with-collapsed-sections"><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" height="16" /></a>

</summary>
<p></p>

<details>
<summary>Click to expand</summary>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</details>

<h4>HTML</h4>

```html
<details>
    <summary>Click to expand</summary>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
</details>
```

</details>

---
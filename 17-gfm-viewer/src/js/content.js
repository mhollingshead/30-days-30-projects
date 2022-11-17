const filename = window.location.pathname.split('/').slice(-1)[0];
const extension = filename.split('.').slice(-1)[0];


if (extension === 'md') {
    const state = {
        theme: JSON.parse(localStorage.getItem('gfmv-theme')) || 'light-default',
        markdownBody: createElement('div', { class: 'markdown-body' }),
        stylesheet: createElement('link', { rel: 'stylesheet' }),
        markdown: getContents()
    };

    document.body.appendChild(state.markdownBody);
    document.head.appendChild(state.stylesheet);

    const setTheme = (theme) => {
        state.theme = theme;
        const href = chrome.runtime.getURL(`src/css/themes/${theme}.css`);
        state.stylesheet.setAttribute('href', href);
        localStorage.setItem('gfmv-theme', JSON.stringify(theme));
    }

    const render = () => {
        if (!state.markdown || !state.markdownBody) return;

        const converter = new showdown.Converter({
            simpleLineBreaks: false
        });
        converter.setFlavor('github');

        const html = converter.makeHtml(state.markdown);
        state.markdownBody.innerHTML = html;

        MathJax.typeset();

        setTheme(state.theme);

        highlightCodeBlocks();
        styleSpecialBlockquotes();
    };

    render();

    chrome.runtime.onMessage.addListener(function (request) {
        if (request.theme) setTheme(request.theme);
    });
}

const highlightCodeBlocks = async () => {
    const starryNight = await createStarryNight(common);

    const nodes = Array.from(document.body.querySelectorAll('code'));

    for (const node of nodes) {
        const className = node.classList[0];
        if (!className) continue;
        const scope = starryNight.flagToScope(className);
        if (!scope) continue;
        const tree = starryNight.highlight(node.textContent, scope);
        node.replaceChildren(toDom(tree, { fragment: true }));
    }
}

const styleSpecialBlockquotes = () => {
    Array.from(document.querySelectorAll('blockquote p')).forEach(blockquote => {
        if (blockquote.childNodes[0].outerHTML === '<strong>Note</strong>') {
            blockquote.childNodes[0].classList.add('note-block');
        }
        if (blockquote.childNodes[0].outerHTML === '<strong>Warning</strong>') {
            blockquote.childNodes[0].classList.add('warning-block');
        }
    });
}
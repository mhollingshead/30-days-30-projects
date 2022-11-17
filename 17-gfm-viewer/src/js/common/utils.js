const createElement = (tag, attributes) => {
    const element = document.createElement(tag);
    Object.entries(attributes).forEach(attrubute => {
        element.setAttribute(...attrubute);
    });
    return element;
}

const getContents = () => {
    const pre = document.querySelector('pre');
    pre.style.display = 'none';
    return pre.innerText;
}
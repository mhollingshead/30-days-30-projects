// Store the active section (and, eventually, the data objects) in state
let state = { active: 'tree' };

const postRender = () => {
    // Get the active section element from state
    const activeSection = document.querySelector(`.${state.active}`);
    // Highlight css snippets
    Prism.highlightAll();
    // Add a dummy color input to the Prism inline colors to make them explorable
    [...activeSection.querySelectorAll('.inline-color')].forEach(colorPreview => {
        // Use tinyColor to convert to hex
        const hexColor = tinycolor(colorPreview.style.backgroundColor).toHexString();
        colorPreview.parentElement.innerHTML += `
            <input type="color" class="dummy-input" value="${hexColor}" readonly />
        `;
    });
    // Add click handlers to the copy buttons
    [...activeSection.querySelectorAll('.copy-button')].forEach(button => {
        button.addEventListener('click', () => {
            // Copy the content to clipboard
            copyToClipboard(decode(button.dataset.copyContent));
            // Disable the button during success
            button.disabled = true;
            button.classList.toggle('success');
            // Show success message for 4 seconds
            setTimeout(() => {
                button.classList.toggle('success');
                button.disabled = false;
            }, 4000);
        });
    });
    // If necessary, add click handlers to dropdown rows
    if (state.active === 'tree') {
        [...activeSection.querySelectorAll('.dropdown')].forEach(element => {
            element.addEventListener('click', () => {
                // Toggle child-node visibilities
                element.nextElementSibling.classList.toggle('hidden');
                element.querySelector('.caret').classList.toggle('rotate90');
            });
        });
    }
};

const renderNoData = (section) => {
    // If no data is present (i.e. there was a content.js error or no CSS variables), 
    // render a 'no data' message
    document.querySelector(`.${section}`).innerHTML = `
        <div class="no-data">Nothing to display</div>
        <div class="no-data-explanation">No CSS variables found in this page's
            <code>:root</code> or <code>body</code>.
        </div>
    `;
};

const renderTree = () => {
    const tree = document.querySelector('.tree');
    // A recursive function to render a branch of the object tree
    const renderBranches = ([key, value], depth) => {
        // Recursive step: if we've reached a string, we stop
        if (typeof value === 'string') {
            return `
                <div class="row branch" style="padding-left: ${16 * depth + 20}px">
                    <div class="key leaf">${key}</div>
                    <span class="copyable">
                        <code class="language-css">${value}</code>
                        <span class="copy-button" title="Copy style to clipboard" 
                            data-copy-content="${encode(value)}">${icons.copy}</span>
                    </span>
                </div>
            `;
        // Otherwise, render the this branch's key and all child branches
        } else {
            return `
                <div class="row dropdown" style="padding-left: ${16 * depth + 4}px">
                    ${icons.caret}
                    <span class="key">${key}</span>
                </div>
                <div class="children hidden">
                    ${
                        Object.entries(value).sort(typeSorter).reduce((acc, entry) => {
                            return acc + renderBranches(entry, depth + 1);
                        }, '')
                    }
                    <div class="block-line" style="left: ${16 * depth + 9}px"></div>
                </div>
            `;
        }
    };
    // Call renderBranches on the immediate key,value pairs, 
    // sorting by type (final values before child branches)
    tree.innerHTML = Object.entries(state.tree).sort(typeSorter).reduce((acc, entry) => {
        return acc + renderBranches(entry, 0);
    }, '');
    // Do any necessary post-rendering
    postRender();
};

const renderDict = () => {
    const dict = document.querySelector('.dict');
    // Render each key,value pair in the varable dict
    dict.innerHTML = Object.entries(state.dict).reduce((acc, [key, value]) => {
        return acc + `
            <div class="row entry">
                <span class="key">${key}:</span>
                <span class="copyable">
                    <code class="language-css">${value}</code>
                    <span class="copy-button" title="Copy style to clipboard" 
                        data-copy-content="${encode(value)}">${icons.copy}</span>
                </span>
            </div>
        `;
    }, '');
    // Do any necessary post-rendering
    postRender();
};

const renderStyles = () => {
    const styles = document.querySelector('.styles');
    // Sort by css value, then render each key,value pair in the style dict
    styles.innerHTML = Object.entries(state.styles).sort(keySorter).reduce((acc, [key, value]) => {
        return acc + `
            <div class="entry">
                <div class="row">
                    <span class="copyable">
                        <code class="language-css">${key}</code>
                        <span class="copy-button" title="Copy style to clipboard" 
                            data-copy-content="${encode(key)}">${icons.copy}</span>
                    </span>
                </div>
                ${value.reduce((acc, variable) => {
                    return acc + `
                        <div class="row">
                            <span class="key">${variable}</span>
                        </div>
                    `;
                }, '')}
            </div>
        `;
    }, '');
    // Do any necessary post-rendering
    postRender();
};

const render = section => {
    // If we don't have any data in state for the section to be rendered,
    // render the no-data section
    if (!state[section] || Object.keys(state[section]).length === 0) renderNoData(state.active);
    // Otherwise call the necessary renderer
    else if (section === 'tree') renderTree();
    else if (section === 'dict') renderDict();
    else if (section === 'styles') renderStyles();
};
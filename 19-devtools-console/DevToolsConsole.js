// Regex to match links
const urlRegex = /(http|ftp|https|file):\/\/([\w_-]+(?:(?:\.[\w_-]+)+)|localhost)([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/g;
// Icon SVG strings
const icons = {
    warning: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10" height="10"><g transform="translate(27.781233,-68.224719)"><g id="g4443" transform="matrix(1.0000124,0,0,1.0000124,-27.781295,68.224595)"><path style="stroke:#c19600;stroke-width:2;stroke-linejoin:round" d="m 61,9 4,-8 4,8 z" transform="translate(-60)"/><path style="fill:#f4bd00;stroke:#f5bd00;stroke-width:1.5;stroke-linejoin:round" d="m 61,9 4,-8 4,8 z" transform="translate(-60)"/><path style="fill:#ad8601" d="m 63.75,2.75 h 2.5 v 2.5 L 65.75,7 h -1.5 l -0.5,-1.75 v -2.5 m 0,5.25 h 2.5 v 1.25 h -2.5" transform="translate(-60)"/><path style="fill:#ffffff" d="m 64,3 h 2 V 5.25 L 65.5,7 h -1 L 64,5.25 V 3 m 0,5 h 2 v 1 h -2" transform="translate(-60)"/></g></g></svg>`,
    error: `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 10 10" height="10" width="10"><g transform="translate(-151.37946,-77.296131)" id="layer1" inkscape:groupmode="layer" inkscape:label="Layer 1"><g transform="matrix(0.26458333,0,0,0.26458333,151.37946,77.296131)" id="g4221"><path style="fill:url(#sprite6_a);stroke-width:3.77951" inkscape:connector-curvature="0" id="path4225" d="M 18.897638,-4.7795e-7 C 8.4661418,-4.7795e-7 0,8.4661417 0,18.897638 c 0,10.431497 8.4661418,18.897638 18.897638,18.897638 10.431496,0 18.897638,-8.466141 18.897638,-18.897638 C 37.795276,8.4661417 29.329134,-4.7795e-7 18.897638,-4.7795e-7"/><path style="fill:#eb3941;stroke-width:3.77951" inkscape:connector-curvature="0" id="path4227" d="m 1.3606299,18.89764 c 0,9.675591 7.8614175,17.537009 17.5370081,17.537009 9.675591,0 17.537008,-7.861418 17.537008,-17.537009 0,-9.6755911 -7.861417,-17.5370087 -17.537008,-17.5370087 -9.6755906,0 -17.5370081,7.8614176 -17.5370081,17.5370087"/><path style="stroke:#ffffff;stroke-width:3.77951" inkscape:connector-curvature="0" id="path4229" d="m 11.338583,11.338585 15.11811,15.11811"/><path style="stroke:#ffffff;stroke-width:3.77951" inkscape:connector-curvature="0" id="path4231" d="m 26.456693,11.338585 -15.11811,15.11811"/></g></g></svg>`
}
// Escape necessary characters in HTML string
const escapeHTML = html => html.replaceAll('<', '&lt;').replaceAll('>', '&gt;');

const getStackURLs = e => {
    // If the error doesn't have a stack, create a new one.
    e = e?.stack ? e : new Error();
    // Extract URLs from the error's stack
    const urls = e.stack.match(urlRegex);
    // Filter out any steps that occur within DevToolsConsole.js
    const filtered = urls.filter(url => !url.includes('DevToolsConsole.js'));
    // Return both the full URL and the base filename
    return filtered.map(url => ({ url: url, base: url.split('/').slice(-1)[0] }));
}

const getStack = e => {
    // Get the stack string from the error (if it exists)
    const stackString = e.stack || '';
    // Find all correctly formatted lines (if there are any, i.e. we're in a Chromium-based browser)
    const formattedLines = stackString.split('\n').filter(line => line.slice(0, 6) === '    at');
    // If formatted lines were found, the stack is already formatted
    if (formattedLines.length > 0) {
        // Find the URLs in the stack
        const urls = getStackURLs(e);
        // Map through the formatted lines
        const stack = formattedLines.map(line => {
            // Escape any HTML characters (i.e. < and >)
            line = escapeHTML(line);
            // Replace any URL occurances in the current line with the shortened filename
            return urls.reduce((acc, { url, base }) => {
                return acc.replace(url, `<span class="call">${base}</span>`);
            }, line);
        });
        // Return the formatted stack
        return stack;
    // If the stack isn't properly formatted, generate it from scratch
    } else {
        // Get any URLs in the stack
        const stackURLs = getStackURLs(e);
        // Map through the URLs and use them to create formatted lines
        return stackURLs.map(({ _, base }) => `    at <span class="call">${base}</span>`);
    }
}

const getCaller = (e) => {
    // Get any URLs from the stack
    const stackURLs = getStackURLs(e);
    // The last URL should be the caller. Split by : to get the filename, row, and column.
    const callerInfo = stackURLs[stackURLs.length - 1]?.base.split(':');
    // Remove the column number and rejoin
    return callerInfo?.slice(0, callerInfo.length - 1).join(':');
}

class DevToolsConsole {
    constructor(root) {
        this.root = typeof root === 'string' ? document.querySelector(root) : root;
        this.init();
        
        this.legacy = {
            log: console.log,
            warn: console.warn,
            error: console.error
        };

        this.log = (...args) => {
            const caller = getCaller();

            [...args].forEach(arg => {
                this.legacy.log(arg);
                this.root.innerHTML += this.logToHTML(arg, caller);
            });
        };

        this.warn = (...args) => {
            const caller = getCaller();

            [...args].forEach(arg => {
                this.legacy.warn(arg);
                this.root.innerHTML += this.warnToHTML(arg, caller);
            });
        };

        this.error = (error) => {
            const caller = getCaller(error);
            const stack = getStack(error);

            this.legacy.error(error);
            this.root.innerHTML += this.errorToHTML(error, caller, stack);
        };

        console.log = this.log;
        console.warn = this.warn;
        console.error = this.error;
    }
    init() {
        this.root.classList.add('DevToolsConsole');
        this.root.classList.add('light');
    }
    logToHTML(arg, caller) {
        return `
            <div class="message log">
                <div class="gutter"></div>
                <div class="content">
                    ${caller ? `<span class="caller">${caller}</span>` : ''}
                    <pre class="text">${this.formatParameter(arg)}</pre>
                </div>
            </div>
        `;
    }
    warnToHTML(arg, caller) {
        return `
            <div class="message warn">
                <div class="gutter">${icons.warning}</div>
                <div class="content">
                    ${caller ? `<span class="caller">${caller}</span>` : ''}
                    <pre class="text">${arg.toString()}</pre>
                </div>
            </div>
        `;
    }
    errorToHTML(error, caller, stack) {
        let text;
        if (error instanceof Error) {
            text = `${error.name}: ${error.message}\n${stack.join('\n')}`
        } else {
            text = error;
        }
        return `
            <div class="message error">
                <div class="gutter">${icons.error}</div>
                <div class="content">
                    ${caller ? `<span class="caller">${caller}</span>` : ''}
                    <pre class="text">${text}</pre>
                </div>
            </div>
        `;
    }
    formatParameter(parameter) {
        const type = parameter === null ? 'null' : typeof parameter;
        const subtype = parameter?.constructor?.name.toLowerCase();

        switch(type) {
            case 'null':
            case 'undefined':
            case 'function':
            case 'number':
            case 'boolean':
            case 'string':
                return this.formatParameterAsValue(type, parameter);
            default:
                break;
        }

        switch(subtype) {
            case 'date':
        }
    }
    formatParameterAsObject(type, subtype, parameter) {

    }
    formatParameterAsValue(type, parameter) {
        switch(type) {
            case 'null': 
                return `<span class="parameter-null">null</span>`;
            case 'undefined': 
                return `<span class="parameter-null">undefined</span>`;
            case 'number': 
                return `<span class="parameter-number">${parameter.toString()}</span>`;
            case 'boolean': 
                return `<span class="parameter-boolean">${parameter.toString()}</span>`;
            case 'function': 
                return `<span class="parameter-function">${this.formatFunction(parameter)}</span>`
            default: 
                return parameter;
        }
    }
    formatFunction(fn) {
        if (fn.toString().slice(0, 8) === 'function') {
            return `<span class="keyword-function">ƒ</span> ${fn.toString().slice(8)}`;
        } else {
            return fn.toString();
        }
    }
}
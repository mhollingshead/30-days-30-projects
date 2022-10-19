class TableMe {
    constructor(container, data, options = {}) {
        // The parent DOM element
        this.id = Math.floor(Math.random() * 10000);
        this.root = typeof container === 'string' ? document.querySelector(container) : container;
        this.root.classList.add('tm-root');
        // The data used to populate the table
        this.data = { source: data, displayed: data };
        // If no specific keys are specified, create the key array by taking the union of all keys in the data object
        this.keys = options.keys || [...new Set(...this.data.source.map(obj => Object.keys(obj)).flat(0))];
        // If no labels are specified, use keys
        this.labels = options.labels || this.keys;
        // Table head is rendered by default
        this.head = typeof options.head === 'boolean' ? options.head : true;
        // Tables are sortable by default
        this.sortable = typeof options.sortable === 'boolean' ? options.sortable : true;
        this.sort = {
            columns: options.sort?.columns || this.keys,
            column: options.sort?.column || null,
            dir: options.sort?.dir || 'asc'
        }
        // Tables are filterable by default
        this.filterable = typeof options.filter === 'boolean' ? options.filter : true;
        this.filter = {
            highlight: typeof options.filter?.highlight === 'boolean' ? options.filter?.highlight : true,
            exact: options.filter?.exact || false,
            placeholder: options.filter?.placeholder || 'Filter'
        }
        // Tables are not paginated by default
        this.paginate = options.paginate || false;
        this.page = {
            rows: options.page?.rows || 10,
            cursor: options.page?.cursor || 0,
            info: typeof options.page?.info === 'boolean' ? options.page?.info : true,
            entryLabel: options.page?.entryLabel || 'rows'
        }
        // Initialize table
        this.init();
    }

    init() {
        // Each component is rendered seperately
        this.root.innerHTML = '';
        // The header (filter input)
        if (this.filterable) {
            const header = document.createElement('div');
            header.className = 'tm-header';
            this.root.appendChild(header);
            this.header = header;
            this.renderHeader();
        }
        // The table element
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'tm-table-wrapper';
        const table = document.createElement('table');
        tableWrapper.appendChild(table);
        this.root.appendChild(tableWrapper);
        this.table = table;
        // The table head
        if (this.head) {
            const thead = document.createElement('thead');
            this.table.appendChild(thead);
            this.head = thead;
            this.renderHead();
        }
        // The table body
        const tbody = document.createElement('tbody');
        this.table.appendChild(tbody);
        this.body = tbody;
        this.renderBody();
        // The footer (pagination info / navigator)
        if (this.paginate) {
            const footer = document.createElement('div');
            footer.className = 'tm-footer';
            this.root.appendChild(footer);
            this.footer = footer;
            this.renderFooter();
        }
    }

    renderHeader() {
        this.header.innerHTML = `<input placeholder="${this.filter.placeholder}" />`;
        this.header.querySelector('input').addEventListener('input', e => {
            this.query = e.target.value;
            this.filterData();
        });
    }

    renderHead() {
        this.head.innerHTML = `
            <tr>
                ${this.keys.reduce((acc, key, i) => {
                    return acc + `
                        <th class="${this.sort.columns.includes(key) ? 'sortable' : ''}">
                            <div>
                                <div>${this.labels[i]}</div>
                                ${this.sortable ? `
                                    <div>
                                        <div class="tm-head-asc">▲</div>
                                        <div class="tm-head-des">▼</div>
                                    </div>
                                ` : ''}
                            </div>
                        </th>
                    `;
                }, '')}
            </tr>
        `;
        // Do sort logic when a th is clicked
        [...this.head.querySelector('tr').querySelectorAll('th')].forEach((th, i) => {
            th.addEventListener('click', e => {
                if (!e.currentTarget.classList.contains('sortable')) return;
                // If we're already sorting by this column, change direction
                if (this.sort.column === this.keys[i]) {
                    this.sort.dir = this.sort.dir === 'asc' ? 'des' : 'asc';
                // Otherwise, sort by ascending initially
                } else {
                    this.sort.dir = 'asc';
                    this.sort.column = this.keys[i];
                }
                // Update active sort indicator icon
                if (this.head.querySelector('.active')) {
                    this.head.querySelector('.active').classList.remove('active');
                }
                this.head.querySelectorAll('.tm-head-' + this.sort.dir)[i].classList.add('active');
                // Sort the data by the new column / direction
                this.sortData();
            });
        })
    }

    renderBody() {
        let rows = this.data.displayed;
        // Paginate if needed
        if (this.paginate) {
            const start = this.page.cursor * this.page.rows;
            const end = start + Math.min(this.page.rows, this.data.displayed.length - start);
            rows = rows.slice(start, end);
        }
        this.body.innerHTML = `
            ${rows.reduce((acc, obj) => {
                return acc + `
                    <tr>
                        ${this.keys.reduce((acc, key) => {
                            // Convert the value to string, or empty string if null
                            let innerHTML = obj[key] || typeof obj[key] === 'boolean' ? String(obj[key]) : '';
                            // If we need to highlight the result of a query, highlight using a RegExp
                            if (String(obj[key]) && this.query && this.filter.highlight) {
                                const exp = new RegExp(this.query, this.filter.exact ? 'g' : 'gi')
                                innerHTML = String(obj[key]).replace(exp, match => `<span class="tm-highlight">${match}</span>`);
                            }
                            return acc + `
                                <td>${innerHTML}</td>
                            `;
                        }, '')}
                    </tr>
                `;
            }, '')}
        `;
    }

    renderFooter() {
        let info;
        // Generate the page info (i.e. the first, last and total number of rows)
        if (this.page.info) {
            const first = this.page.cursor * this.page.rows;
            const last = first + Math.min(this.page.rows, this.data.displayed.length - first);
            info = `<p>Showing ${first + 1} to ${last} of ${this.data.displayed.length} ${this.page.entryLabel}</p>`;
        }
        // The total number of pages
        const pages = Math.ceil(this.data.displayed.length / this.page.rows);
        // Determine which page links should be displayed, 5 links maximum
        const pageLinks = [];
        if (pages > 5) {
            let first, last;
            if (this.page.cursor > (pages - 1) - 3) {
                first = (pages - 1) - 4;
                last = (pages - 1);
            } else if (this.page.cursor < 2) {
                first = 0;
                last = 4;
            } else {
                first = this.page.cursor - 2;
                last = this.page.cursor + 2;
            }
            for (let i = first; i <= last; i++) pageLinks.push(i);
        } else {
            for (let i = 0; i < pages; i++) pageLinks.push(i);
        }
        // Render the page navigation using the displayed page links
        const nav = `
            <div class="tm-nav">
                <button class="tm-seek" ${this.page.cursor === 0 ? 'disabled' : ''}>First</button>
                <button class="tm-seek" ${this.page.cursor === 0 ? 'disabled' : ''}>Prev</button>
                ${pageLinks.reduce((acc, page) => {
                    const innerHTML = `
                        <span class="tm-page-link ${page === this.page.cursor ? 'active' : ''}">${page + 1}</span>
                    `;
                    return acc + innerHTML;
                }, '')}
                <button class='tm-seek' ${this.page.cursor === pages - 1 ? 'disabled' : ''}>Next</button>
                <button class='tm-seek' ${this.page.cursor === pages - 1 ? 'disabled' : ''}>Last</button>
            </div>
        `;
        this.footer.innerHTML = `
            <div>
                ${info || ''}
            </div>
            <div>
                ${nav}
            </div>
        `;
        // Move the page cursor when a seek button or page link is clicked
        [...this.footer.querySelectorAll('.tm-seek, .tm-page-link')].forEach(link => {
            link.addEventListener('click', this.moveCursor);
        });
    }

    refresh() {
        // Reset the pagination if necessary
        if (this.paginate) {
            this.page.cursor = 0;
            this.renderFooter();
        };
        // Rerender the body
        this.renderBody();
    }

    filterData() {
        if (this.query) {
            // Filter using RegExp
            const exp = new RegExp(this.query, this.filter.exact ? 'g' : 'gi');
            this.data.displayed = this.data.source.filter(obj => {
                // Search each key for a value that contains the query
                for (let i = 0; i < this.keys.length; i++) {
                    const text = obj[this.keys[i]];
                    // We only need to find one occurence for the row to be included
                    if (String(text) && String(text).split(exp).length > 1) return true;
                }
                return false;
            });
        } else {
            this.data.displayed = this.data.source;
        }
        // Refresh the table
        this.refresh();
    }

    sortData() {
        // We sort the source so that any filters or future sorts maintain the current sort
        this.data.source.sort((a, b) => {
            // Swap values based on sort direction
            let v1 = this.sort.dir === 'asc' ? a[this.sort.column] : b[this.sort.column];
            let v2 = this.sort.dir === 'asc' ? b[this.sort.column] : a[this.sort.column];
            // Falsey values are treated as negative infinity
            if (!v1) v1 = -Infinity;
            if (!v2) v2 = -Infinity;
            // The usual comparison
            return (v1 > v2) ? 1 : (v1 < v2) ? -1 : 0;
        });

        this.query ? this.filterData() : this.refresh();
    }

    // This is used as an event handler and needs to be an anonymous function so 'this' can be used
    moveCursor = (e) => {
        const destination = e.target.innerText;
        // Move the pagination cursor depending on the inner text of the target element
        if (destination === 'First') {
            this.page.cursor = 0;
        } else if (destination === 'Last') {
            this.page.cursor = Math.ceil(this.data.displayed.length / this.page.rows) - 1;
        } else if (destination === 'Prev') {
            this.page.cursor--;
        } else if (destination === 'Next') {
            this.page.cursor++;
        } else {
            this.page.cursor = Number(destination - 1);
        }
        // Rerender both the body and the footer
        this.renderBody();
        this.renderFooter();
    }
}
<h1 align="center">tableme.js</h1>

*A JavaScript library for generating sortable, filterable and paginatable tables from JSON data.*

<img src="assets/img/sample.png" style="width: 100%; border-radius: 4px;" />

### [Try it out here!](https://mhollingshead.github.io/30-days-30-projects/2-tableme/)

### Tech Stack

* <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" width="16" height="16" /> JavaScript

### Installation

In the `body` of your document, include tableme.js in a script tag:

```html
<script src="path/to/tableme/tableme.js"></script>
```

Optionally, you can include the default theme in the `head` of your document:

```html
<link rel="stylesheet" href="path/to/tableme/default.css" />
```

### Usage

To initialize a new table, simply provide `TableMe` a container (via query selector or DOM element) and a JSON data array:

```javascript
const myTable = new TableMe('#container', data);
```

```javascript
const container = document.querySelector('#container');
const myTable = new TableMe(container, data);
```

If you'd like, you can provide options to the constructor for customization:

```javascript
const options = {
    keys: ['name', 'phone', 'age', 'isActive', 'latitude', 'longitude'],
    labels: ['Name', 'Phone', 'Age', 'Active', 'Latitude', 'Longitude'],
    head: true,
    sortable: true,
    sort: {
        columns: ['name', 'age', 'isActive'],
        column: 'name',
        dir: 'des'
    },
    filterable: true,
    filter: {
        highlight: true,
        exact: true,
        placeholder: 'Filter'
    },
    paginate: true,
    page: {
        rows: 10,
        cursor: 0,
        info: true,
        entryLabel: 'rows'
    }
}

const myTable = new TableMe('#container', data, options);
```

### Options

| Option | Type | Default | Description
| --- | --- | --- | --- |
| options.**`keys`** | `Array<String>` | All keys | The keys that should be included in the table. By default, any keys found within the JSON object array will be included. |
| options.**`labels`** | `Array<String>` | `options.keys` | The labels that should be used for each key in the `thead`. If no labels are provided, the keys will be used. |
| options.**`head`** | `Boolean` | `true` | Indicates whether or not to render the `thead`. `true` by default. |
| options.**`sortable`** | `Boolean` | `true` | Indicates whether or not the table should be sortable by column. `true` by default. |
| options.**`sort.columns`** | `Array<String>` | `options.keys` | An array of `keys`. Indicates which columns should be sortable. If no keys are provided, all columns will be sortable. This value is ignored if `options.sortable` is `false`. |
| options.**`sort.column`** | `String` | `null` | Indicates the column that should be sorted on initialization. By default, no column is sorted. This value is ignored if `options.sortable` is `false`. |
| options.**`sort.dir`** | `"asc"` &#124; `"des"` | `"asc"` | Indicates whether the column should be sorted by `asc`ending or `des`cending order. This value is ignored if `options.sortable` is `false`. |
| options.**`filterable`** | `Boolean` | `true` | Indicates whether or not the table should be filterable. Filter queries are converted to regular expressions, so regex search strings can be used. `true` by default. |
| options.**`filter.highlight`** | `Boolean` | `true` | Indicates whether or not queried selections should be highlighted. `true` by default. This value is ignored if `options.filterable` is `false`. |
| options.**`filter.exact`** | `Boolean` | `false` | Indicates whether or not filter queries should be exact (i.e. case-sensitive). `false` by default. This value is ignored if `options.filterable` is `false`. |
| options.**`filter.placeholder`** | `String` | `"Filter"` | The placeholder text of the filter input element. This value is ignored if `options.filterable` is `false`. |
| options.**`paginate`** | `Boolean` | `false` | Indicates whether or not the table should be paginatable. `false` by default. |
| options.**`page.rows`** | `Number` | `10` | The number of rows that should be displayed per page. This value is ignored if `options.paginate` is `false`. |
| options.**`page.cursor`** | `Number` | `0` | The page that should be displayed on initialization. This value is ignored if `options.paginate` is `false`. |
| options.**`page.info`** | `Boolean` | `true` | Indicates whether or not the page information should be displayed in the footer. This value is ignored if `options.paginate` is `false`. |
| options.**`page.entryLabel`** | `String` | `"rows"` | The label that should be used to represent entries in the page information section. This value is ignored if `options.paginate` or `options.page.info` is `false`. |

### CSS Selectors

If you would like to style the table yourself, you can refer to the selectors below:

| Selector | Description |
| --- | --- |
| `.tm-root` | The container supplied to the constructor |
| `.tm-root .tm-header` | The header component. This component contains the filter input |
| `.tm-root .tm-header input` | The filter input |
| `.tm-root .tm-highlight` | The highlighted sections of text as a result of a filter query. This selector is only valid if `options.filterable` is `true`. |
| `.tm-root .tm-table-wrapper` | The `table` element wrapper |
| `.tm-root table` | The table |
| `.tm-root th` | The `thead` cells |
| `.tm-root th.sortable` | The sortable `thead` cells |
| `.tm-root tbody tr` | The `tbody` rows |
| `.tm-root td` | The `tbody` cells |
| `.tm-root .tm-head-asc`, `.tm-root .tm-head-des` | The ascending / descending sort-direction indicator icons |
| `.tm-root .tm-head-asc.active`, `.tm-root .tm-head-des.active` | The active ascending / descending sort-direction indicator icon |
| `.tm-root .tm-footer` | The footer component. This component contains the pagination info and nav. |
| `.tm-root .tm-nav` | The page navigation component. This selector is only valid if `options.paginate` is `true`. |
| `.tm-root .tm-seek` | The seek buttons (*First*, *Prev*, *Next*, and *Last*) in the page navigation component |
| `.tm-root .tm-page-link` | The page links in the page navigation component |
| `.tm-root .tm-page-link.active` | The active page indicator in the page navigation component |
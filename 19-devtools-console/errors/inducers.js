const errorTypes = ["RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError"];

const errors = {
    code: {
        "RangeError": [
            `String.fromCodePoint(Infinity);`,
            `new Array(0.5);`,
            `1234.5.toPrecision(-1);`,
            `(42).toString(37);`,
            `'abc'.repeat(Infinity);`,
            `'abc'.repeat(-1);`
        ],
        "ReferenceError": [
            `foo.substring(1);`,
            `'use strict'; bar = true;`,
            `console.log(foo); const foo = 33;`,
            `arguments.caller;`
        ],
        "SyntaxError": [
            `03;`,
            `function sum(a = 1, b = 2) { 'use strict'; return a + b; }
            sum();`,
            `const public = 2;`,
            `const iterable = [10, 20, 30];
            for (const value = 50 of iterable) continue;`,
            `const x = 1; delete x;`,
            `a ?? b || c;`,
            `function () { return 'Hello world'; }`,
            `const 1life = 'foo';`,
            `42 – 13;`,
            `Math.PI + 1 = 3 || Math.PI + 1 = 4;`,
            `const obj = { url: /docs/Web, };`,
            `JSON.parse('{"foo": 1,}');`,
            `const obj = { propertyKey = 'value' };`,
            `for (let i = 0; i < 5,; ++i) continue`
        ],
        "TypeError": [
            `const obj = { France: 'Paris', England: 'London' }; 
            for (const p of obj) continue;`,
            `null.foo;`,
            `const foo = {}; Symbol.keyFor(foo);`,
            `const Car = 1; new Car();`,
            `document.getElementByID('foo');`,
            `Object.defineProperty({}, 'key', 1);`,
            `Object.create();`,
            `const COLUMNS = 80; COLUMNS = 120;`
        ],
        "URIError": [
            `encodeURI('\uD800');`
        ]
    },
    "DOMException": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["DOMException"].length);
            eval(errors.code["DOMException"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    "RangeError": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["RangeError"].length);
            eval(errors.code["RangeError"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    "ReferenceError": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["ReferenceError"].length);
            eval(errors.code["ReferenceError"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    "SyntaxError": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["SyntaxError"].length);
            eval(errors.code["SyntaxError"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    "TypeError": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["TypeError"].length);
            eval(errors.code["TypeError"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    "URIError": () => {
        try {
            const randomIndex = Math.floor(Math.random() * errors.code["URIError"].length);
            eval(errors.code["URIError"][randomIndex]);
        } catch(e) {
            console.error(e);
        }
    },
    random: () => {
        const errorType = errorTypes[Math.floor(Math.random() * errorTypes.length)];
        errors[errorType]();
    }
}
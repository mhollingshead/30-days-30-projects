const scope = { x: 2 };

const handleExpressionChange = e => {
    const textExpression = document.querySelector('#text-expression').value.trim();
    const texExpression = document.querySelector('#tex-expression').value.trim();
    const request = document.querySelector('#request-params');
    if (document.querySelector('#text').checked) {
        request.value = '?expression=' + encodeURIComponent(textExpression);
        request.value += Object.entries(scope).map(entry => '&' + entry[0] + '=' + entry[1]).join('');
    }
    if (document.querySelector('#tex').checked) {
        request.value = '?expression=' + encodeURIComponent(texExpression);
        request.value += Object.entries(scope).map(entry => '&' + entry[0] + '=' + entry[1]).join('');
    }
}

const renderVariableList = () => {
    const variableList = document.querySelector('#variables');
    variableList.innerHTML = Object.entries(scope).reduce((acc, entry) => {
        return acc + `
                    <li class="variable">
                        <input type="text" value="${entry[0]}" readonly />
                        <input type="text" value="${entry[1]}" readonly />
                        <button onclick="removeVariable(this.parentNode)" class="remove">Remove</button>
                    </li>
                `;
    }, '');
    variableList.innerHTML += `
                <li class="variable">
                    <input type="text" placeholder="Key" />
                    <input type="text" placeholder="Value" />
                    <button onclick="addVariable(this.parentNode)" class="add">Add</button>
                </li>
            `;
    handleExpressionChange();
};

const addVariable = parent => {
    const inputs = parent.querySelectorAll('input');
    scope[inputs[0].value] = inputs[1].value;
    renderVariableList();
}

const removeVariable = parent => {
    const inputs = parent.querySelectorAll('input');
    delete scope[inputs[0].value];
    renderVariableList();
}

const handleResults = data => {
    document.querySelector('pre code').innerHTML = JSON.stringify(data, null, 4);
    hljs.highlightAll();
    const resultArea = document.querySelector('.results');
    resultArea.innerHTML = '';
    if (data.parsed) {
        resultArea.innerHTML += `<div><h4>Parsed</h4><div>\\[${data.parsed.tex}\\]</div></div>`;
    }
    if (data.simplified) {
        resultArea.innerHTML += `<div><h4>Simplified</h4><div>\\[${data.simplified.tex}\\]</div></div>`;
    }
    if (data.result) {
        resultArea.innerHTML += `<div><h4>Result</h4><div>\\[${data.result}\\]</div></div>`;
    }
    MathJax.typeset();
}

renderVariableList();

document.querySelector('#text-expression').addEventListener('input', handleExpressionChange);
document.querySelector('#tex-expression').addEventListener('input', handleExpressionChange);
document.querySelector('#text').addEventListener('input', handleExpressionChange);
document.querySelector('#tex').addEventListener('input', handleExpressionChange);
document.querySelector('#go').addEventListener('click', () => {
    fetch('http://localhost:8080/' + document.querySelector('#request-endpoint').value + document.querySelector('#request-params').value)
        .then(res => res.json())
        .then(data => {
            document.querySelector('pre code').innerHTML = JSON.stringify(data, null, 4);
            hljs.highlightAll();
            const resultArea = document.querySelector('.results');
            resultArea.innerHTML = '';
            if (data.parsed) {
                resultArea.innerHTML += `<div><h4>Parsed</h4><div>\\[${data.parsed.tex}\\]</div></div>`;
            }
            if (data.simplified) {
                resultArea.innerHTML += `<div><h4>Simplified</h4><div>\\[${data.simplified.tex}\\]</div></div>`;
            }
            if (data.result) {
                resultArea.innerHTML += `<div><h4>Result</h4><div>\\[${data.result}\\]</div></div>`;
            }
            MathJax.typeset();
        })
        .catch(() => {
            const data = window[document.querySelector('#request-endpoint').value + 'Expression']({
                query: {
                    ...scope,
                    expression: encodeURIComponent(
                        document.querySelector(
                            document.querySelector('#text').checked ? '#text-expression' : '#tex-expression'
                        ).value.trim()
                    )
                }
            });
            handleResults(data);
        });
});
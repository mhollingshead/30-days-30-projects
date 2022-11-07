const handleTldChange = () => {
    const com = document.querySelector('#com').checked;
    const org = document.querySelector('#org').checked;
    const net = document.querySelector('#net').checked;
    const params = document.querySelector('#request-params');
    if (com && org && net) {
        params.value = '';
    } else {
        const tlds = [];
        if (com) tlds.push('com');
        if (org) tlds.push('org');
        if (net) tlds.push('net');
        params.value = `?tlds=${tlds.join(',')}`;
    }
};

const handleResponse = (data, cb) => {
    const results = document.querySelector('#results');
    if (data.status) {
        document.querySelector('pre code').innerHTML = JSON.stringify(data, null, 4);
        hljs.highlightAll();
        results.innerHTML = '';
        cb();
        return;
    }
    document.querySelector('pre code').innerHTML = JSON.stringify(data, null, 4);
    hljs.highlightAll();
    results.innerHTML = `
        <div>
            <div class="big blue">${data.domain}</div>
        </div>
        <div>
            <h4><b>${data.normalized}</b> Definition</h4>
            ${data.definitions.length > 0
                ? `<ol>
                    ${data.definitions.reduce((acc, def) => acc + `
                        <li>
                            <div class="secondary"><i>${def.pos.toLowerCase()}</i></div>
                            <div class="def">${def.definition}</div>
                        </li>
                    `, '')}
                </ol>`
                : '<div class="secondary"><i>No definitions found. Try Google!</i></div>'
            }
        </div>
    `;
    cb();
};

const handleRequest = cb => {
    const results = document.querySelector('#results');
    results.innerHTML = `
        <div class="loading">
            <h3>Searching for dictionary domains...</h3>
            <p class="description">Due to RDAP rate limits, there is a 500ms cooldown between each domain search. Please allow up to 30s for a response.</p>
        </div>
    `;

    const params = document.querySelector('#request-params').value;
    const requestUrl = 'http://localhost:8888' + params;
    fetch(requestUrl)
        .then(res => res.json())
        .then(data => handleResponse(data, cb))
        .catch(async () => {
            const data = await router({ query: { tlds: params ? params.split('=')[1] : null } });
            handleResponse(data, cb);
        });
}

[...document.querySelectorAll('input[type="checkbox"]')].forEach(input => {
    input.addEventListener('input', handleTldChange);
});

document.querySelector('#go').addEventListener('click', e => {
    e.target.disabled = true;
    handleRequest(() => e.target.disabled = false);
});
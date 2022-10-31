// Copy string to clipboard using dummy textarea
const copyToClipboard = str => {
    const tmp = document.createElement('textarea');
    tmp.value = str;
    tmp.setAttribute('readonly', '');
    tmp.style = { position: 'absolute', left: '-1000vw' };
    document.body.appendChild(tmp);
    tmp.select();
    // Depreciated, but currently working in chrome
    document.execCommand('copy');
    document.body.removeChild(tmp);
};

// Shorter names for encode/decodeURIComponent
const encode = encodeURIComponent;
const decode = decodeURIComponent;
// Sort key,value pairs by value type
const typeSorter = ([_, a], [__, b]) => typeof a < typeof b ? 1 : typeof a > typeof b ? -1 : 0;
// Sort key,value pairs alphabetically by key
const keySorter = ([a, _], [b, __]) => a > b ? 1 : a < b ? -1 : 0;
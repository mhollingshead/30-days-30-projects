const collectVariables = () => {
    // Use computedStyleMap to get CSS declarations from :root and body
    const properties = [
        ...Array.from(document.documentElement.computedStyleMap()),
        ...Array.from(document.body.computedStyleMap())
    ];
    // Sort out non-variable properties and convert values to string
    const variables = properties
        .filter(([prop, _]) => prop.slice(0, 2) === '--')
        .map(([prop, value]) => [prop, String(value).trim()]);

    const varTree = {}, varDict = {}, styleDict = {};
    // Loop through the property,value entries
    variables.forEach(([prop, value]) => {
        // Slice the '--' from the beginning of the variable name
        const name = prop.slice(2);
        // Split kebab, snake, and camel-case names into individual words
        const path = name.replace(/-|_/g, '.').replace(/[A-Z]/g, ".$&").toLowerCase().split('.').filter(k => k);
        // Get the destination word for the current value
        const lastLeaf = path.pop();
        // Create the tree for the current property
        const branch = path.reduce((object, key) => object[key] = object[key] || {}, varTree);
        // Set the last leaf's value to the style
        branch[lastLeaf] = value;
        // Add the property,value entry to the variable dictionary
        varDict[prop] = value;
        // Push the variable name to the current style's list of properties
        if (styleDict[value]) {
            // Ignore any duplicates
            if (!styleDict[value].includes(prop)) {
                styleDict[value].push(prop);
            }
        } else {
            styleDict[value] = [prop];
        }
    });
    // Return the three data objects
    return { tree: varTree, dict: varDict, styles: styleDict };
}

chrome.runtime.onMessage.addListener((msg, _, response) => {
    // Listen for messages from the popup
    if (msg.from === 'popup' && msg.subject === 'collect-variables') {
        // Collect variables
        const variables = collectVariables();
        // Send the data objects to the callback
        response(variables);
    }
});
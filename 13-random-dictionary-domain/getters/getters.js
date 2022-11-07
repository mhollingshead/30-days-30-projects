const axios = require('axios');

const getRandomWords = number => new Promise(resolve => {
    axios.get(`https://random-word-api.herokuapp.com/word?number=${number}`)
        .then(res => resolve(res.data))
        .catch(() => resolve(false));
});

const getAvailability = domain => new Promise(resolve => {
    axios.get(`https://rdap.org/domain/${domain}`)
        .then(res => {
            console.log(`${domain} response status: ${res.status}`);
            // RDAP entry was found
            resolve(0);
        })
        .catch((res) => {
            console.log(`${domain} response status: ${res.response.status}`);
            // Rate limit exceeded
            if (res.response.status === 429) resolve(-1);
            // RDAP entry not found (.com, .net)
            else if (res.response.status === 404) resolve(1);
            // Default to entry found
            else resolve(0);
        });
});

const getDefinitions = word => new Promise((resolve) => {
    axios.get(`https://en.wiktionary.org/w/api.php?format=json&action=query&titles=${word.toLowerCase()}&rvprop=content&prop=revisions&redirects=1&callback=?`)
        .then(res => {
            // Format response to valid JSON and parse
            const data = JSON.parse(res.data.substr(5, res.data.length - 6));
            // Initialize results
            const definitions = [];
            let title, content;
            // If we didn't receive the necessary data, resolve empty array
            if (!data || !data.query || !data.query.pages || data.query.pages[-1]) {
                return resolve(definitions);
            }
            // https://github.com/PalmerAL/wiktionary-parser
            for (var page in data.query.pages) {
                title = data.query.pages[page].title;
                content = data.query.pages[page].revisions[0]["*"];
            }
            var text = content.split("\n");
            var heading1Regex = /^(==)([\w\s]+)(==)$/g;
            var heading2Regex = /^(===)([\w\s]+)(===)$/g;
            var heading3Regex = /^(====)([\w\s]+)(====)$/g;
            var linkRegex = /(\[+)([\w\s-]+)(\]+)/g;
            var type2LinkRegex = /(\[+)(\w+)([#|\w]+)(\]+)/g;
            var wikipediaArticleRegex = /(\[+)(:?w:)([\w\s]+)\|([\w\s]+)(\]+)/g;
            var contextDataRegex = /(\[+)([\w\W]+)(\]+)|({+)([\w\W]+)(}+)/g;
            var startingAndTrailingCommasRegex = /(^, )|(,$)/g;
            var italicsRegex = /''/g;
            var wordCharactersRegex = /\w/g;
            var heading1, heading2, heading3;
            function normalizeWikidata(text) {
                text = text.replace(linkRegex, "$2"); //remove links to other words from definitions;
                text = text.replace(type2LinkRegex, "$2"); //replace links of the form [[information|Information]]
                text = text.replace(wikipediaArticleRegex, "$4"); //replace links to wikipedia articles with the link text
                text = text.replace(contextDataRegex, ""); //get rid of any extra data that is not human-readiable
                return text;
            }
            text.forEach(function (line) {
                if (heading1Regex.test(line)) {
                    heading1 = line.replace(heading1Regex, "$2");
                }
                if (heading2Regex.test(line)) {
                    heading2 = line.replace(heading2Regex, "$2");
                }
                if (heading3Regex.test(line)) {
                    heading3 = line.replace(heading3Regex, "$2");
                }
                if (line.indexOf("# ") == 0 && heading1 == 'English') {
                    var newDefinition = line.replace("# ", "");
                    newDefinition = normalizeWikidata(newDefinition);
                    newDefinition = newDefinition.replace(startingAndTrailingCommasRegex, "");
                    newDefinition = newDefinition.replace(italicsRegex, "");
                    if (wordCharactersRegex.test(newDefinition)) { //makes sure there is actually a definition
                        var heading = heading2;
                        if (heading.toLowerCase().indexOf("etymology") != -1 || heading.toLowerCase().indexOf("pronounciation") != -1) {
                            heading = heading3;
                        }
                        // Adapt result data
                        definitions.push({
                            word: word,
                            pos: heading,
                            definition: newDefinition.trim()
                        });
                    }

                }
            });
            resolve(definitions);
        })
        .catch(() => resolve([]));
});

module.exports = { getRandomWords, getAvailability, getDefinitions };
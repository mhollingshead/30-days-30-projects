// A client-side implementation of the API to fall back on if default port isn't listening.

const validTlds = ['com', 'org', 'net'];

const errorMessages = {
    400: 'Invalid Request: No valid TLDs were provided. The tld param accepts one or multiple of com|org|net in a comma-separated list.',
    404: 'No Domain Found: No available domain was found in this batch. Each request searches a maximum of 60 domains before aborting.',
    429: 'Unable to Continue: The rate limit of an RDAP endpoint was exceeded. Please try again later. (See https://about.rdap.org/ for more details)',
    500: 'Server Error: An unexpected error occurred. PPlease try again later.'
}

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const normalize = word => {
    const doc = nlp(word);
    doc.nouns().toSingular();
    doc.verbs().toInfinitive();
    return doc.out();
}

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
    $.getJSON(`https://en.wiktionary.org/w/api.php?format=json&action=query&titles=${word}&rvprop=content&prop=revisions&redirects=1&callback=?`, function (data) {
		const definitions = [];
		var title, content;
		if(!data || !data.query || !data.query.pages || data.query.pages[-1]) {
			resolve([])
		}
		for (var page in data.query.pages) {
			title = data.query.pages[page].title;
			content = data.query.pages[page].revisions[0]["*"];
		}
		results.title = title;
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
			if(heading3Regex.test(line)) {
				heading3 = line.replace(heading3Regex, "$2");
			}
			if (line.indexOf("# ") == 0 && heading1 == 'English') {
				var newDefinition = line.replace("# ", "");
				newDefinition = normalizeWikidata(newDefinition);
				newDefinition = newDefinition.replace(startingAndTrailingCommasRegex, ""); //remove starting and trailing commas that might occur (since some extra data that is removed occurs at the beginning and ends of definitions)
				newDefinition = newDefinition.replace(italicsRegex, "");
				if (wordCharactersRegex.test(newDefinition)) { //makes sure there is actually a definition	
					var heading = heading2;
					if(heading.toLowerCase().indexOf("etymology") != -1 || heading.toLowerCase().indexOf("pronounciation") != -1) {
						heading = heading3;
					}
					definitions.push({
                        word: word,
                        pos: heading,
                        definition: newDefinition.trim()
                    });
				}

			}
		});
		resolve(definitions)
	});
});

const router = async req => {
    // Get the requested TLDs from the request parameters.
    // If none are provided, default to all valid TLDs.
    const tldOptions = req.query.tlds?.toLowerCase().split(',') || validTlds;
    // Filter valid TLDs only
    const tlds = tldOptions.filter(tld => validTlds.includes(tld));
    // If tlds is empty, all requested tlds were invalid
    if (tlds.length === 0) return ({ status: 400, message: errorMessages[400] });
    // Get random words. We'll check all TLDs for availability.
    // We want 60 domains max, so divide by tlds.length
    const words = await getRandomWords(60 / tlds.length);
    // If no words were received, there was an error with the word API
    if (words.length === 0) return ({ status: 500, message: errorMessages[500] });
    // Combine the words and TLDs to get our list of domains
    const domains = words.map(word => tlds.map(tld => `${word}.${tld}`)).flat();
    // Loop through each domain
    for (let i = 0; i < domains.length; i++) {
        // The current domain
        const domain = domains[i];
        // The dictionary word used to generate the domain
        const word = domain.split('.')[0];
        // The TLD
        const tld = `.${domain.split('.')[1]}`;
        // Normalize the word
        const normalized = normalize(word);
        // Get the status of the domain
        const status = await getAvailability(domain);
        // If we receive a rate-limit-related error
        if (status === -1) {
            // Abort immediately
            return ({ status: 429, message: errorMessages[429] });
        // If the domain is available
        } else if (status === 1) {
            // Get any definitions
            let definitions;
            try {
                definitions = await getDefinitions(normalized);
            } catch (e) {
                definitions = [];
            }
            // Respond with all relevant data
            return ({
                // The domain name
                "domain": domain,
                // The dictionary word used to generate the domain
                "word": word,
                // The available TLD
                "tld": tld,
                // The normalized word (singular / infinite tense)
                "normalized": normalized,
                // Any Wiktionary definitions found for the normalized word
                "definitions": definitions
            });
        // If the domain is unavailable
        } else if (i < domains.length - 1) {
            // Pause for 500ms. RDAP rate limits specify < 5 requests per second.
            await pause(500);
        }
    }
    // If we've checked all 60 domains and none are available, respond accordingly.
    return ({ status: 404, message: errorMessages[404] });
}
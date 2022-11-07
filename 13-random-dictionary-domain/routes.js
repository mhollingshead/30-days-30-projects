const { getRandomWords, getAvailability, getDefinitions } = require('./getters/getters');
const { validTlds, errorMessages } = require('./common/constants');
const { normalize, pause } = require('./common/utils');
const router = require("express").Router();

router.get('/', async (req, res) => {
    // Get the requested TLDs from the request parameters.
    // If none are provided, default to all valid TLDs.
    const tldOptions = req.query.tlds?.toLowerCase().split(',') || validTlds;
    // Filter valid TLDs only
    const tlds = tldOptions.filter(tld => validTlds.includes(tld));
    // If tlds is empty, all requested tlds were invalid
    if (tlds.length === 0) return res.status(400).send(errorMessages[400]);
    // Get random words. We'll check all TLDs for availability.
    // We want 60 domains max, so divide by tlds.length
    const words = await getRandomWords(60 / tlds.length);
    // If no words were received, there was an error with the word API
    if (words.length === 0) return res.status(500).send(errorMessages[500]);
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
            return res.status(429).send(errorMessages[429]);
        // If the domain is available
        } else if (status === 1) {
            // Get any definitions
            const definitions = await getDefinitions(normalized);
            // Respond with all relevant data
            return res.status(200).json({
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
    return res.status(404).send(errorMessages[404]);
});

module.exports = router;
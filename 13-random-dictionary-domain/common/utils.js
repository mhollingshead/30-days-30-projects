const nlp = require('compromise');

const pause = ms => new Promise(resolve => setTimeout(resolve, ms));

const normalize = word => {
    const doc = nlp(word);
    doc.nouns().toSingular();
    doc.verbs().toInfinitive();
    return doc.out();
}

module.exports = { pause, normalize };
const pdfWorkerPath = 'js/pdf/pdf.worker.min.js';
const pixelRatio = window.devicePixelRatio * 2;

const posFilter = {
    ADJ: true,
    ADP: false,
    ADV: false,
    AUX: false,
    CCONJ: false,
    DET: false,
    INTJ: false,
    NOUN: true,
    NUM: false,
    PART: false,
    PRON: false,
    PROPN: true,
    PUNCT: false,
    SCONJ: false,
    SYM: false,
    VERB: true,
    X: false,
    SPACE: false
}

const posMap = {
    ADJ: {
        abbr: 'adj.',
        full: 'Adjective'
    },
    ADP: {
        abbr: 'adp.',
        full: 'Adposition'
    },
    ADV: {
        abbr: 'adv.',
        full: 'Adverb'
    },
    AUX: {
        abbr: 'aux.',
        full: 'Auxiliary'
    },
    CCONJ: {
        abbr: 'cconj.',
        full: 'Coordinating conjuction'
    },
    DET: {
        abbr: 'det.',
        full: 'Determiner'
    },
    INTJ: {
        abbr: 'intj.',
        full: 'Interjection'
    },
    NOUN: {
        abbr: 'noun',
        full: 'Noun'
    },
    NUM: {
        abbr: 'num.',
        full: 'Number'
    },
    PART: {
        abbr: 'part.',
        full: 'Particle'
    },
    PRON: {
        abbr: 'pron.',
        full: 'Pronoun'
    },
    PROPN: {
        abbr: 'propn.',
        full: 'Proper noun'
    },
    SCONJ: {
        abbr: 'sconj.',
        full: 'Subordinating conjuction'
    },
    VERB: {
        abbr: 'verb',
        full: 'Verb'
    }
}
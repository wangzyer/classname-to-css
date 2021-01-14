const MOO_CSS_TABLE = {
    'mt': 'margin-top',
    'mb': 'margin-bottom',
    'ml': 'margin-left',
    'mr': 'margin-right',
    'm': 'margin',
    'pt': 'padding-top',
    'pb': 'padding-bottom',
    'pl': 'padding-left',
    'pr': 'padding-right',
    'p': 'padding',
    'fs': 'font-size',
    'w': 'width',
    'h': 'height',
    'lh': 'line-height',
    'br': 'border-radius'
};
const UPLOAD_SCORE = {
    files: ['package.json'],
    dirs: ['src']
};
const MO0_CSS_REGEXP = /(?<!\.)(g|u)-[a-z]+\d+/g;

module.exports = {
    UPLOAD_SCORE,
    MOO_CSS_TABLE,
    MO0_CSS_REGEXP
};


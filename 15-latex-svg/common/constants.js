const widthMatch = /(?<=width=')(.*?)(?=' height)/g;
const heightMatch = /(?<=height=')(.*?)(?=' viewBox)/g;
const svgMatch = /(?<=<svg )(.*?)(?=>)/g;
const gMatch = /(?<=<g )(.*?)(?=>)/g;
const matrixMatch = /(?<=matrix\()(.*?)(?=\))/g;
const rectMatch = /(?<=<rect )(.*?)(?=>)/g;
const yMatch = /(?<=y=')(.*?)(?=')/g;
const rectHeightMatch = /(?<=height=')(.*?)(?=')/g;

const themes = {
    'default-light': {
        bg: '#ffffff',
        fg: '#24292f'
    },
    'default-dark': {
        bg: '#0d1117',
        fg: '#c9d1d9'
    },
    'dark-dimmed': {
        bg: '#22272e',
        fg: '#adbac7'
    },
    'dark-high-contrast': {
        bg: '#0a0c10',
        fg: '#f0f3f6'
    }
}

module.exports = { widthMatch, heightMatch, svgMatch, gMatch, matrixMatch, rectMatch, yMatch, rectHeightMatch, themes };
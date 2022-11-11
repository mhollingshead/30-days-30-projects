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
        fg: '#24292f',
        border: '#d0d7de',
        error: '#cf222e'
    },
    'default-dark': {
        bg: '#0d1117',
        fg: '#c9d1d9',
        border: '#30363d',
        error: '#f85149'
    },
    'dark-dimmed': {
        bg: '#22272e',
        fg: '#adbac7',
        border: '#444c56',
        error: '#e5534b'
    },
    'dark-high-contrast': {
        bg: '#0a0c10',
        fg: '#f0f3f6',
        border: '#7a828e',
        error: '#ff6a69'
    }
}

const errorSvgs = {
    inline: theme => `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="142" height="34">
            <rect x="0" y="0" width="142" height="24" rx="4" fill="${themes[theme].error}"></rect>
            <svg x="6" y="6" viewBox="0 0 485.811 485.811" width="12" height="12" fill="#fff">
                <path d="M 476.099,353.968l-170.2-294.8c-27.8-48.7-98.1-48.7-125.8,0l-170.3,294.8c-27.8,48.7,6.8,109.2,62.9,109.2h339.9C468.699,463.168,503.899,402.068,476.099,353.968z M242.899,397.768c-14.8,0-27.1-12.3-27.1-27.1s12.3-27.1,27.1-27.1c14.8,0,27.1,12.3,26.5,27.8C270.099,385.468,257.099,397.768,242.899,397.768z M267.599,222.568c-1.2,21-2.5,41.9-3.7,62.9c-0.6,6.8-0.6,13-0.6,19.7c-0.6,11.1-9.3,19.7-20.4,19.7s-19.7-8-20.4-19.1c-1.8-32.7-3.7-64.8-5.5-97.5c-0.6-8.6-1.2-17.3-1.9-25.9c0-14.2,8-25.9,21-29.6c13-3.1,25.9,3.1,31.5,15.4c1.9,4.3,2.5,8.6,2.5,13.6C269.499,195.468,268.199,209.068,267.599,222.568z"/>
            </svg>
            <text x="24" y="17" class="text" fill="#fff" style="font-size: 14px; font-family: sans-serif">Invalid expression</text>
        </svg>
    `,
    display: theme => `
        <svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="142" height="24">
            <rect x="0" y="0" width="142" height="24" rx="4" fill="${themes[theme].error}"></rect>
            <svg x="6" y="6" viewBox="0 0 485.811 485.811" width="12" height="12" fill="#fff">
                <path d="M 476.099,353.968l-170.2-294.8c-27.8-48.7-98.1-48.7-125.8,0l-170.3,294.8c-27.8,48.7,6.8,109.2,62.9,109.2h339.9C468.699,463.168,503.899,402.068,476.099,353.968z M242.899,397.768c-14.8,0-27.1-12.3-27.1-27.1s12.3-27.1,27.1-27.1c14.8,0,27.1,12.3,26.5,27.8C270.099,385.468,257.099,397.768,242.899,397.768z M267.599,222.568c-1.2,21-2.5,41.9-3.7,62.9c-0.6,6.8-0.6,13-0.6,19.7c-0.6,11.1-9.3,19.7-20.4,19.7s-19.7-8-20.4-19.1c-1.8-32.7-3.7-64.8-5.5-97.5c-0.6-8.6-1.2-17.3-1.9-25.9c0-14.2,8-25.9,21-29.6c13-3.1,25.9,3.1,31.5,15.4c1.9,4.3,2.5,8.6,2.5,13.6C269.499,195.468,268.199,209.068,267.599,222.568z"/>
            </svg>
            <text x="24" y="17" class="text" fill="#fff" style="font-size: 14px; font-family: sans-serif">Invalid expression</text>
        </svg>
    `
}

module.exports = { widthMatch, heightMatch, svgMatch, gMatch, matrixMatch, rectMatch, yMatch, rectHeightMatch, themes, errorSvgs };
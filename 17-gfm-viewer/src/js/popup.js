let activeTheme = JSON.parse(localStorage.getItem('gfmv-theme')) || 'Light default';

const themes = [
    'Light default',
    'Light high contrast',
    'Light colorblind',
    'Light Tritanopia',
    'Dark default',
    'Dark high contrast',
    'Dark colorblind',
    'Dark Tritanopia',
    'Dark dimmed'
];

themes.forEach(theme => {
    const id = theme.toLowerCase().replaceAll(' ', '-');
    document.querySelector('.theme-preview').innerHTML += `
                <img src="../assets/svg/previews/${id}.svg" class="${theme === activeTheme ? 'active' : ''}" id="${id}" />
            `;
    document.querySelector('.theme-choices').innerHTML += `
                <div class="theme-choice ${theme === activeTheme ? 'active' : ''}">
                    <img src="../assets/svg/discs/${id}.svg" />
                </div>
            `;
    if (theme === activeTheme) {
        document.querySelector('.theme-title').innerHTML = theme;
    }
});

Array.from(document.querySelectorAll('.theme-choice')).forEach((choice, i) => {
    const previews = document.querySelectorAll('.theme-preview img');
    choice.addEventListener('mouseover', e => {
        const activeThemeId = activeTheme.toLowerCase().replaceAll(' ', '-');
        document.querySelector(`#${activeThemeId}`).className = '';
        previews[i].className = 'active';
        document.querySelector('.theme-title').innerHTML = themes[i];
    });
    choice.addEventListener('mouseout', e => {
        const activeThemeId = activeTheme.toLowerCase().replaceAll(' ', '-');
        previews[i].className = '';
        document.querySelector(`#${activeThemeId}`).className = 'active';
        document.querySelector('.theme-title').innerHTML = activeTheme;
    });
    choice.addEventListener('click', e => {
        const theme = themes[i];
        if (theme === activeTheme) return;
        document.querySelector('.theme-choice.active').className = 'theme-choice';
        e.currentTarget.className = 'theme-choice active';
        activeTheme = theme;
        localStorage.setItem('gfmv-theme', JSON.stringify(theme));

        const activeThemeId = activeTheme.toLowerCase().replaceAll(' ', '-');

        chrome.tabs.query(
            { active: true, currentWindow: true },
            tabs => chrome.tabs.sendMessage(tabs[0].id, { theme: activeThemeId })
        );
    });
})
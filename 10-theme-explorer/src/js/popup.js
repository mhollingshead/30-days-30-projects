const requestVariables = () => chrome.tabs.query(
    { active: true, currentWindow: true }, 
    tabs => {
        // Request variable data from content.js
        chrome.tabs.sendMessage(
            tabs[0].id,
            { from: 'popup', subject: 'collect-variables' },
            res => {
                // If no response was received, render the 'no data' component
                if (!res) return renderNoData(state.active);
                // Otherwise, update the data objects in state
                const { tree, dict, styles } = res;
                state.tree = tree || state.tree;
                state.dict = dict || state.dict;
                state.styles = styles || state.styles;
                // Render the active component
                render(state.active);
            }
        );
    }
);

const toggleActiveTab = activeTab => {
    if (activeTab === state.activeTab) return;
    // Update the active tab in state
    state.active = activeTab;
    // Loop through each tab
    const tabs = ['tree', 'dict', 'styles'];
    tabs.forEach(tab => {
        if (tab === activeTab) {
            // If the tab is the active tab, update it's classes
            document.querySelector(`.${tab}-tab`).className = `tab ${tab}-tab active`;
            // Display and render it's associated component
            document.querySelector(`.${tab}`).className = `${tab}`;
            render(activeTab);
        } else {
            // Otherwise, update the inactive tab's classes
            document.querySelector(`.${tab}-tab`).className = `tab ${tab}-tab`;
            // Hide it's associated component
            document.querySelector(`.${tab}`).className = `${tab} hidden`;
        }
    });
}

window.addEventListener('DOMContentLoaded', () => {
    // When the popup loads, request the variable data from content.js
    requestVariables();
    // Update variable data whenever the refresh button is clicked
    document.querySelector('.refresh').addEventListener('click', requestVariables);
    // Update the active tab when a tab is clicked
    [...document.querySelectorAll('.tab')].forEach(tab => {
        tab.addEventListener('click', () => toggleActiveTab(tab.id));
    });
});
const axios = require('axios');

const getEquationSVG = tex => new Promise(resolve => {
    axios.get(`https://latex.codecogs.com/svg.latex?${tex}`)
        .then(res => resolve(res.data))
        .catch(() => resolve(false));
});

module.exports = { getEquationSVG };
const { themes, errorSvgs, heightMatch, widthMatch, gMatch, rectMatch, matrixMatch, yMatch, rectHeightMatch } = require("./common/constants");
const { getEquationSVG } = require("./getters/getters");
const router = require("express").Router();

const getBaseline = async (latex, height) => {
    const baselineSVG = await getEquationSVG(latex);
    const gAttributes = baselineSVG.match(gMatch)[0];
    const rectAttributes = baselineSVG.match(rectMatch)[0];
    const transformMatrix = gAttributes.match(matrixMatch)[0].split(' ');
    const rectY = parseFloat(rectAttributes.match(yMatch)[0]);
    const rectHeight = parseFloat(rectAttributes.match(rectHeightMatch)[0]);
    const gScale = parseFloat(transformMatrix[0]);
    const gTransformY = parseFloat(transformMatrix[5]);
    const aboveBaseline = ((rectY + rectHeight) * gScale + gTransformY) * 1.3333;
    const belowBaseline = height - aboveBaseline;
    return { aboveBaseline, belowBaseline };
}

router.get('/', async (req, res) => {
    let latex = req.query.latex, baselineLatex;
    // Set up the options object
    const options = {
        // The default theme is default-light
        theme: themes[req.query.theme] ? req.query.theme : 'default-light' ,
        // By default, no background is rendered
        background: req.query.background === 'true' ? true : false,
        // By default, equations are assumed to be inline
        display: req.query.display === 'true' ? true : false
    }
    // Prepare the error SVG if necessary
    const errorSvg = errorSvgs[options.display ? 'display' : 'inline'](options.theme);
    // Set the response content-type
    res.setHeader('Content-Type', 'image/svg+xml');
    // If no LaTeX was sent, return invalid expression
    if (!latex) return res.status(200).send(errorSvg);
    // Prepend the \inline flag if display is false
    if (!options.display) {
        baselineLatex = '\\inline&space;\\_' + latex;
        latex = '\\inline&space;' + latex;
    };
    // Fetch the equation SVG
    const equationSVG = await getEquationSVG(latex);
    // If there was an error fetching the equation SVG, return invalid
    if (!equationSVG) return res.status(200).send(errorSvg);
    // Convert equation width and height from pt to px
    const width = parseFloat(equationSVG.match(widthMatch)[0].replace('pt', '')) * 1.3333;
    const height = parseFloat(equationSVG.match(heightMatch)[0].replace('pt', '')) * 1.3333;
    // Add padding if redering with a background
    const padding = 8 * options.background;
    // If the equation is inline, add an offset to adjust for line-height
    let offsetBottom = 0, offsetTop = 0;
    if (!options.display) {
        const { aboveBaseline, belowBaseline } = await getBaseline(baselineLatex, height);
        // Add top and bottom offset according to the baseline location
        if (aboveBaseline > belowBaseline) {
            offsetBottom -= Math.max(belowBaseline, 0);
            offsetBottom += Math.max(aboveBaseline, 0);
        } else {
            offsetTop -= Math.max(aboveBaseline, 0);
            offsetTop += Math.max(belowBaseline, 0);
        }
    }
    // Render the final SVG
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="${width + padding * 2}" height="${height + padding * 2 + offsetBottom + offsetTop}">
            <style>
                #background {
                    fill: ${!options.background ? 'transparent' : themes[options.theme].bg};
                }
                #equation {
                    fill: ${themes[options.theme].fg};
                }
            </style>
            <rect id="background" width="${width + padding * 2}" height="${height + padding * 2}" rx="4" x="0" y="${offsetTop}"></rect>
            ${equationSVG
                // Insert id and positioning
                .replace('<svg', `<svg id="equation" x="${padding}" y="${padding + offsetTop}"`)
                // Remove XML namespace
                .replace(`xmlns='http://www.w3.org/2000/svg'`, '')
                // Remove version
                .replace(`version='1.1'`, '')
                // Replace pt width and height with our px width and height
                .replace(widthMatch, width)
                .replace(heightMatch, height)
                // Remove <?XML ?>
                .split('\n').slice(1).join('\n')
            }
        </svg>`;

    return res.status(200).send(svg);
});

module.exports = router;
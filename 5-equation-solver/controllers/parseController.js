const { isTex, texToMath } = require("../common/utils");
const { create, all } = require("mathjs");

const math = create(all);

const parseExpression = (req, res) => {
    // Get the expression string from the query
    const expressionQuery = decodeURIComponent(req.query.expression);
    // Only continue if an expression has been supplied
    if (!expressionQuery) {
        return res.status(200).json({
            valid: false,
            error: 'Request Error: No expression provided'
        });
    }
    // The rest of the query parameters will be our scope, e.g. variable assignments
    delete req.query.expression;
    const scope = req.query;
    // Convert the expression query to mathjs-supported string
    const expression = isTex(expressionQuery) ? texToMath(expressionQuery) : expressionQuery;
    // If the expression is invalid tex, respond accordingly
    if (!expression) {
        return res.status(200).json({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Initialize the necessary variables
    let node;
    try {
        // Parse the expression into a node tree
        node = math.parse(expression);
    } catch(e) {
        // If the expression can't be parsed, respond accordingly
        return res.status(200).json({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Respond with the necessary information
    res.status(200).json({
        valid: true,
        error: '',
        input: {
            expression: expressionQuery,
            scope: scope
        },
        parsed: {
            string: node.toString(),
            tex: node.toTex()
        }
    });
};

module.exports = { parseExpression };
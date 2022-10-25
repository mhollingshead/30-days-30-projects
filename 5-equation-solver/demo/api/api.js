// If localhost:8080 isn't available, simulate the API logic in-browser:

const isTex = input => input.includes('\\') || input.includes('{') || input.includes('}');

const texToMath = input => {

	var init, fraction, square_root, nth_root, nth_power, sin, cos, tan, sinCosTanFramework, convert_others;

	init = function() {
		var st1 = input;
		st1 = st1.replace(/\s/g, "");
		st1 = st1.replace(/\\times/g, "*");
		st1 = st1.replace(/\\cdot/g, "*");
		st1 = st1.replace(/\\div/g, "/");

		//pi
		st1 = st1.replace(/([0-9a-zA-Z\.]+)\\pi/g, "$1*3.142");
		st1 = st1.replace(/\\pi([0-9a-zA-Z\.]+)/g, "3.142*$1");
		st1 = st1.replace(/([0-9a-zA-Z\.]+)\\pi([0-9a-zA-Z\.]+)/g, "$1*3.142*$2");
		st1 = st1.replace(/\\pi/g, "3.142");

		st1 = fraction(st1);
		st1 = square_root(st1);
		st1 = nth_root(st1);
		st1 = nth_power(st1);
		st1 = sin(st1);
		st1 = tan(st1);
		st1 = cos(st1);

		//clean up brackets
		st1 = st1.replace(/\\left\(/g, "(");
		st1 = st1.replace(/\\right\)/g, ")");
		return st1;
	};

	fraction = function(input) {
		while (input.search(/\\frac\{(((?![\{\}]).)*)\}\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/\\frac\{(((?![\{\}]).)*)\}\{(((?![\{\}]).)*)\}/g, "($1)/($3)");
		}

		if (input.search(/\\frac/) >= 0) {
			input = convert_others("fraction", input);
		}

		return input;
	};

	square_root = function(input) {
		while (input.search(/\\sqrt\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/\\sqrt\{(((?![\{\}]).)*)\}/g, "sqrt($1)");
		}

		if (input.search(/\\sqrt\{/) >= 0) {
			input = convert_others("square root", input);
		}

		return input;
	};

	nth_root = function(input) {
		while (input.search(/\\sqrt\[(((?![\{\}]).)*)\]\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/\\sqrt\[(((?![\{\}]).)*)\]\{(((?![\{\}]).)*)\}/g, "pow($3,1/$1)");
		}
		if (input.search(/\\sqrt\[/) >= 0) {
			input = convert_others("nth root", input);
		}
		return input;
	};

	nth_power = function(input) {
		//first case: single number with curly bracket power
		while (input.search(/([0-9a-zA-Z\.]+)\^\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/([0-9a-zA-Z\.]+)\^\{(((?![\{\}]).)*)\}/g, "pow($1,$2)");
		}
		//second case: single number without curly bracket
		while (input.search(/([0-9a-zA-Z\.]+)\^([0-9a-zA-Z\.]+)/) >= 0) {
			
			input = input.replace(/([0-9a-zA-Z\.]+)\^([0-9a-zA-Z\.]+)/g, "pow($1,$2)");
		}

		//third case: bracket number without curly bracket power
		while (input.search(/\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^([0-9a-zA-Z\.]+)/) >= 0) {
			
			input = input.replace(/\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^([0-9a-zA-Z\.]+)/g, "pow($1,$2)");
		}

		//forth case: bracket number with curly bracket power
		while (input.search(/\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/\\left\(([0-9a-zA-Z\.\+\*\-\\]+)\\right\)\^\{(((?![\{\}]).)*)\}/g, "pow($1,$2)");
		}
		
		//fifth case: bracket number with some brackets and division sign, with curly bracket power
		while (input.search(/\\left\(([0-9a-zA-Z\.\+\*\-\\\(\)\/]+)\\right\)\^\{(((?![\{\}]).)*)\}/) >= 0) {
			
			input = input.replace(/\\left\(([0-9a-zA-Z\.\+\*\-\\\(\)\/]+)\\right\)\^\{(((?![\{\}]).)*)\}/g, "pow($1,$2)");
		}

		if (input.search(/\^/) >= 0) {
			input = convert_others("nth power", input);
		}
		return input;
	};

	sin = function(input) {

		return sinCosTanFramework("sin", input);
	};

	tan = function(input) {
		return sinCosTanFramework("tan", input);
	};

	cos = function(input) {
		return sinCosTanFramework("cos", input);
	};

	sinCosTanFramework = function(func, input) {
		var pat1 = new RegExp("\\\\" + func + "\\\\left\\(([0-9a-zA-Z\\.\\+\\*\\-\\\\\\(\\)\\/]+)\\\\right\\)");
		//eg: /\\sin\\left\(([0-9a-zA-Z\.\+\*\-\\\(\)\/]+)\\right\)/

		while (input.search(pat1) >= 0) {
			
			input = input.replace(pat1, func + "($1)");
		}
		var pat2 = new RegExp("\\\\" + func + "([0-9a-zA-Z]+)");
		//eg:  /\\sin([0-9a-zA-Z]+)/:
		
		while (input.search(pat2) >= 0) {
			
			input = input.replace(pat2, func + "($1)");
		}

		var pat3 = new RegExp("\\\\" + func);
		//eg:  /\\sin/
		if (input.search(pat3) >= 0) {
			input = convert_others(func, input);
		}

		return input;
	};

	convert_others = function(func, input) {
		var temp_input, arr, closest_pos, func_pos, frac_pos, sqrt_pos, root_pos, pow_pos;
		switch(func) {
			case "fraction":
				temp_input = input.match(/\\frac.*/)[0];
				func_pos = temp_input.search(/\\frac/);
				break;
			case "square root":
				temp_input = input.match(/\\sqrt\{.*/)[0];
				func_pos = temp_input.search(/\\sqrt\{/);
				break;
			case "nth root":
				temp_input = input.match(/\\sqrt\[.*/)[0];
				func_pos = temp_input.search(/\\sqrt\[/);
				break;
			case "nth power":
				temp_input = input.match(/\^.*/)[0];
				func_pos = temp_input.search(/\^/);
				break;
			case "sin":
				temp_input = input.match(/\\sin\{.*/)[0];
				func_pos = temp_input.search(/\\sin\{/);
				break;
			case "tan":
				temp_input = input.match(/\\tan\{.*/)[0];
				func_pos = temp_input.search(/\\tan\{/);
				break;
			case "cos":
				temp_input = input.match(/\\cos\{.*/)[0];
				func_pos = temp_input.search(/\\cos\{/);
				break;
			default:
				return;
		}
		frac_pos = temp_input.search(/\\frac/);
		sqrt_pos = temp_input.search(/\\sqrt\{/);
		root_pos = temp_input.search(/\\sqrt\[/);
		pow_pos = temp_input.search(/\^/);
		sin_pos = temp_input.search(/\\sin\{/);
		tan_pos = temp_input.search(/\\tan\{/);
		cos_pos = temp_input.search(/\\cos\{/);

		arr = [frac_pos, root_pos, sqrt_pos, pow_pos, sin_pos, tan_pos, cos_pos];
		arr.sort(function(a, b) {
			return b - a;
		});
		//desc order

		

		closest_pos = arr[arr.indexOf(0)-1];
		
		

		if (closest_pos <= 0 || closest_pos===undefined) {
			
			
			throw ("syntax error");
		}

		switch(closest_pos) {
			case frac_pos:
				input = fraction(input);
				break;
			case sqrt_pos:
				input = square_root(input);
				break;
			case root_pos:
				input = nth_root(input);
				break;
			case pow_pos:
				input = nth_power(input);
				break;
			case sin_pos:
				input = sin(input);
				break;
			case tan_pos:
				input = tan(input);
				break;
			case cos_pos:
				input = cos(input);
				break;
			default:
				
		}

		switch(func) {
			case "fraction":
				input = fraction(input);
				break;
			case "square root":
				input = square_root(input);
				break;
			case "nth root":
				input = nth_root(input);
				break;
			case "nth power":
				input = nth_power(input);
				break;
			case "sin":
				input = sin(input);
				break;
			case "tan":
				input = tan(input);
				break;
			case "cos":
				input = cos(input);
				break;
		}

		return input;
	};
	try{
		return init();
	}catch(e){
		return null;
	}
	
};

evaluateExpression = (req) => {
    // Get the expression string from the query
    const expressionQuery = decodeURIComponent(req.query.expression);
    // Only continue if an expression has been supplied
    if (!expressionQuery) {
        return ({
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
        return ({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Initialize the necessary variables
    let node, simplifiedNode, code, result;
    try {
        // Parse the expression into a node tree
        node = math.parse(expression);
        // Parse the simplified expression into a node tree
        simplifiedNode = math.simplify(expression);
    } catch(e) {
        // If the expression can't be parsed, respond accordingly
        return ({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Compile the node tree
    code = node.compile();
    try {
        // Get the result, given the scope supplied
        result = code.evaluate(scope);
        console.log(result);
        if (typeof result === 'object') {
            result = result.toString();
        }
    } catch(e) {
        // If the result can't be obtained, respond accordingly
        return ({
            valid: true,
            error: 'Evaluation Error: ' + e.message,
            input: {
                expression: expressionQuery,
                scope: scope
            },
            parsed: {
                string: node.toString(),
                tex: node.toTex()
            },
            simplified: {
                string: simplifiedNode.toString(),
                tex: simplifiedNode.toTex()
            }
        });
    }
    // Respond with the necessary information
    return ({
        valid: true,
        error: '',
        input: {
            expression: expressionQuery,
            scope: scope
        },
        parsed: {
            string: node.toString(),
            tex: node.toTex()
        },
        simplified: {
            string: simplifiedNode.toString(),
            tex: simplifiedNode.toTex()
        },
        result: result
    });
};

simplifyExpression = (req) => {
    // Get the expression string from the query
    const expressionQuery = decodeURIComponent(req.query.expression);
    // Only continue if an expression has been supplied
    if (!expressionQuery) {
        return ({
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
        return ({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Initialize the necessary variables
    let node, simplifiedNode;
    try {
        // Parse the expression into a node tree
        node = math.parse(expression);
        // Parse the simplified expression into a node tree
        simplifiedNode = math.simplify(expression);
    } catch(e) {
        // If the expression can't be parsed, respond accordingly
        return ({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Respond with the necessary information
    return ({
        valid: true,
        error: '',
        input: {
            expression: expressionQuery,
            scope: scope
        },
        parsed: {
            string: node.toString(),
            tex: node.toTex()
        },
        simplified: {
            string: simplifiedNode.toString(),
            tex: simplifiedNode.toTex()
        }
    });
};

parseExpression = (req) => {
    // Get the expression string from the query
    const expressionQuery = decodeURIComponent(req.query.expression);
    // Only continue if an expression has been supplied
    if (!expressionQuery) {
        return ({
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
        return ({
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
        return ({
            valid: false,
            error: 'Parsing Error: Invalid expression',
            input: {
                expression: expressionQuery,
                scope: scope
            }
        });
    }
    // Respond with the necessary information
    return ({
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
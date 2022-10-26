class Board {
    constructor(state) {
        this.state = state;
    }
    isEmpty() {
        return this.state.reduce((acc, square) => acc && square === '-', true);
    }
    isFull() {
        return this.state.reduce((acc, square) => acc && square !== '-', true);
    }
    insert(piece, index) {
        if (this.state[index] === '-') {
            this.state[index] = piece;
        }
    }
    getAvailableMoves() {
        // Return all available indices on the board
        const availableMoves = [];
        this.state.forEach((square, index) => {
            if (square === '-') availableMoves.push(index);
        });
        return availableMoves;
    }
    isTerminal() {
        // If the board is empty, it is not terminal
        if (this.isEmpty()) return false;
        // Loop through each possible win combination
        const winCombos = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
        for (let i = 0; i < winCombos.length; i++) {
            // Check to see if x satisfies the current win condition
            const xWin = winCombos[i].reduce((acc, ind) => acc && this.state[ind] === 'x', true);
            // If so, return 'x' and the combination that won
            if (xWin) return { winner: 'x', squares: winCombos[i] };
            // Check to see if o satisfies the current win condition
            const oWin = winCombos[i].reduce((acc, ind) => acc && this.state[ind] === 'o', true);
            // If so, return 'o' and the combination that won
            if (oWin) return { winner: 'o', squares: winCombos[i] };
        }
        // If the board is full and no winner is found, the game ends in a draw
        if (this.isFull()) return { winner: 'draw' };
        // Otherwise, the board is not terminal
        return false;
    }
}

class Player {
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.scoreMap = new Map();
    }
    getBestMove(board, maximizing = true, depth = 0) {
        if (depth === 0) this.scoreMap.clear();
        // Check to see if the game has finished
        const gameFinished = board.isTerminal();
        if (gameFinished || depth === this.maxDepth) {
            // If the winner is the maximizing player, return 100 - depth (prioritize faster wins)
            if (gameFinished.winner === 'x') return 100 - depth;
            // If the winner is the minimizing player, return -100 + depth (prioritize faster wins)
            else if (gameFinished.winner === 'o') return -100 + depth;
            // Otherwise, return 0
            else return 0;
        }
        // Set best score to the minimum maximizing move score or the maximum minimizing move score
        let best = maximizing ? -100 : 100;
        // Search each available move given the current board state
        board.getAvailableMoves().forEach(index => {
            // Create a new board object
            const child = new Board([...board.state]);
            // Make the current move
            child.insert(maximizing ? 'x' : 'o', index);
            // Recursive call to get the best score of this move's game tree
            const nodeValue = this.getBestMove(child, !maximizing, depth + 1);
            // If the score is better than the current best score, update best
            best = maximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);
            // If depth is 0 (i.e. our base call), set the node map for the score of this move
            if (depth === 0) {
                // If other moves already have this score, add the current move to the existing move array
                const moves = [...this.scoreMap.get(nodeValue) || [], index];
                this.scoreMap.set(nodeValue, moves);
            }
        });
        // If depth is 0 (i.e. our base call) return the best move
        if (depth === 0) {
            return this.scoreMap.get(best);
        // Otherwise, return the move that had the best score this round
        } else {
            return best;
        }
    }
}

const getClassification = (score, rank) => {
    // If the move was the best, and the score is more than 0, it is "BEST"
    if (rank === 0 && score > 0) {
        return 2;
    // If the move was the best, but the score is 0 or less, it is "GOOD"
    } else if (rank === 0 && score <= 0) {
        return 0;
    // If the move was second best, and the score is more than 0, it is "EXCELLENT"
    } else if (rank === 1 && score > 0) {
        return 1;
    // If the move was not the best, and the score is more than 0, it is "GOOD"
    } else if (rank !== 0 && score > 0) {
        return 0;
    // If the move was not the best, and the score is 0, it is an "INACCURACY"
    } else if (rank !== 0 && score === 0) {
        return -1;
    // Otherwise, it was a "MISTAKE"
    } else {
        return -2;
    }
}

const getPosition = (score, piece, playerPiece) => {
    // Evaluate the board position relative to the human player (min 0, max 1)
    // We start with an even position
    let position = 0.5;
    // Move scores range from -0.99 to 0.99, so halve the score
    const lastMove = score * 0.5 || 0;
    // If the piece that generated the score is NOT the human player's piece, invert the score
    const normalize = piece === playerPiece ? 1 : -1;
    // Add the score to the even position to get the final board position
    position += lastMove * normalize;
    return position
}

export const checkForWinner = (state) => {
    const board = new Board(state.split(''));
    return board.isTerminal();
}

export const rateMove = (state, piece, move, playerPiece) => {
    // Create a new board using the state
    const board = new Board(state.split(''));
    // Normalize the move score depending on the piece
    const normalize = piece === 'x' ? 1 : -1;
    // Create a new Player
    const player = new Player(-1);
    // Get the best move. This creates the node map that scores every possible move
    const best = player.getBestMove(board, piece === 'x');
    // Convert the node map to an array of { score, moves } objects
    const moveMap = Array.from(player.scoreMap);
    const moves = moveMap.map(entry => ({ score: Number(entry[0]) * normalize, moves: entry[1] })).sort((a, b) => b.score - a.score);
    // Find the score for the move in question, then categorize it
    for (let i = 0; i < moves.length; i++) {
        if (moves[i].moves.includes(move)) {
            // Scores range from -0.99 to 0.99
            const score = moves[i].score / 100;
            return { 
                // The score given by the engine
                score: score, 
                // The board position relative to the human player (0 min, 1 max)
                position: getPosition(score, piece, playerPiece),
                // The move "type", i.e. whether it was "BEST", "GOOD", "INACCURACY", "MISTAKE", etc.
                classification: getClassification(score, i),
                // The best move. If our move is one of several best moves, make sure we return ours
                best: i === 0 ? move : best[Math.floor(Math.random() * best.length)] 
            };
        }
    }
}

export const getMoves = (state, playerObject) => {
    // Create a new board using the state
    const board = new Board(state.split(''));
    // Determine the engine depth based on difficulty
    let maxDepth = -1;
    if (playerObject.difficulty < 3) {
        // 1 for Beginner (0), 3 for Intermediate (1), 5 for Advanced (2), and -1 for Expert (3)
        maxDepth = playerObject.difficulty * 2 + 1;
    }
    // Create a new Player with the proper max depth
    const player = new Player(maxDepth);
    // Get the best move
    return player.getBestMove(board, playerObject.pieces === 'x');
}
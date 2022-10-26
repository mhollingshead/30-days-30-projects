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
        const availableMoves = [];
        this.state.forEach((square, index) => {
            if (square === '-') availableMoves.push(index);
        });
        return availableMoves;
    }
    isTerminal() {
        if (this.isEmpty()) return false;
        const winCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [6, 4, 2]
        ];
        for (let i = 0; i < winCombos.length; i++) {
            const xWin = winCombos[i].reduce((acc, ind) => acc && this.state[ind] === 'x', true);
            if (xWin) return { winner: 'x', squares: winCombos[i] };
            const oWin = winCombos[i].reduce((acc, ind) => acc && this.state[ind] === 'o', true);
            if (oWin) return { winner: 'o', squares: winCombos[i] };
        }
        if (this.isFull()) return { winner: 'draw' };
        return false;
    }
}

class Player {
    constructor(maxDepth = -1) {
        this.maxDepth = maxDepth;
        this.nodesMap = new Map();
    }
    getBestMove(board, maximizing = true, depth = 0) {
        if (depth === 0) this.nodesMap.clear();

        const gameFinished = board.isTerminal();
        if (gameFinished || depth === this.maxDepth) {
            if (gameFinished.winner === 'x') return 100 - depth;
            else if (gameFinished.winner === 'o') return -100 + depth;
            else return 0;
        }

        let best = maximizing ? -100 : 100;

        board.getAvailableMoves().forEach(index => {
            const child = new Board([...board.state]);

            child.insert(maximizing ? 'x' : 'o', index);

            const nodeValue = this.getBestMove(child, !maximizing, depth + 1);

            best = maximizing ? Math.max(best, nodeValue) : Math.min(best, nodeValue);

            if (depth === 0) {
                const moves = [...this.nodesMap.get(nodeValue) || [], index];
                this.nodesMap.set(nodeValue, moves);
            }
        });

        if (depth === 0) {
            return this.nodesMap.get(best);
        } else {
            return best;
        }
    }
}

export const checkForWinner = (state) => {
    const board = new Board(state.split(''));
    return board.isTerminal();
}

export const rateMove = (state, piece, move) => {
    // Create a new board using the state
    const board = new Board(state.split(''));
    // Normalize the move score depending on the piece
    const normalize = piece === 'x' ? 1 : -1;
    // Create a new Player
    const player = new Player(-1);
    player.getBestMove(board, piece === 'x');
    const moveMap = Array.from(player.nodesMap);
    const moves = moveMap.map(entry => ({ score: Number(entry[0]) * normalize, moves: entry[1] }));
    for (let i = 0; i < moves.length; i++) {
        if (moves[i].moves.includes(move)) return moves[i].score / 100;
    }
}

export const getMoves = (state, playerObject) => {
    // Create a new board using the state
    const board = new Board(state.split(''));
    // Normalize the move score depending on the piece
    const normalize = playerObject.pieces === 'x' ? 1 : -1;
    // Determine the engine depth based on difficulty
    let maxDepth = -1;
    if (typeof playerObject.difficulty === 'number') {
        const difficulty = playerObject.difficulty;
        if (difficulty === 0) maxDepth = 1;
        if (difficulty === 1) maxDepth = 3;
        if (difficulty === 2) maxDepth = 5;
    }
    // Create a new Player
    const player = new Player(maxDepth);
    // Fill the move list by getting the best move
    player.getBestMove(board, playerObject.pieces === 'x');
    const moveMap = Array.from(player.nodesMap);
    const moves = moveMap.map(entry => ({ score: Number(entry[0]) * normalize, moves: entry[1] }));
    return moves;
}
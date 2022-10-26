import { useEffect, useState } from 'react';
import { playGameEndSFX, playGameStartSFX, playPlacePieceSFX } from '../../common/sfx';
import { checkForWinner, getMoves, rateMove } from '../../engine/engine';
import BoardLayout from '../BoardLayout';
import Evaluation from '../Evaluation';
import Sidebar from '../Sidebar';
import './Game.scss';

export default function Game() {
    const [gameState, setGameState] = useState('setup');
    const [boardState, setBoardState] = useState(null);
    const [history, setHistory] = useState([]);
    const [player, setPlayer] = useState({ pieces: 'x' });
    const [computer, setComputer] = useState({ pieces: 'o', difficulty: 1 });
    const [toMove, setToMove] = useState(null);
    const [lastMove, setLastMove] = useState(null);
    const [hints, setHints] = useState(null);
    const [winner, setWinner] = useState(null);

    const newGame = () => {
        setGameState('setup');
        setBoardState('---------');
        setHistory([]);
        setToMove(null);
        setLastMove(null);
        setHints(null);
        setWinner(null);
    }

    const chooseDifficulty = difficulty => {
        setComputer({ ...computer, difficulty: difficulty })
    }

    const choosePieces = pieces => {
        setPlayer({ pieces: pieces });
        setComputer({ ...computer, pieces: pieces === 'x' ? 'o' : 'x' });
    }

    const startGame = () => {
        playGameStartSFX();
        setGameState('play');
    }

    const getHint = () => {
        if (gameState !== 'play' || toMove !== player.pieces) return;
        setHints(getMoves(boardState, player));
    }

    const makeMove = (piece, square) => {
        if (gameState !== 'play') return;
        const board = boardState.split('');
        const old = `${boardState}`;
        if (toMove === piece && board[square] === '-') {
            playPlacePieceSFX();
            board[square] = piece;
            setBoardState(board.join(''));
            setLastMove(square);
            setHistory([...history, { 
                piece: piece, 
                square: square, 
                board: old, 
                rating: rateMove(old, piece, square, player.pieces) 
            }]);
        }
    }

    const makePlayerMove = square => {
        setHints(null);
        makeMove(player.pieces, square);
    }

    const makeComputerMove = () => {
        const moves = getMoves(boardState, computer);
        const square = moves[Math.floor(Math.random() * moves.length)];
        setTimeout(() => {
            makeMove(computer.pieces, square);
        }, 1000);
    }

    useEffect(() => {
        if (!boardState) return;
        const winner = checkForWinner(boardState);
        if (winner) {
            playGameEndSFX();
            setLastMove(null);
            setWinner(winner);
            setGameState('finished');
        } else {
            setToMove(toMove === 'x' ? 'o' : 'x');
        }
    }, [boardState]);

    useEffect(() => {
        if (toMove === computer.pieces && gameState === 'play') {
            makeComputerMove();
        }
    }, [toMove, gameState]);

    useEffect(newGame, []);

    return (
        <main className='Game'>
            <Evaluation 
                history={history} 
                winner={winner}
                player={player} 
            />
            <BoardLayout 
                boardState={boardState} 
                makePlayerMove={makePlayerMove} 
                lastMove={lastMove}
                hints={hints}
                computer={computer} 
                player={player}
                winner={winner}
            />
            <Sidebar 
                gameState={gameState} 
                computer={computer} 
                chooseDifficulty={chooseDifficulty} 
                choosePieces={choosePieces} 
                startGame={startGame}
                history={history}
                getHint={getHint}
                newGame={newGame}
            />
        </main>
    );
}
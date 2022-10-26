import { useEffect, useState } from 'react';
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
    const [winner, setWinner] = useState(null);

    const newGame = () => {
        setGameState('setup');
        setBoardState('---------');
        setHistory([]);
        setToMove(null);
        setLastMove(null);
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
        setGameState('play');
    }

    const makeMove = (piece, square) => {
        if (gameState !== 'play') return;
        const board = boardState.split('');
        const old = `${boardState}`;
        if (toMove === piece && board[square] === '-') {
            board[square] = piece;
            setBoardState(board.join(''));
            setLastMove(square);
            setTimeout(() => setHistory([...history, { 
                piece: piece, 
                square: square, 
                board: old, 
                rating: rateMove(old, piece, square) 
            }]), 0);
        }
    }

    const makePlayerMove = square => {
        makeMove(player.pieces, square);
    }

    const makeComputerMove = () => {
        const moves = getMoves(boardState, computer).sort((a, b) => b.score - a.score);
        const square = moves[0].moves[Math.floor(Math.random() * moves[0].moves.length)];
        console.log(moves);
        setTimeout(() => {
            makeMove(computer.pieces, square);
        }, 1000);
    }

    useEffect(newGame, []);

    useEffect(() => {
        if (!boardState) return;
        const winner = checkForWinner(boardState);
        if (winner) {
            setLastMove(null);
            setWinner(winner);
        } else {
            setToMove(toMove === 'x' ? 'o' : 'x');
        }
    }, [boardState]);

    useEffect(() => {
        if (toMove === computer.pieces && gameState === 'play') {
            makeComputerMove();
        }
    }, [toMove, gameState]);

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
                newGame={newGame}
            />
        </main>
    );
}
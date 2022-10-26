import './Evaluation.scss';

export default function Evaluation({ history, winner, player }) {
    let height = 0.5;
    let score = '0.5';
    if (winner) {
        if (winner.winner === 'draw') {
            height = 0.5;
            score = '0.5';
        }
        else if (winner.winner === player.pieces) {
            height = 1;
            score = '1-0';
        }
        else {
            height = 0;
            score = '0-1'
        }
    } else if (history.length > 0) {
        const lastMove = history[history.length - 1].rating;
        height = lastMove.position;
        const movesUntilWin = 99 - Math.abs(lastMove.score * 100);
        if (movesUntilWin < 9) score = 'W' + movesUntilWin;
    }

    return (
        <section className='Evaluation'>
            <div className='Evaluation__bar' style={{height: `${height * 100}%`}}></div>
            { height < 0.5 && <div className='Evaluation__score Evaluation__score--black'>{score}</div> }
            { height >= 0.5 && <div className='Evaluation__score Evaluation__score--white'>{score}</div> }
        </section>
    );
}
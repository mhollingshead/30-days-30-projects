import './Evaluation.scss';

export default function Evaluation({ history, winner, player }) {
    let height = 0.5;
    if (winner) {
        if (winner.winner === 'draw') height = 0.5;
        else if (winner.winner === player.pieces) height = 1;
        else height = 0;
    } else if (history.length > 0) {
        const lastMove = history[history.length -1].rating * 0.5 || 0;
        const normalize = history[history.length-1].piece === player.pieces ? 1 : -1;
        height += lastMove * normalize;
    }

    return (
        <section className='Evaluation'>
            <div className='Evaluation__bar' style={{height: `${height * 100}%`}}></div>
        </section>
    );
}
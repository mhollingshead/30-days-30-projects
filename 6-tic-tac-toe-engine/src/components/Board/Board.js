import './Board.scss';
import x from '../../assets/svg/x.svg';
import o from '../../assets/svg/o.svg';

export default function Board({ boardState, makePlayerMove, lastMove, winner }) {
    return (
        <div className='Board'>
            {boardState && boardState.split('').map((square, i) => (
                <div 
                    className={`Board__square ${lastMove === i ? 'Board__square--last-move' : ''} ${winner?.squares?.includes(i) ? 'Board__square--winning-move' : ''}`} 
                    onClick={() => makePlayerMove(i)}
                    key={i}
                >
                    {square === 'x' && <img className='Board__piece' src={x} />}
                    {square === 'o' && <img className='Board__piece' src={o} />}
                </div>
            ))}
            <div className='Coordinates'>
                <div className='Coordinates__y'>
                    <div><span>1</span></div>
                    <div><span>2</span></div>
                    <div><span>3</span></div>
                </div>
                <div className='Coordinates__x'>
                    <div>a</div>
                    <div>b</div>
                    <div>c</div>
                </div>
            </div>
        </div>
    );
}
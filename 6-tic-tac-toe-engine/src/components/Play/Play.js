import { computerNames, squareMap } from '../../common/constants';
import './Play.scss';

export default function Play({ history, computer, newGame }) {
    return (
        <div className='Play'>
            <div className='Play__head'>
                <h2 className='Play__title'>
                    {computer.pieces === 'x' ? `${computerNames[computer.difficulty]} vs Me` : `Me vs ${computerNames[computer.difficulty]}`}
                </h2>
            </div>
            <div className='Play__body'>
                <ol className='Play__moves'>
                    { history.map((move, i) => (
                        <li className='Play__move' key={'move'+i}>
                            <div className='Play__move-info'>
                                <b className='Play__move-number'>{i+1}.</b>
                                <span className='Play__move-code'><b>{move.piece.toUpperCase()}</b>{squareMap[move.square]}</span>
                                <div className={`Play__rating Play__rating--${move.piece}`}>{move.rating.toFixed(2)}</div>
                            </div>
                        </li>
                    )) }
                </ol>
            </div>
            <div className='Play__foot'>
                <button className='Play__button Play__button--primary' onClick={newGame}>New Game</button>
            </div>
        </div>
    );
}
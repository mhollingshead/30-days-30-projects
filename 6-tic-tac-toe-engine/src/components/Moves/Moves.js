import { squareMap } from '../../common/constants';
import best from '../../assets/svg/best-move.svg';
import excellent from '../../assets/svg/excellent-move.svg';
import good from '../../assets/svg/good-move.svg';
import inaccuracy from '../../assets/svg/inaccuracy.svg';
import mistake from '../../assets/svg/mistake.svg';
import './Moves.scss';

const classifications = { 
    '2': best, 
    '1': excellent, 
    '0': good, 
    '-1': inaccuracy, 
    '-2': mistake 
};

export default function Moves({ history }) {
    return (
        <ol className='Moves'>
            {history.map((move, i) => (
                <li className='Moves__move' key={'move' + i}>
                    <div className='Moves__move-info'>
                        <b className='Moves__move-number'>{i + 1}.</b>
                        <span className='Moves__move-code'>
                            <b>{move.piece.toUpperCase()}</b>
                            {squareMap[move.square]}
                        </span>
                    </div>
                    <div className={`Moves__rating Moves__rating--${move.piece}`}>
                        {move.rating.score.toFixed(2)}
                    </div>
                    <div className='Moves__analysis'>
                        <img className='Moves__classification' src={classifications[move.rating.classification]} />
                        {move.rating.classification < 0 && <div className='Moves__best-move'>
                            <span className='Moves__move-code'>{squareMap[move.rating.best]}</span>
                            <span>is best</span>
                        </div>}
                    </div>
                </li>
            ))}
        </ol>
    );
}
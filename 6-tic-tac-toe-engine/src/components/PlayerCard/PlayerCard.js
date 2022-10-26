import './PlayerCard.scss';
import x from '../../assets/svg/x.svg';
import o from '../../assets/svg/o.svg';

export default function PlayerCard({ player, name }) {
    return (
        <div className='PlayerCard'>
            <img 
                src={player.pieces === 'x' ? x : o} 
                className={`PlayerCard__avatar ${typeof player.difficulty === 'number' && 'PlayerCard__avatar--d' + player.difficulty}`} 
            />
            <span className='PlayerCard__name'>{name}</span>
        </div>
    );
}
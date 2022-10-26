import { computerNames } from '../../common/constants';
import Board from '../Board';
import PlayerCard from '../PlayerCard';
import './BoardLayout.scss';

export default function BoardLayout({ boardState, makePlayerMove, lastMove, computer, player, winner }) {
    return (
        <section className='BoardLayout'>
            {computer && <PlayerCard player={computer} name={computerNames[computer.difficulty]} />}
            <Board boardState={boardState} makePlayerMove={makePlayerMove} lastMove={lastMove} winner={winner} />
            {player && <PlayerCard player={player} name="Me" />}
        </section>
    );
}
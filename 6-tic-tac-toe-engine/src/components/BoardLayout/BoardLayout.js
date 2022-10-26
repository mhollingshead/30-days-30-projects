import { computerNames } from '../../common/constants';
import Board from '../Board';
import PlayerCard from '../PlayerCard';
import './BoardLayout.scss';

export default function BoardLayout({ boardState, makePlayerMove, lastMove, hints, computer, player, winner }) {
    return (
        <section className='BoardLayout'>
            <PlayerCard player={computer} name={computerNames[computer.difficulty]} />
            <Board boardState={boardState} makePlayerMove={makePlayerMove} lastMove={lastMove} hints={hints} winner={winner} />
            <PlayerCard player={player} name="Me" />
        </section>
    );
}
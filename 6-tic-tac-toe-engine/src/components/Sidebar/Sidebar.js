import Play from '../Play';
import Setup from '../Setup';
import './Sidebar.scss';

export default function Sidebar({ gameState, computer, chooseDifficulty, choosePieces, startGame, history, newGame, getHint }) {
    return (
        <aside className='Sidebar'>
            { gameState === 'setup' && <Setup computer={computer} chooseDifficulty={chooseDifficulty} choosePieces={choosePieces} startGame={startGame} /> }
            { gameState !== 'setup' &&  <Play history={history} computer={computer} newGame={newGame} getHint={getHint} />}
        </aside>
    );
}
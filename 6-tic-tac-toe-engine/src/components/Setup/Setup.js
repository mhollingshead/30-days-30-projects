import { useEffect, useState } from 'react';
import { computerNames } from '../../common/constants';
import x from '../../assets/svg/x.svg';
import o from '../../assets/svg/o.svg';
import './Setup.scss';

export default function Setup({ computer, chooseDifficulty, choosePieces, startGame }) {
    const [difficulty, setDifficulty] = useState(computer.difficulty);
    const [pieces, setPieces] = useState(computer.pieces === 'x' ? 'o' : 'x');

    const handleDifficultyChange = e => {
        setDifficulty(Number(e.target.value));
    }

    useEffect(() => chooseDifficulty(difficulty), [difficulty]);

    const handlePiecesChange = e => {
        setPieces(e.target.id);
    }

    useEffect(() => choosePieces(pieces), [pieces]);

    return (
        <div className='Setup'>
            <div className='Setup__head'>
                <h2 className='Setup__title'>Game Setup</h2>
            </div>
            <div className='Setup__body'>
                <div className='Setup__option'>
                    <label className='Setup__label'>Engine Difficulty</label>
                    <input className='Setup__slider' type='range' value={difficulty} min={0} max={3} onInput={handleDifficultyChange} />
                    <div className='Setup__difficulty'>{computerNames[computer.difficulty]}</div>
                </div>
                <div className='Setup__option'>
                    <label className='Setup__label'>I Play As</label>
                    <div className='Setup__pieces'>
                        <img className={`Setup__piece Setup__piece--x ${pieces === 'x' && 'Setup__piece--active'}`} src={x} id='x' onClick={handlePiecesChange} />
                        <img className={`Setup__piece Setup__piece--o ${pieces === 'o' && 'Setup__piece--active'}`} src={o} id='o' onClick={handlePiecesChange} />
                    </div>
                </div>
            </div>
            <div className='Setup__foot'>
                <button className='Setup__button' onClick={startGame}>Start Game</button>
            </div>
        </div>
    );
}
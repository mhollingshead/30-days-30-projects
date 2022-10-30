import './Guess.scss';

export default function Guess({ guess, isCurrent, makeGuess, statsVisible, gameOver }) {
    const handleInput = e => {
        const input = e.target;
        if (input.value.length > 3) {
            input.value = input.value.slice(0, 3);
        }
    }

    const handleKeyDown = e => {
        if (
            e.target.value === '' && 
            e.target.previousSibling &&
            (e.key === 'Backspace' || e.key === 'Delete')
        ) {
            e.target.previousSibling.focus();
        }
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if (e.target.r.value && e.target.g.value && e.target.b.value) {
            makeGuess(e.target.r.value, e.target.g.value, e.target.b.value);
        }
    }

    document.querySelector('form input')?.focus();

    return (
        <>{
            isCurrent
            ? (<form className='Guess' onSubmit={handleFormSubmit}>
                <input 
                    className='Guess__tile' 
                    id='r' 
                    type='number' 
                    min='0' 
                    max='255' 
                    step='1' 
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={statsVisible || gameOver}
                />
                <input 
                    className='Guess__tile' 
                    id='g' 
                    type='number' 
                    min='0' 
                    max='255' 
                    step='1' 
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={statsVisible || gameOver}
                />
                <input 
                    className='Guess__tile' 
                    id='b' 
                    type='number' 
                    min='0' 
                    max='255' 
                    step='1' 
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                    disabled={statsVisible || gameOver}
                />
                <button className='Guess__button'></button>
            </form>)
            : (<div className='Guess'>
                <div className={`Guess__tile ${guess[0]?.color ? 'Guess__tile--' + guess[0].color : ''}`}>
                    {guess[0]?.value || ''}
                </div>
                <div className={`Guess__tile ${guess[1]?.color ? 'Guess__tile--' + guess[1].color : ''}`}>
                    {guess[1]?.value || ''}
                </div>
                <div className={`Guess__tile ${guess[2]?.color ? 'Guess__tile--' + guess[2].color : ''}`}>
                    {guess[2]?.value || ''}
                </div>
            </div>)
        }</>
    );
}
import Guess from '../Guess/Guess';
import './Guesses.scss';

export default function Guesses({ guesses, guessNumber, makeGuess, statsVisible, gameOver }) {
    return (
        <section className='Guesses'>
            <div className='Guesses__head'>
                <div className='Guesses__label'>R</div>
                <div className='Guesses__label'>G</div>
                <div className='Guesses__label'>B</div>
            </div>
            {guesses.map((guess, i) => (
                <Guess 
                    key={`g${i}`}
                    guess={ guess }
                    isCurrent={i===guessNumber}
                    makeGuess={makeGuess}
                    statsVisible={statsVisible}
                    gameOver={gameOver}
                />
            ))}
        </section>
    );
}
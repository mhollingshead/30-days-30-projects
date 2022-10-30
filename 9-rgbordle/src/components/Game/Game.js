import { useState, useEffect } from 'react';
import Color from '../Color';
import Guesses from '../Guesses/Guesses';
import Header from '../Header';
import Stats from '../Stats';
import './Game.scss';

const defaultStats = {
    games: 0,
    wins: 0,
    streak: 0,
    maxStreak: 0,
    guessDistribution: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
}

export default function Game() {
    const [color, setColor] = useState(null);
    const [guesses, setGuesses] = useState([...Array(6)].map(() => Array(3)));
    const [correct, setCorrect] = useState(0);
    const [guessNumber, setGuessNumber] = useState(0);
    const [lightTheme, setLightTheme] = useState(JSON.parse(localStorage.getItem('rgb-lightTheme')) || false);
    const [stats, setStats] = useState(JSON.parse(localStorage.getItem('rgb-stats')) || defaultStats);
    const [statsVisible, setStatsVisible] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    const endGame = (won, totalGuesses) => {
        const games = stats.games + 1;
        const wins = stats.wins + !!won;
        const streak = won ? stats.streak + 1 : 0;
        const maxStreak = Math.max(streak, stats.maxStreak);
        const guessDistribution = stats.guessDistribution;
        if (won) guessDistribution[totalGuesses]++;
        setStats({ games, wins, streak, maxStreak, guessDistribution });
        setGameOver(true);
        setTimeout(() => setStatsVisible(true), 2000);
    }

    const makeGuess = (r, g, b) => {
        if (guessNumber === 6) return;
        const guessed = guesses;

        let numCorrect = 0;

        const guess = [r, g, b].map((value, i) => {
            let tile = 'grey';

            if (value == color[i]) {
                tile = 'green';
                numCorrect++;
            } else if (Math.abs(value - color[i]) <= 25){
                tile = 'yellow';
            }

            return { value, color: tile };
        });

        guessed[guessNumber] = guess;

        if (numCorrect === 3 || guessNumber + 1 === 6) {
            endGame(numCorrect === 3, guessNumber);
        }

        setGuesses(guessed);
        setCorrect(numCorrect);
        setGuessNumber(guessNumber + 1);
    }

    const toggleTheme = () => {
        setLightTheme(!lightTheme);
    }

    const toggleStatsVisible = () => {
        setStatsVisible(!statsVisible);
    }

    useEffect(() => {
        if (guessNumber === 6 || correct === 3) setGameOver(true);
    }, [guessNumber, correct]);

    useEffect(() => {
        if (!typeof lightTheme === 'boolean') return;
        localStorage.setItem('rgb-lightTheme', JSON.stringify(lightTheme));
    }, [lightTheme]);

    useEffect(() => {
        if (!stats) return;
        localStorage.setItem('rgb-stats', JSON.stringify(stats));
    }, [stats]);

    return (
        <main className={`Game ${lightTheme ? 'light' : 'dark'}`}>
            <div className='Game__layout'>
                <Header 
                    toggleTheme={toggleTheme}
                    toggleStatsVisible={toggleStatsVisible}
                />
                <Color 
                    color={color}
                    setColor={setColor}
                    gameOver={gameOver}
                />
                <Guesses 
                    guesses={guesses}
                    guessNumber={guessNumber}
                    makeGuess={makeGuess}
                    statsVisible={statsVisible}
                    gameOver={gameOver}
                />
            </div>
            {statsVisible && <Stats 
                stats={stats} 
                correct={correct} 
                guessNumber={guessNumber} 
                toggleStatsVisible={toggleStatsVisible}
            />}
        </main>
    );
}
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
import './Stats.scss';

export default function Stats({ stats, correct, guessNumber, toggleStatsVisible }) {
    const maxGuessDistribution = Object.values(stats.guessDistribution).reduce((acc, g) => g > acc ? g : acc, 0);

    return (
        <div className='Stats'>
            <div className='Stats__modal'>
                <h3 className='Stats__title'>Statistics</h3>
                <div className='Stats__data'>
                    <div className='Stats__stat'>
                        <div className='Stats__value'>{stats.games}</div>
                        <div className='Stats__label'>Played</div>
                    </div>
                    <div className='Stats__stat'>
                        <div className='Stats__value'>{(stats.wins / (stats.games || 1) * 100).toFixed(0)}</div>
                        <div className='Stats__label'>Win %</div>
                    </div>
                    <div className='Stats__stat'>
                        <div className='Stats__value'>{stats.streak}</div>
                        <div className='Stats__label'>Current Streak</div>
                    </div>
                    <div className='Stats__stat'>
                        <div className='Stats__value'>{stats.maxStreak}</div>
                        <div className='Stats__label'>Max Streak</div>
                    </div>
                </div>
                <h3 className='Stats__title'>Guess Distribution</h3>
                <div className='Stats__graph'>
                    {Object.values(stats.guessDistribution).map((value, i) => (
                        <div className='Stats__graph-row' key={`d${i}`}>
                            <div className='Stats__graph-label'>{i + 1}</div>
                            <div className='Stats__progress-bar'>
                                <div 
                                    className={`Stats__progress ${correct === 3 && i + 1 === guessNumber ? 'Stats__progress--green' : ''}`}
                                    style={{width: `${value / (maxGuessDistribution || 1) * 100}%`}}
                                >
                                    <div className='Stats__progress-label'>
                                        {value}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='Stats__cta'>
                    <button className='Stats__button' onClick={() => window.location.reload()} autoFocus={true}>New Game</button>
                </div>
                <div className='Stats__close' onClick={toggleStatsVisible}><CloseIcon className='Stats__icon' /></div>
            </div>
        </div>
    );
}
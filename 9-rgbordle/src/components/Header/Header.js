import { ReactComponent as ThemeIcon } from '../../assets/svg/theme.svg';
import { ReactComponent as StatsIcon } from '../../assets/svg/stats.svg';
import './Header.scss';

export default function Header({ toggleTheme, toggleStatsVisible }) {
    return (
        <header className='Header'>
            <div className='Header__head'>
                <h1 className='Header__title'>RGBordle</h1>
                <div className='Header__cta'>
                    <StatsIcon className='Header__icon' onClick={toggleStatsVisible} title='Show stats' />
                    <ThemeIcon className='Header__icon' onClick={toggleTheme} title='Toggle light/dark theme' />
                </div>
            </div>
            <p className='Header__instructions'>
                Try to guess the <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgb' target='_blank'>RGB color</a> within <b>6 guesses</b>!
                All correct numbers are <b>multiples of 10</b>.
            </p>
            <p className='Header__instructions'>
                <span className='Header__green'>Green</span> tiles are <b>correct</b>,{' '}
                <span className='Header__yellow'>Yellow</span> tiles are <b>within 25</b>, and{' '}
                <span className='Header__grey'>Grey</span> tiles are <b>off</b>.{' '}
            </p>
        </header>
    );
}
import { canvasGradient, computerNames } from '../../common/constants';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Moves from '../Moves/Moves';
import lightbulb from '../../assets/svg/lightbulb.svg';
import './Play.scss';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

export default function Play({ history, computer, newGame, getHint }) {
    const dataset = [0, ...history?.map(move => move.rating.position - 0.5)];
    const data = {
        labels: dataset.map((_, i) => i),
        datasets: [
            {
                label: 's',
                data: dataset,
                borderColor: '#b1b1b0',
                fill: true,
                backgroundColor: canvasGradient,
                pointRadius: 0
            },
            {
                data: [0.5, -0.5],
                borderColor: '#00000000',
                pointRadius: 0
            }
        ]
    };
    const options = {
        maintainAspectRatio: false,
        scales: {
            y: { display: false },
            x: { display: false }
        }
    }

    return (
        <div className='Play'>
            <div className='Play__head'>
                <h2 className='Play__title'>
                    {computer.pieces === 'x' ? `${computerNames[computer.difficulty]} vs Me` : `Me vs ${computerNames[computer.difficulty]}`}
                </h2>
            </div>
            <div className='Play__graph'>
                <div className='Play__graph-wrapper'>
                    <Line data={data} options={options} height={"100%"} />
                </div>
            </div>
            <div className='Play__body'>
                <Moves history={history} />
            </div>
            <div className='Play__foot'>
                <button className='Play__button Play__button--primary' onClick={newGame}>New Game</button>
                <button className='Play__button Play__button--secondary' onClick={getHint}>
                    <img className='Play__button-icon' src={lightbulb} />
                </button>
            </div>
        </div>
    );
}
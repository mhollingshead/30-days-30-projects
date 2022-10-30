import { useEffect, useState } from 'react';
import './Color.scss';

export default function Color({ color, setColor, gameOver }) {
    const [src, setSrc] = useState(null);
    
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 26) * 10;
        const g = Math.floor(Math.random() * 26) * 10;
        const b = Math.floor(Math.random() * 26) * 10;
        return [r, g, b];
    };

    useEffect(() => {
        const randomColor = getRandomColor();
        // Create an SVG string with a the random color
        const svg = `<svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
            <rect x="0" y="0" width="80" height="80" fill="rgb(${randomColor.join(',')})" />
        </svg>`;
        // Convert the SVG string to XML, then encode in base64 so that the color is not
        // obtainable by inspecting elements
        const xmlDoc = new DOMParser().parseFromString(svg, 'application/xml');
        const serializedXml = new XMLSerializer().serializeToString(xmlDoc);
        const encodedXml = window.btoa(serializedXml);
        // Update the src in state so we can use it for our <img /> element
        setSrc('data:image/svg+xml;base64,' + encodedXml);
        // Send the random color to the game component
        setColor(randomColor);
    }, []);

    return (
        <div className='Color'>
            { src && <img className='Color__img' src={src} /> }
            { gameOver && <div className='Color__answer'>{`rgb(${color.join(', ')})`}</div> }
        </div>
    );
}
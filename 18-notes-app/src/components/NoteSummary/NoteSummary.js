import { useSelector } from 'react-redux';
import { getDateString } from '../../utils/utils';
import './NoteSummary.scss';

export default function NoteSummary({ note }) {
    const activeNote = useSelector((state) => state.notes.active);

    return (
        <div className={`NoteSummary ${note.id === activeNote?.id ? 'NoteSummary--active' : ''}`}>
            <div className='NoteSummary__head'>
                <h3 className='NoteSummary__title'>{note.title}</h3>
            </div>
            <div className='NoteSummary__body'>
                <p className='NoteSummary__date'>{getDateString(note.lastEdit)}</p>
                <p className='NoteSummary__text'>{note.text}</p>
            </div>
        </div>
    );
}
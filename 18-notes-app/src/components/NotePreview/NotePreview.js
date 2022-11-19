import { useSelector } from 'react-redux';
import { getDateString } from '../../utils/utils';
import './NotePreview.scss';

export default function NotePreview({ note }) {
    const activeNote = useSelector((state) => state.notes.active);

    return (
        <div className='NotePreview'>
            <div className={`NotePreview__wrapper ${note.id === activeNote?.id ? 'NotePreview__wrapper--active' : ''}`}>
                <div className='NotePreview__document ql-snow' dangerouslySetInnerHTML={{__html: note.html}}></div>
            </div>
            <h3 className='NotePreview__title'>{note.title}</h3>
            <p className='NotePreview__date'>{getDateString(note.lastEdit)}</p>
        </div>
    );
}
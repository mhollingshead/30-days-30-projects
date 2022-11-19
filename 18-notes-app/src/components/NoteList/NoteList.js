import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote } from '../../features/notes/notesSlice';
import NotePreview from '../NotePreview/NotePreview';
import NoteSummary from '../NoteSummary/NoteSummary';
import './NoteList.scss';

export default function NoteList({ listLayout }) {
    const notes = useSelector((state) => state.notes.all);
    const dispatch = useDispatch();

    return (
        <ol className={`NoteList NoteList--${listLayout}`}>
            {notes.map(note => (
                <li 
                    className={`NoteList__item NoteList__item--${listLayout}`} 
                    onClick={() => dispatch(setActiveNote(note.id))}
                    key={note.id}
                >
                    {listLayout === 'row' && <NoteSummary note={note}/>}
                    {listLayout === 'grid' && <NotePreview note={note}/>}
                </li>
            ))}
        </ol>
    );
}
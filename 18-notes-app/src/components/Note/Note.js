import { ReactComponent as LocalStorage } from '../../assets/icons/local-storage.svg';
import { useSelector, useDispatch } from 'react-redux';
import { updateNote } from '../../features/notes/notesSlice';
import { quillConfig } from '../../utils/constants';
import { timestamp } from '../../utils/utils';
import { useEffect, useState } from 'react';
import { useQuill } from 'react-quilljs';
import store from '../../store';
import 'quill/dist/quill.snow.css';
import './Note.scss';

let autosaveTimeout;

export default function Note() {
    const activeNote = useSelector((state) => state.notes.active);
    const dispatch = useDispatch();
    
    const { quill, quillRef } = useQuill(quillConfig);
    const [titleValue, setTitleValue] = useState(activeNote.title);
    const [saved, setSaved] = useState(false);

    const storeNotes = () => {
        const notes = store.getState().notes.all;
        localStorage.setItem('notes', JSON.stringify(notes));
        autosaveTimeout = null;
        setSaved(true);
    }

    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
        setSaved(false);
    };

    const handleTitleBlur = (e) => {
        const activeNoteState = store.getState().notes.active;
        const newTitle = e.target.value.trim() || activeNoteState.title;
        dispatch(updateNote({
            ...activeNoteState,
            lastEdit: timestamp(),
            title: newTitle
        }));
        storeNotes();
    };

    const handleContentsChange = (contents, text, html) => {
        const activeNoteState = store.getState().notes.active;
        dispatch(updateNote({
            ...activeNoteState,
            lastEdit: timestamp(),
            contents: { ...contents },
            text: text,
            html: html
        }));
        if (autosaveTimeout) clearTimeout(autosaveTimeout);
        autosaveTimeout = setTimeout(storeNotes, 1000);
        setSaved(false);
    };

    useEffect(() => {
        if (!quill) return;
        quill.setContents(activeNote.contents);
        quill.on('text-change', (_, __, source) => {
            if (source === 'user') {
                handleContentsChange(quill.getContents(), quill.getText(), quill.root.outerHTML)
            }
        });
    }, [quill]);

    useEffect(() => {
        if (!quill) return;
        quill.setContents(activeNote.contents);
        setTitleValue(activeNote.title);
        setSaved(false);
    }, [activeNote.id]);

    return (
        <section className='Note'>
            <div className='Note__meta'>
                <input 
                    className='Note__title' 
                    value={ titleValue } 
                    onChange={ handleTitleChange } 
                    onBlur={ handleTitleBlur } 
                />
                <div className='Note__date'>
                    <p>{ new Date(activeNote.lastEdit).toLocaleString() }</p>
                    {saved && <p className='Note__saved'>
                        <LocalStorage /> Saved
                    </p>}
                </div>
            </div>
            <div className='Note__editor'>
                <div ref={ quillRef }></div>
            </div>
        </section>
    );
}
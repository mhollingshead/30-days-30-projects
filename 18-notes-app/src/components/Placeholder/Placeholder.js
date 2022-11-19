import { addNote } from '../../features/notes/notesSlice';
import { useDispatch } from 'react-redux';
import './Placeholder.scss';

export default function Placeholder() {
    const dispatch = useDispatch();

    return (
        <div className='Placeholder'>
            <p className='Placeholder__text'>
                Select a note to start editing! Or,&nbsp;
                <span className='Placeholder__link' onClick={() => dispatch(addNote())}>create a note</span>&nbsp;
                to start something new.
            </p>
        </div>
    );
}
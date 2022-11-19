import { ReactComponent as DarkMode } from '../../assets/icons/dark-mode.svg';
import { ReactComponent as LightMode } from '../../assets/icons/light-mode.svg';
import { ReactComponent as LayoutGrid } from '../../assets/icons/layout-grid.svg';
import { ReactComponent as LayoutRow } from '../../assets/icons/layout-row.svg';
import { ReactComponent as NewNote } from '../../assets/icons/new-note.svg';
import { ReactComponent as Delete } from '../../assets/icons/delete.svg';
import { addNote, removeNote } from '../../features/notes/notesSlice';
import { useDispatch } from 'react-redux';
import './SidebarHead.scss';

export default function SidebarHead({ handleLayoutChange, handleThemeChange, listLayout, theme }) {
    const dispatch = useDispatch();

    return (
        <div className='SidebarHead'>
            <h2>Notes</h2>
            <div className='SidebarHead__options'>
                <div className='SidebarHead__option-group'>
                    <button className='SidebarHead__option' onClick={() => dispatch(addNote())}>
                        <NewNote />
                    </button>
                    <button className='SidebarHead__option' onClick={() => dispatch(removeNote())}>
                        <Delete />
                    </button>
                </div>
                <div className='SidebarHead__option-group'>
                    <button
                        className={`SidebarHead__option ${listLayout === 'row' ? 'SidebarHead__option--active' : ''}`}
                        disabled={listLayout === 'row'}
                        onClick={handleLayoutChange}
                    >
                        <LayoutRow />
                    </button>
                    <button
                        className={`SidebarHead__option ${listLayout === 'grid' ? 'SidebarHead__option--active' : ''}`}
                        disabled={listLayout === 'grid'}
                        onClick={handleLayoutChange}
                    >
                        <LayoutGrid />
                    </button>
                </div>
                <div className='SidebarHead__option-group'>
                    <button className='SidebarHead__option' onClick={handleThemeChange}>
                        {theme === 'light' && <DarkMode />}
                        {theme === 'dark' && <LightMode />}
                    </button>
                </div>
            </div>
        </div>
    );
}
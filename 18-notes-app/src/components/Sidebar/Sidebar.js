import { useState } from 'react';
import NoteList from '../NoteList';
import SidebarHead from '../SidebarHead';
import './Sidebar.scss';

export default function Sidebar({ sidebarWidth, setTheme, theme }) {
    const [listLayout, setListLayout] = useState('row');

    const handleLayoutChange = () => {
        setListLayout(listLayout === 'row' ? 'grid' : 'row');
    }

    const handleThemeChange = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <aside 
            className='Sidebar' 
            style={{ 
                minWidth: `${sidebarWidth}px`, 
                maxWidth: `${sidebarWidth}px` 
            }}
        >
            <SidebarHead 
                handleLayoutChange={ handleLayoutChange } 
                handleThemeChange={ handleThemeChange } 
                listLayout={ listLayout }
                theme={ theme }
            />
            <NoteList 
                listLayout={ listLayout } 
            />
        </aside>
    );
}
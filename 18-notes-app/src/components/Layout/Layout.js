import { useSelector } from 'react-redux';
import { useState } from 'react';
import Sidebar from '../Sidebar';
import LayoutController from '../LayoutController';
import Note from '../Note';
import Placeholder from '../Placeholder';
import './Layout.scss';

export default function Layout() {
    const activeNote = useSelector((state) => state.notes.active);
    const [sidebarWidth, setSidebarWidth] = useState(400);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [theme, setTheme] = useState('light');

    return (
        <main className={`Layout ${ theme }`}>
            {!sidebarCollapsed && <Sidebar
                sidebarWidth={ sidebarWidth }
                setTheme={ setTheme }
                theme={ theme }
            />}
            <LayoutController 
                setSidebarWidth={ setSidebarWidth }
                setSidebarCollapsed={ setSidebarCollapsed }
                sidebarCollapsed={ sidebarCollapsed }
            />
            {activeNote && <Note />}
            {!activeNote && <Placeholder />}
        </main>
    );
}
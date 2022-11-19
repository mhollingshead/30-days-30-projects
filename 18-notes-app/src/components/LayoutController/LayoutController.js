import { ReactComponent as ChevronLeft} from '../../assets/icons/chevron-left.svg';
import { ReactComponent as VerticalDots } from '../../assets/icons/vertical-dots.svg';
import _ from 'microtip/microtip.css';
import './LayoutController.scss';

export default function LayoutController({ setSidebarWidth, sidebarCollapsed, setSidebarCollapsed }) {
    const handleMouseMove = e => {
        e.preventDefault();
        setSidebarWidth(Math.max(Math.min(e.clientX, window.innerWidth - 408), 300));
    }

    const handleResizeEnd = () => {
        document.body.style.cursor = 'auto';
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleResizeEnd);
    }

    const handleResizeStart = () => {
        document.body.style.cursor = 'ew-resize';
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleResizeEnd);
    }

    const handleCollapse = () => {
        setSidebarCollapsed(!sidebarCollapsed);
    }

    return (
        <div className='LayoutController'>
            {!sidebarCollapsed && <>
                <div 
                    className='LayoutController__resize' 
                    onMouseDown={handleResizeStart}
                >
                    <VerticalDots />
                </div>
                <div 
                    className='LayoutController__collapse' 
                    data-microtip-position='left'  
                    aria-label='Hide sidebar' 
                    role="tooltip"
                    onClick={handleCollapse}
                >
                    <ChevronLeft />
                </div>
                <div 
                    className='LayoutController__resize' 
                    onMouseDown={handleResizeStart}
                >
                    <VerticalDots />
                </div>
            </>}
            {sidebarCollapsed && <>
                <div 
                    className='LayoutController__expand'
                    data-microtip-position='right'
                    aria-label='Show sidebar' 
                    role="tooltip"
                    onClick={handleCollapse} 
                >
                    <ChevronLeft />
                </div>
            </>}
        </div>
    );
}
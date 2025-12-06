
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Sidebar.module.css';

const Sidebar = ({ isOpen, toggle }) => {
    const menuItems = [
        { name: 'Home', path: '/home' },
        { name: 'Creat and Play', path: '/createandplay' },
        { name: 'Library', path: '/library' },
        { name: 'Connect', path: '/Connect' },
        { name: 'Analytics', path: '/analytics' },
    ];

    return (
        <>
            <div
                className={`${styles.overlay} ${isOpen ? styles.open : ''}`}
                onClick={toggle}
            />
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
                <ul className={styles.sidebar_nav}>
                    {menuItems.map((item, index) => (
                        <NavLink
                            to={item.path}
                            key={index}
                            className={styles.sidebar_item}
                            onClick={toggle}
                            style={({ isActive }) => ({
                                backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                                borderLeft: isActive ? '4px solid #fff' : '4px solid transparent'
                            })}
                        >
                            {item.name}
                        </NavLink>
                    ))}
                </ul>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
};

export default Sidebar;

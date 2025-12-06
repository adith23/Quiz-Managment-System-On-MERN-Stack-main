import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Styles from './Navibar2.module.css';
import Sidebar from './Sidebar';

const Navibar2 = () => {
  const { logout } = useContext(UserContext);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <div className={Styles.navibar2_component}>
        <div className={Styles.navibar_align}>
          <img
            className={Styles.collapse_icon}
            src="./Navi Bar Icon.svg"
            alt="Menu"
            onClick={toggleSidebar}
            style={{ cursor: 'pointer' }}
          />
          <img className={Styles.navibar2_logo} src="./nav-logo.svg" alt="" />
        </div>
        <div className={Styles.navibar2_icon}>
          <img className={Styles.icon} src="./explore.svg" alt="" />
          <img className={Styles.icon} src="notification.svg" alt="" />
          <img
            className={Styles.icon}
            src="./user.svg"
            alt="Logout"
            title="Logout"
            onClick={handleLogout}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>
      <Sidebar isOpen={isSidebarOpen} toggle={toggleSidebar} />
    </div>
  );
};

export default Navibar2;

import './Sidebar.css'
import Tabs from './component/Tabs'
import { RiDashboardFill, RiLogoutBoxLine } from 'react-icons/ri'
import { BsPeopleFill } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from '../../store/actions'
const Sidebar = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const action = bindActionCreators(actions, dispatch)

    const logout = () => {
        action.logout()
    }

    return (
        <div className="sidebar__container">
            <Tabs route="/dashboard" title="Dashboard" Component={<RiDashboardFill size="30" color="var(--bg)" />} active={location.pathname === '/dashboard' ? true : false} />
            <Tabs route="/customers" width={25} title="Customers" Component={<BsPeopleFill size="30" color="var(--bg)" />} active={location.pathname === '/customers' || location.pathname === '/customerDetails' ? true : false} />
            <Tabs route="/profile" title="Profile" paddingLeft={10} Component={<FaUserAlt size="25" color="var(--bg)" />} active={location.pathname === '/profile' ? true : false} />
            <Tabs onPress={logout} title="Logout" paddingLeft={5} Component={<RiLogoutBoxLine size="30" color="var(--bg)" />} />
        </div>
    )
}

export default Sidebar

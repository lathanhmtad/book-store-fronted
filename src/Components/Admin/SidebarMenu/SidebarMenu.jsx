import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { Menu } from "antd"
import {
    DashboardOutlined,
    UserOutlined
} from '@ant-design/icons';

import { MdOutlineCategory } from "react-icons/md";

const SidebarMenu = () => {
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const navigate = useNavigate()
    const location = useLocation()

    const items = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            onClick: () => navigate('/admin')
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: 'Users',
            onClick: () => navigate('/admin/users')
        },
        {
            key: '/admin/categories',
            icon: <MdOutlineCategory />,
            label: 'Categories',
            onClick: () => navigate('/admin/categories')
        }
    ]

    return (
        <Menu
            theme={isDarkMode ? 'dark' : 'light'}
            mode="inline"
            defaultSelectedKeys={[location.pathname]}
            items={items}
        />
    )
}

export default SidebarMenu
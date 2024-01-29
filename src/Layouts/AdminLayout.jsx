import { useState } from 'react'
import { Layout, ConfigProvider, theme, Spin } from 'antd'
import { FaReact } from "react-icons/fa"
import SidebarMenu from '../Components/Admin/SidebarMenu/SidebarMenu'
import { Outlet } from 'react-router-dom'
import AdminHeader from '../Components/Admin/Header/AdminHeader.jsx'
import { useSelector } from 'react-redux'

const { Sider, Content } = Layout

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false)
    const isDarkMode = useSelector(state => state.theme.isDarkMode)

    return (
        <ConfigProvider ConfigProvider
            theme={
                {
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    components: {
                        Layout: {
                            headerBg: isDarkMode ? "#262626" : "#ffffff",
                        },
                    }
                }
            }
        >
            <Layout>
                <Sider
                    theme={isDarkMode ? 'dark' : 'light'}
                    trigger={null}
                    collapsible
                    style={{
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        top: 0,
                        bottom: 0,
                    }}
                    collapsed={collapsed}>
                    <div className="demo-logo-vertical"
                        style={{
                            textAlign: 'center',
                            margin: '16px'
                        }}
                    >
                        <Spin size='large'
                            indicator={
                                <FaReact
                                    style={
                                        {
                                            animation: 'spin 3s linear infinite'
                                        }
                                    }
                                />
                            }
                        />
                    </div>
                    <SidebarMenu />
                </Sider>
                <Layout
                    style={{
                        marginLeft: collapsed ? 80 : 200,
                        transition: 'margin-left 0.2s',
                        height: '100vh'
                    }}
                >
                    <AdminHeader
                        collapsed={collapsed}
                        setCollapsed={setCollapsed}
                    />
                    <Content
                        style={{
                            margin: '8px 24px',
                            padding: 16
                        }}
                    >
                        <Outlet />
                    </Content>
                </Layout>
            </Layout>
        </ConfigProvider >
    )
}
export default AdminLayout
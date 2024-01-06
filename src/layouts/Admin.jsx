import React, { useEffect, useState } from 'react';

import { GrResources } from "react-icons/gr";
import { MdOutlineAdminPanelSettings } from "react-icons/md"
import { AiOutlineFileProtect } from 'react-icons/ai'
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    DashboardOutlined,
    KeyOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const Admin = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Layout>
            <Sider
                theme='dark'
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                trigger={null} collapsible collapsed={collapsed}>
                <div className="demo-logo-vertical"
                    style={{
                        height: '32px',
                        margin: '16px',
                        background: 'rgba(255, 255, 255, .2)',
                        borderRadius: '6px'
                    }}
                />
                <Menu
                    theme='dark'
                    mode="inline"
                    defaultSelectedKeys={[location.pathname]}
                    items={[
                        {
                            key: '/admin',
                            icon: <DashboardOutlined />,
                            label: 'Dashboard',
                            onClick: () => navigate('/admin')
                        },
                        {
                            key: '/admin/resources',
                            icon: <GrResources />,
                            label: 'System resources',
                            onClick: () => navigate('/admin/resources')
                        },
                        {
                            key: '/admin/roles',
                            icon: <MdOutlineAdminPanelSettings />,
                            label: 'Roles',
                            onClick: () => navigate('/admin/roles')
                        },
                        {
                            key: '/admin/permissions',
                            icon: <AiOutlineFileProtect />,
                            label: 'Permissions',
                            onClick: () => navigate('/admin/permissions')
                        },
                        {
                            key: '/admin/users',
                            icon: <UserOutlined />,
                            label: 'Users',
                            onClick: () => navigate('/admin/users')
                        },
                    ]}
                />
            </Sider>
            <Layout
                style={{
                    marginLeft: collapsed ? 80 : 200,
                    transition: 'margin-left 0.2s',
                    height: '100vh'
                }}>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: '16px 24px',
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default Admin;
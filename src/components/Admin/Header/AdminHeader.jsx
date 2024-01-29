import { Layout, Button, Row, Col, Typography, Avatar } from 'antd';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    DownOutlined,
} from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { LuSunMedium } from "react-icons/lu";
import { CiDark } from "react-icons/ci";
import { MdLogout } from "react-icons/md"
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../../redux/slices/themeSlice';
import { doLogout } from '../../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import userService from '../../../services/userService'

const { Header } = Layout;

const AdminHeader = (props) => {
    const { collapsed, setCollapsed } = props
    const isDarkMode = useSelector(state => state.theme.isDarkMode)
    const currentUser = useSelector(state => state.auth.userInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const items = [
        {
            key: 'profile',
            label: 'Profile',
        },
        {
            type: 'divider',
        },
        {
            key: 'logout',
            label: <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>Logout <MdLogout /></div>,
        }
    ];

    const handleDropdownItemClick = async ({ key }) => {
        switch (key) {
            case 'profile':
                break;
            case 'logout':
                await userService.logout(currentUser.id)
                dispatch(doLogout())
                // navigate('/product')
                toast.success('Logout successfully!')
                break
            default:
        }
    }

    return (
        <Header
            style={{
                padding: '0 24px',
            }}
        >
            <Row align="middle">
                <Col span={2}>
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: '64px',
                            height: '64px',
                            marginLeft: '-24px'
                        }}
                    />
                </Col>
                <Col span={8} offset={14}
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        type="text"
                        icon={isDarkMode ? <LuSunMedium /> : <CiDark />}
                        onClick={() => dispatch(toggleDarkMode())}
                        style={{
                            fontSize: '24px',
                            width: '64px',
                            height: '64px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    />
                    <Dropdown
                        menu={
                            {
                                items,
                                onClick: handleDropdownItemClick
                            }
                        }
                        trigger={['click']}
                    >
                        <Typography.Link>
                            <Space>
                                <Avatar src={<img src={currentUser.photo} alt="avatar" />} />
                                {currentUser.fullName}
                                <DownOutlined />
                            </Space>
                        </Typography.Link>
                    </Dropdown>
                </Col>
            </Row>



        </Header>
    )
}

export default AdminHeader
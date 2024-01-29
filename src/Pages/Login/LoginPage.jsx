import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, Typography } from 'antd';
import userService from '../../services/userService';
import './LoginPage.scss'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../redux/slices/authSlice';

const { Title } = Typography;

const LoginPage = () => {
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const onFinish = async (values) => {
        toast.dismiss()
        setIsLoading(true)
        const res = await userService.login(values)
        if (res && res.accessToken) {
            toast.success('Login successful!')
            dispatch(loginSuccess(res.accessToken))
            navigate('/')
        }
        else if (res && res.errorCode) {
            toast.error(res.message)
        }
        else {
            toast.error('Unable to connect to the server!')
        }
        setIsLoading(false)
    }

    return (
        <div className='login-page-container'
        >
            <Title level={2}>Login</Title>
            <Form
                disabled={isLoading ? true : false}
                name="basic"
                labelCol={{
                    span: 24,
                }}
                size='large'
                wrapperCol={{
                    span: 24,
                }}
                style={{
                    margin: '0 auto',
                    maxWidth: 600,
                    width: '100%'
                }}
                initialValues={{
                    remember: true,
                }}
                labelAlign='left'
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Invalid email!',
                        },
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
                    validateDebounce={500}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 4,
                    }}
                >
                    <Button
                        loading={isLoading ? true : false}
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default LoginPage;
import React, { useState } from 'react';
import { Button, Form, Input } from 'antd';
import userService from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true)
        const id = toast.loading("Please wait...")
        const res = await userService.login(values.email, values.password)
        if (res.accessToken) {
            toast.update(id, { render: "Đăng nhập thành công", type: "success", isLoading: false, autoClose: 5000, closeButton: true });
            localStorage.setItem('accessToken', res.accessToken)
            navigate('/')
        }
        else {
            toast.update(id, { render: `${res.message}`, type: "error", isLoading: false, autoClose: 5000, closeButton: true });
        }
        setLoading(false)
    }

    return (
        <div style={{
            height: '100vh'
        }} className='d-flex flex-column align-items-center justify-content-center'>
            <div className='fs-2 fw-semibold mb-4 text-center'>Login to BookStore</div>
            <Form
                name="basic"
                size='large'
                labelCol={{
                    span: 4,
                }}
                wrapperCol={{
                    span: 32,
                }}
                style={{
                    maxWidth: 600,
                    width: '100%'
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
                labelAlign='left'
                validateTrigger={['onChange', 'onBlur']}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                        {
                            type: 'email',
                            message: 'Email invalid!'
                        },
                        {
                            required: true,
                            message: 'Please input your email!',
                        },
                    ]}
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
                        }
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button
                        disabled={loading ? true : false}
                        loading={loading ? true : false}
                        size='large'
                        type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
};
export default Login
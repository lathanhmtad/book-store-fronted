import React, { useState } from "react"
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { Form, Input, Button, Checkbox, Typography } from "antd"
import { LoginOutlined } from "@ant-design/icons"

import SocialNetworks from "../SocialNetworks/SocialNetworks"

import userService from '../../services/userService'

import { loginSuccess } from "../../redux/slices/authSlice"

const { Title } = Typography

export default function SignIn() {
    const [isLoading, setIsLoading] = useState(false)
    const [form] = Form.useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const onFinish = async (values) => {
        toast.dismiss()
        setIsLoading(true)
        try {
            const res = await userService.login(values.email, values.password)
            if (res && res.accessToken) {
                dispatch(loginSuccess(res))
                toast.success('Logged in successfully')
                navigate('/')
            }
            else {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error('Unable to connect to the server!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <Form
                name="login"
                form={form}
                disabled={isLoading ? true : false}
                initialValues={{
                    remember: false,
                }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Title level={2} className="text-center">
                    Sign in
                </Title>

                <SocialNetworks />

                <div className="option-text">or use your account</div>

                <Form.Item
                    name="email"
                    label="Email"
                    rules={[
                        {
                            required: true,
                            message: "Please input your email.",
                        },
                        {
                            type: "email",
                            message: "Your email is invalid.",
                        },
                    ]}
                    validateDebounce={600}
                >
                    <Input placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password.",
                        }
                    ]}
                >
                    <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item>
                    <Form.Item name="remember" valuePropName="checked" noStyle>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>

                    <a className="login-form-forgot" href="#">
                        Forgot password?
                    </a>
                </Form.Item>

                <Button
                    loading={isLoading}
                    type="primary"
                    htmlType="submit"
                    shape="round"
                    icon={<LoginOutlined />}
                    size="large"
                >
                    Sign In
                </Button>
            </Form>
        </>
    )
}
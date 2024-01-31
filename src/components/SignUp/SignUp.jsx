import React, { useState } from "react";

import { Form, Input, Button, Typography } from "antd";
import { UserAddOutlined } from "@ant-design/icons";

import SocialNetworks from "../SocialNetworks/SocialNetworks";
import SignUpSuccessModal from "../../Pages/Auth/SignUpSuccessModal";

const { Title } = Typography;

export default function SignUp() {
    const [checked, setChecked] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const onFinish = async (values) => {
        console.log(values)
    };

    const onCheckboxChange = (e) => {
        setChecked(e.target.checked);
    };

    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {showModal && <SignUpSuccessModal handleClose={handleCloseModal} />}

            <Form
                name="register"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                form={form}
            >
                <Title level={2} className="text-center">
                    Create Account
                </Title>
                <SocialNetworks />

                <div className="option-text">or use your email for registration</div>

                <Form.Item
                    name="fullName"
                    label="Full name"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: "Please input your full name.",
                        },
                        {
                            min: 3,
                            message: "Your full name must be at least 3 characters.",
                        },
                    ]}
                    validateDebounce={700}
                >
                    <Input placeholder="First name" size="large" />
                </Form.Item>

                <Form.Item
                    name="email"
                    label="Email"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
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
                    validateDebounce={700}
                >
                    <Input placeholder="Email" size="large" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    rules={[
                        {
                            required: true,
                            message: "Please input your password.",
                        },
                        { min: 6, message: "Password must be minimum 6 characters." },
                    ]}
                >
                    <Input.Password placeholder="Password" size="large" />
                </Form.Item>

                <Form.Item
                    name="confirm"
                    label="Confirm Password"
                    labelCol={{ span: 24 }}
                    wrapperCol={{ span: 24 }}
                    dependencies={["password"]}
                    rules={[
                        {
                            required: true,
                            message: "Confirm your password.",
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue("password") === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        "The two passwords that you entered do not match!"
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password placeholder="Confirm password" size="large" />
                </Form.Item>



                <Button
                    type="primary"
                    loading={loading}
                    className="form-submit-btn"
                    htmlType="submit"
                    shape="round"
                    icon={<UserAddOutlined />}
                    size="large"
                >
                    Sign Up
                </Button>
            </Form>
        </>
    );
}
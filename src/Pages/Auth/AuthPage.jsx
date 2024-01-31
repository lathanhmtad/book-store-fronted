import React, { useState } from "react"

import { Button } from "antd"
import { SelectOutlined } from "@ant-design/icons"

import SignIn from "../../Components/SignIn/SignIn"
import SignUp from "../../Components/SignUp/SignUp"

import "./Auth.scss"

const AuthPage = () => {
    const [isPanelRightActive, setIsPanelRightActive] = useState(false)

    const handleClickSignIn = () => {
        setIsPanelRightActive(false)
    }

    const handleClickSignUp = () => {
        setIsPanelRightActive(true)
    }

    return (
        <div className="auth-page">
            <div className="auth-page-wrapper">
                <div
                    className={`auth-container ${isPanelRightActive ? "right-panel-active" : ""}`}
                >
                    <div className="form-container sign-up-container">
                        <SignUp />
                    </div>
                    <div className="form-container sign-in-container">
                        <SignIn />
                    </div>

                    <div className="overlay-container">
                        <div className="overlay">
                            <div className="overlay-panel overlay-left bg-gradient">
                                <h1>Welcome!</h1>
                                <p>
                                    If you already have an account with us let's sign in to
                                    see something awesome!
                                </p>
                                <Button
                                    shape="round"
                                    onClick={handleClickSignIn}
                                    icon={<SelectOutlined />}
                                    size="large"
                                >
                                    Use your exist account
                                </Button>
                            </div>
                            <div className="overlay-panel overlay-right bg-gradient">
                                <h1>Hello, Friend!</h1>
                                <p>
                                    If you don't have an account, let's enter your personal
                                    details and start journey with us
                                </p>
                                <Button
                                    shape="round"
                                    onClick={handleClickSignUp}
                                    icon={<SelectOutlined />}
                                    size="large"
                                >
                                    Create new account
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AuthPage
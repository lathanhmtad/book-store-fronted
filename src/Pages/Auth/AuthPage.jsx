import React from 'react';
import { Watermark } from 'antd';
import Login from './Login';
const AuthPage = () => {
    return (
        <Watermark content="Ant Design">
            <div
                style={{
                    height: '100vh',
                    width: '100vw'
                }}
            >
                <Login />
            </div>
        </Watermark>

    )
};
export default AuthPage;
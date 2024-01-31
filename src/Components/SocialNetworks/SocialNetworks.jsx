import React from "react";
import {
    FacebookOutlined,
    GooglePlusOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";

const SocialNetworks = () => {
    return (
        <div className="social-container">
            <Tooltip
                title="Google"
                placement="top"
                color="#db4a39"
                key="#db4a39"
            >
                <div className="social google">
                    <GooglePlusOutlined />
                </div>
            </Tooltip>

            <Tooltip
                title="Facebook"
                placement="top"
                color="#4267B2"
                key="#4267B2"
            >
                <div className="social facebook">
                    <FacebookOutlined />
                </div>
            </Tooltip>
        </div>
    );
};

export default SocialNetworks
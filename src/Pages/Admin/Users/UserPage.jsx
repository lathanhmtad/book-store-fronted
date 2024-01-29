import { useState } from "react";
import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalUser from "../../../Components/Admin/Users/ModalUser";
import TableUser from "../../../Components/Admin/Users/TableUser";
import DrawerDetailsUser from "../../../Components/Admin/Users/DrawerDetailsUser";


const RolePage = () => {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <div>
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Users</Typography.Title>
                    <Typography.Title level={5}>Users management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => setModalOpen(true)}
                        size="large">
                        Add user
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableUser />

            <DrawerDetailsUser />

            <ModalUser
                setShow={setModalOpen}
                show={modalOpen}
            />


        </div>
    )
}

export default RolePage
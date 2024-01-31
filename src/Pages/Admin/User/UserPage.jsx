import { useDispatch } from "react-redux";

import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalUser from "../../../Components/Admin/Users/ModalUser";
import TableUser from "../../../Components/Admin/Users/TableUser";
import DrawerDetailsUser from "../../../Components/Admin/Users/DrawerDetailsUser";

import { setOpenModal } from "../../../redux/slices/users/userSlice";

const UserPage = () => {
    const dispatch = useDispatch()

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
                        onClick={() => dispatch(setOpenModal(true))}
                        size="large">
                        Add user
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableUser />

            <DrawerDetailsUser />

            <ModalUser />
        </div>
    )
}

export default UserPage
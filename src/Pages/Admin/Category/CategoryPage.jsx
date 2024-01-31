import { useDispatch } from "react-redux";

import { Button, Flex, Space, Typography, Divider } from "antd"
import { PlusCircleOutlined } from '@ant-design/icons'

// import components
import ModalCategory from "../../../Components/Admin/Categories/ModalCategory";
import TableCategory from "../../../Components/Admin/Categories/TableCategory";
import DrawerDetailsUser from "../../../Components/Admin/Users/DrawerDetailsUser";

import { setOpenModal } from "../../../redux/slices/categories/categorySlice";

const CategoryPage = () => {
    const dispatch = useDispatch()

    return (
        <div>
            <Flex align="center" justify="space-between">
                <Space
                    direction="vertical"
                    size="small"
                >
                    <Typography.Title style={{ marginBottom: 0 }} level={2}>Categories</Typography.Title>
                    <Typography.Title level={5}>Categories management</Typography.Title>
                </Space>
                <div>
                    <Button
                        type="primary"
                        icon={<PlusCircleOutlined />}
                        onClick={() => dispatch(setOpenModal(true))}
                        size="large">
                        Add category
                    </Button>
                </div>
            </Flex>
            <Divider />

            <TableCategory />

            <DrawerDetailsUser />

            <ModalCategory />
        </div>
    )
}

export default CategoryPage
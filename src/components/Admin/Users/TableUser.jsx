import { Checkbox, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

import userService from '../../../services/userService'
import { toast } from "react-toastify";

const TableUser = (props) => {
    const [loading, setLoading] = useState(false)
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeys(newSelectedRowKeys);
        }
    };

    const edit = () => {

    }

    const handleConfirmDelete = async (id) => {
        setLoading(true)
        const res = await userService.deleteUser(id)
        if (!res.errorCode) {
            toast.success('Xóa thành công!')
            props.fetchUsers()
        }
        else {
            toast.error(res.message)
        }
        setLoading(false)
    }

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Full name',
            dataIndex: 'fullName',
        },
        {
            title: 'Enabled',
            dataIndex: 'enabled',
            render: (value) => (
                <Checkbox checked={value} ></Checkbox>
            )
        },
        {
            title: "Action",
            dataIndex: "operation",
            render: (_, record) => {
                return (
                    <div className="d-flex align-items-center gap-3">
                        <Typography.Link
                            onClick={() => props.handleShowModalUserDetails(record.id)}
                        >
                            Details
                        </Typography.Link>
                        <Typography.Link
                            type="warning"
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Typography.Link type="danger">
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => handleConfirmDelete(record.id)}
                            >
                                Delete
                            </Popconfirm>
                        </Typography.Link>
                    </div>
                )
            },
        },
    ];


    return (
        <div>
            <Table
                loading={props.loading || loading ? true : false}
                rowSelection={rowSelection} columns={columns} rowKey="id"
                pagination={false} bordered dataSource={props.data}
            />
        </div>
    )
}

export default TableUser
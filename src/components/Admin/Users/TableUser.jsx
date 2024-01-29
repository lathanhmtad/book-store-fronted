import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Space, Table, Typography, Popconfirm } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, fetchUserWithPagination } from '../../../redux/slices/users/userThunk';
import { USERS_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant';


const TableUser = () => {
    const { currentPage, data: users } = useSelector(state => state.user)
    const dispatch = useDispatch()

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
            title: 'Enabled',
            dataIndex: 'enabled',
            render: (text) => {
                return (
                    <Checkbox checked={Boolean(text) ? true : false}></Checkbox>
                )
            }
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_, record) => (
                <>
                    <Space size='large'>
                        <Typography.Link>
                            Edit
                        </Typography.Link>
                        <Popconfirm title="Sure to delete?"
                            icon={
                                <QuestionCircleOutlined
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                        >
                            <Typography.Link type='danger'>Delete</Typography.Link>
                        </Popconfirm>
                        <Typography.Link
                            type='warning'
                            onClick={() => dispatch(fetchUserById(record.id))}
                        >
                            Details
                        </Typography.Link>
                    </Space>
                </>
            )
        }
    ];

    useEffect(() => {
        dispatch(fetchUserWithPagination({ page: currentPage, size: USERS_MAX_ITEMS_PER_PAGE }))
    }, [])

    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    return (
        <Table
            bordered
            rowKey="id"
            rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
        />
    );
};
export default TableUser;
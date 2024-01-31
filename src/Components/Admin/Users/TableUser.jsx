import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox, Space, Table, Typography, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { fetchUserById, fetchUserWithPagination, updateUser } from '../../../redux/slices/users/userThunk'
import { setCurrentPage } from '../../../redux/slices/users/userSlice'

import { USERS_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'

const TableUser = () => {
    const { currentPage, users, totalElements } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

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
            dataIndex: 'fullName'
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
                        <Typography.Link onClick={() => dispatch(updateUser(record.id))}>
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
    ]

    useEffect(() => {
        dispatch(fetchUserWithPagination({ page: currentPage, size: USERS_MAX_ITEMS_PER_PAGE }))
    }, [currentPage])


    const rowSelection = {
        selectedRowKeys,
        onChange: (newSelectedRowKeys) => {
            console.log('selectedRowKeys changed: ', newSelectedRowKeys)
            setSelectedRowKeys(newSelectedRowKeys)
        },
    }

    return (
        <Table
            rowKey="id"
            bordered
            rowSelection={rowSelection}
            columns={columns}
            dataSource={users}
            pagination={
                {
                    current: currentPage,
                    total: totalElements,
                    pageSize: USERS_MAX_ITEMS_PER_PAGE,
                    onChange: page => {
                        dispatch(setCurrentPage(page))
                    }
                }
            }
        />
    )
}
export default TableUser
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Checkbox, Space, Table, Typography, Popconfirm } from 'antd'
import { QuestionCircleOutlined } from '@ant-design/icons'

import { fetchUserById, fetchUserWithPagination, updateUser } from '../../../redux/slices/users/userThunk'
import { setCurrentPage } from '../../../redux/slices/categories/categorySlice'

import { CATEGORIES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'
import { fetchCategories } from '../../../redux/slices/categories/categoryThunk'

const TableCategory = () => {
    const { currentPage, categories, totalElements } = useSelector(state => state.category)
    const dispatch = useDispatch()

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
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
        dispatch(fetchCategories({ page: currentPage, size: CATEGORIES_MAX_ITEMS_PER_PAGE }))
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
            dataSource={categories}
            pagination={
                {
                    current: currentPage,
                    total: totalElements,
                    pageSize: CATEGORIES_MAX_ITEMS_PER_PAGE,
                    onChange: page => {
                        dispatch(setCurrentPage(page))
                    }
                }
            }
        />
    )
}
export default TableCategory
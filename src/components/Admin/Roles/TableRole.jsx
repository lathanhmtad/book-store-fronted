import { useEffect, useState } from "react"

import { Button, Table } from "antd";
import { Form, Popconfirm, Typography } from "antd";

import EditableCell from "./EditableCell";

import roleService from "../../../services/roleService";

import { toast } from "react-toastify";

import _ from 'lodash'

const TableRole = (props) => {
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm();
    const [editingKey, setEditingKey] = useState("");
    const [selectedRowKeysMap, setSelectedRowKeysMap] = useState({});

    useEffect(() => {
        setEditingKey("")
    }, [props.currentPage])


    const isEditing = (record) => record.id === editingKey;

    const edit = (record) => {
        form.setFieldsValue({
            ...record
        })
        setEditingKey(record.id)
    };

    const cancel = () => {
        setEditingKey("")
    }

    const save = async (id) => {
        setLoading(true)
        const row = await form.validateFields()
        const res = await roleService.updateRole(id, row)
        if (res && !res.errorCode) {
            props.fetchRoles()
            toast.success('Update success')
        }
        setEditingKey("");
        setLoading(false)
    }

    const handleConfirmDelete = async (id) => {
        setLoading(true)
        const res = await roleService.deleteRole(id)
        if (res && !res.errorCode) {
            props.fetchRoles()
            toast.success('Delete success!')
        }
        setLoading(false)
    }

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            editable: false
        },
        {
            title: "Name",
            dataIndex: "name",
            editable: true,
        },
        {
            title: "Description",
            dataIndex: "description",
            editable: true,
        },
        {
            title: "Action",
            dataIndex: "operation",
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <div className="d-flex align-items-center gap-3">
                        <Typography.Link
                            onClick={() => save(record.id)}
                        >
                            Save
                        </Typography.Link>

                        <Popconfirm title="Sure to cancel?" onConfirm={() => cancel(record.id)}>
                            <Typography.Link type="warning">Cancel</Typography.Link>
                        </Popconfirm>
                    </div>
                ) : (
                    <div className="d-flex align-items-center gap-3">
                        <Typography.Link
                            disabled={editingKey !== ""}
                            onClick={() => edit(record)}
                        >
                            Edit
                        </Typography.Link>
                        <Typography.Link type="danger"
                            disabled={editingKey !== ""}>
                            <Popconfirm
                                title="Sure to delete?"
                                onConfirm={() => handleConfirmDelete(record.id)}
                            >
                                Delete
                            </Popconfirm>
                        </Typography.Link>
                    </div>
                );
            },
        },
    ];

    const rowSelection = {
        selectedRowKeys: selectedRowKeysMap[props.currentPage] || [],
        onChange: (newSelectedRowKeys) => {
            setSelectedRowKeysMap({
                ...selectedRowKeysMap,
                [props.currentPage]: newSelectedRowKeys,
            });
        }
    };

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                inputType: "text",
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    const start = () => {
        setLoading(true);
        // ajax request after empty completing
        setTimeout(() => {
            setSelectedRowKeysMap({});
            setLoading(false);
        }, 1000);
    };

    const buildData = () => {
        return _.flatten(_.values(selectedRowKeysMap))
    }

    const handleDeleteAll = async () => {
        setLoading(true)
        const data = buildData()
        const res = await roleService.deleteAll(data)
        if(res && !res.errorCode) {
            props.setCurrentPage(1)
            props.fetchRoles()
            setSelectedRowKeysMap({})
            toast.success('delete success')
        }

        setLoading(false)
    }

    const hasSelected = !_.isEmpty(selectedRowKeysMap) && _.some(selectedRowKeysMap, arr => (_.isArray(arr) && !_.isEmpty(arr)));

    return (
        <div>
            <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this all?"
                onConfirm={handleDeleteAll}
                onCancel={cancel}
                okText="Yes"
                cancelText="No"
                className="me-2"

            >
                <Button danger loading={loading} disabled={!hasSelected}>Delete all</Button>
            </Popconfirm>

            <Button className="mb-3" type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                Reload
            </Button>
            <span
                style={{
                    marginLeft: 8,
                }}
            >
                Selected {_.flatten(_.values(selectedRowKeysMap)).reduce(total => total + 1, 0)} items
            </span>
            <Form form={form} component={false}>
                <Table
                    loading={props.loading || loading ? true : false}
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    rowKey="id"
                    dataSource={props.data}
                    columns={mergedColumns}
                    rowSelection={{
                        type: "checkbox",
                        ...rowSelection,
                    }}
                    bordered
                    pagination={false}
                />
            </Form>
        </div>
    )
}

export default TableRole
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';

import { UploadOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Radio,
    Select,
    Upload,
} from 'antd';

import roleService from '../../../services/roleService'
import userService from '../../../services/userService';
import { toast } from 'react-toastify';

const ModalUser = (props) => {
    const { show, handleClose } = props

    const [loading, setLoading] = useState(false)
    const [optionRoles, setOptionRoles] = useState([])

    useEffect(() => {
        fetchOptionRoles()
    }, [])

    const fetchOptionRoles = async () => {
        const res = await roleService.getRoles()
        if (res && !res.errorCode) {
            const newOptions = res.map(item => ({
                label: item.name,
                value: item.id
            }))
            setOptionRoles(newOptions)
        }
    }

    const onFinish = async (values) => {
        setLoading(true)
        const formData = new FormData()
        Object.entries(values).forEach(([key, value]) => {
            if (key === 'image') {
                formData.append(key, value[0].originFileObj)
            }
            else {
                formData.append(key, value)
            }
        })
        const res = await userService.createNewUser(formData)
        if (!res.errorCode) {
            toast.success('Tạo mới người dùng thành công')
            props.setCurrentPage(1)
            props.fetchUsers()
            props.handleClose()
        }
        else {
            toast.error(res.message)
        }

        setLoading(false)
    };

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    return (
        <Modal
            show={show}
            backdrop="static"
            centered
            size='xl'
        >
            <Modal.Header>
                <Modal.Title>{
                    props.userDetails.fullName ? `Details for user ${props.userDetails.fullName}` : 'Add a user'
                }</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-9'>
                        <Form
                            name='basic'
                            disabled={loading ? true : false}
                            size='large'
                            labelCol={{
                                span: 3,
                            }}
                            labelAlign='left'
                            wrapperCol={{
                                span: 32,
                            }}
                            layout="horizontal"
                            style={{
                                width: '100%'
                            }}
                            autoComplete="off"
                            onFinish={onFinish}
                            validateTrigger={['onChange']}
                        >
                            <Form.Item
                                label="Full name"
                                name="fullName"
                                initialValue={props.userDetails.fullName}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your full name!',
                                    },
                                    {
                                        min: 3,
                                        message: 'Please enter at least 3!'
                                    }
                                ]}
                            >
                                <Input
                                />
                            </Form.Item>
                            <Form.Item
                                label="Email"
                                name="email"
                                initialValue={props.userDetails.email}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                    },
                                    {
                                        type: 'email',
                                        message: 'Email invalid!'
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item
                                label="Password"
                                name="password"
                                initialValue={props.userDetails.password}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                    {
                                        min: 3,
                                        message: 'Please enter at least 3!'
                                    }
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <Form.Item
                                label="Phone"
                                name="phoneNumber"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your phone number!',
                                    }
                                ]}
                            >
                                <Input />
                            </Form.Item>
                            <Form.Item label="Select roles"
                                name="roleIds"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please select roles!',
                                    }
                                ]}
                            >
                                <Select
                                    allowClear
                                    mode="multiple"
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select roles"
                                    options={optionRoles}
                                    filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                    dropdownStyle={{ zIndex: 1000000000000 }}
                                ></Select>
                            </Form.Item>
                            <Form.Item
                                label="Image"
                                name="image"
                                valuePropName='fileList'
                                getValueFromEvent={normFile}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please upload your image!'
                                    }
                                ]}
                            >
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture"
                                    maxCount={1}
                                >
                                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                                </Upload>
                            </Form.Item>
                            <Form.Item
                                label="Status"
                                name="enabled"
                                initialValue="false"
                            >
                                <Radio.Group>
                                    <Radio value="false">Disabled</Radio>
                                    <Radio value="true">Enabled</Radio>
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item
                                wrapperCol={{
                                    offset: 4,
                                    span: 16,
                                }}
                            >
                                <Button type="primary"
                                    loading={loading ? true : false}
                                    htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='col-3'>
                        Permissions
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button
                    type="default"
                    size='large'
                    loading={loading ? true : false}
                    onClick={() => handleClose()}
                >
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUser 
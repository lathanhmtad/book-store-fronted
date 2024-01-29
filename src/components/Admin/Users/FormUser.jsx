import React, { useEffect, useState } from 'react';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';
import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Radio,
    Row,
    Select,
    Typography,
    Upload,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash'
import { createNewUser } from '../../../redux/slices/users/userThunk';

const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });


const FormUser = () => {
    const { loading: loadingSelect, roleOptions: options } = useSelector(state => state.role)
    const dispatch = useDispatch()

    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('')
    const [previewOpen, setPreviewOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState([]);

    useEffect(() => {
        
    }, [])

    const fileProps = {
        name: "file",
        multiple: false,
        listType: "picture-card",
        maxCount: 1,
        fileList: uploadedImage,
        beforeUpload: () => {
            return false;
        },
        onChange: ({ fileList: newUploadedImage }) => setUploadedImage(newUploadedImage),
        onPreview: async (file) => {
            if (!file.url && !file.preview) {
                file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
        }
    };

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            <Typography.Link><PlusOutlined /></Typography.Link>
            <div
                style={{
                    marginTop: 8,
                }}
            >
                <Typography.Link>Upload</Typography.Link>
            </div>
        </button>
    );

    const onFinish = (values) => {

        const formData = new FormData()

        for (const [key, value] of Object.entries(values)) {
            if (key === 'image') {
                formData.append(key, value.file)
            }
            else {
                formData.append(key, value)
            }
        }

        dispatch(createNewUser(formData))
    }

    return (
        <>
            <Row gutter={24}>
                <Col span={18}>
                    <Form
                        size='large'
                        labelAlign='left'
                        labelCol={{
                            span: 3,
                        }}
                        wrapperCol={{
                            span: 24,
                        }}
                        layout="horizontal"
                        onFinish={onFinish}
                        autoComplete='off'
                    >
                        <Form.Item
                            label="Email"
                            name="email"
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
                            validateDebounce={700}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Full name"
                            name="fullName"
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phoneNumber"
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
                                loading={loadingSelect ? true : false}
                                allowClear
                                mode="multiple"
                                style={{
                                    width: '100%',
                                }}
                                placeholder="Please select roles"
                                options={options}
                                filterOption={(input, option) => option.label.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                                dropdownStyle={{ zIndex: 1000000000000 }}
                            ></Select>
                        </Form.Item>
                        <Form.Item
                            label="Upload"
                            name="image"
                        >
                            <Upload
                                {...fileProps}
                            >
                                {uploadButton}
                            </Upload>
                        </Form.Item>

                        <Form.Item
                            label="Status"
                            name="enabled"
                            initialValue="true"
                        >
                            <Radio.Group>
                                <Radio value="true">Enabled</Radio>
                                <Radio value="false">Disabled</Radio>
                            </Radio.Group>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{
                                span: 24,
                            }}
                        >
                            <Button type="primary"
                                block
                                htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={6}>
                    <Typography.Text>Permission</Typography.Text>
                </Col>
            </Row>

            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={() => setPreviewOpen(false)}>
                <img
                    alt="example"
                    style={{
                        width: '100%',
                    }}
                    src={previewImage}
                />
            </Modal>


        </>
    );
};
export default FormUser;
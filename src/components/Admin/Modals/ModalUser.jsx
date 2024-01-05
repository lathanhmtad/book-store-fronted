import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import roleService from '../../../services/roleService'
import { Select } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { Radio } from 'antd';
import { Checkbox } from 'antd';
import { Modal as ModalAntd } from 'antd';
import { toast } from 'react-toastify';
import userService from '../../../services/userService';


const ModalUser = (props) => {
    const { show, handleClose } = props

    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [roles, setRoles] = useState([])
    const [photo, setPhoto] = useState([]);
    const [enabled, setEnabled] = useState('false')

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

    const statusOptions = [
        {
            label: 'Disabled',
            value: 'false',
        },
        {
            label: 'Enabled',
            value: 'true',
        },
    ];

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const handleCancel = () => setPreviewOpen(false);
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setPreviewImage(file.url || file.preview);
        setPreviewOpen(true);
        setPreviewTitle(
            file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
        );
    };
    const handleChangeImage = ({ file, fileList: newFileList }) => {
        const isValid = beforeUpload(file)
        if (isValid) {
            setPhoto(newFileList)
        }
    }
    const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            toast.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            toast.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: "none",
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    const plainOptions = ['Apple', 'Pear', 'Orange'];

    const handleChangeStatus = ({ target: { value } }) => {
        setEnabled(value);
    }

    const handleChangeRoles = (value) => {
        setRoles(value)
    };

    const onChange5 = (checkedValues) => {
        console.log('checked = ', checkedValues);
    };

    const handleSaveChanges = async () => {
        const formData = new FormData()
        formData.append('email', email)
        formData.append('fullName', fullName)
        formData.append('phoneNumber', phoneNumber)
        formData.append('password', password)
        formData.append('enabled', enabled)
        formData.append('image', photo[0].originFileObj)
        formData.append('roleIds', roles)
        
        const res = await userService.createNewUser(formData)
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            size='xl'
        >
            <Modal.Header>
                <Modal.Title>Add a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-8'>
                        <div className="mb-3 row">
                            <label htmlFor="email" className="col-sm-2 col-form-label">Email:</label>
                            <div className="col-sm-10">
                                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" id="email" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="fullName" className="col-sm-2 col-form-label">Full name:</label>
                            <div className="col-sm-10">
                                <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} className="form-control" id="fullName" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="password" className="col-sm-2 col-form-label">Password:</label>
                            <div className="col-sm-10">
                                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="form-control" id="password" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label htmlFor="phoneNumber" className="col-sm-2 col-form-label">Phone:</label>
                            <div className="col-sm-10">
                                <input type="text" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="form-control" id="phoneNumber" />
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label htmlFor='roles' className="col-sm-2 col-form-label">Roles:</label>
                            <div className='col-sm-10'>
                                <Select
                                    id='roles'
                                    mode="multiple"
                                    size="large"
                                    allowClear
                                    style={{
                                        width: '100%',
                                    }}
                                    placeholder="Please select"
                                    onChange={handleChangeRoles}
                                    options={optionRoles}
                                    dropdownStyle={{ zIndex: 1000000000000 }}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Image:</label>
                            <div className="col-sm-10">
                                <Upload
                                    action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                                    listType="picture-card"
                                    fileList={photo}
                                    onPreview={handlePreview}
                                    onChange={handleChangeImage}
                                >
                                    {photo.length >= 1 ? null : uploadButton}
                                </Upload>
                                <ModalAntd
                                    open={previewOpen}
                                    title={previewTitle}
                                    footer={null}
                                    onCancel={handleCancel}
                                    zIndex={9999999999999999999}
                                >
                                    <img
                                        alt="example"
                                        style={{
                                            width: "100%",
                                        }}
                                        src={previewImage}
                                    />
                                </ModalAntd>
                            </div>
                        </div>
                        <div className='mb-3 row'>
                            <label className="col-sm-2 col-form-label">Status:</label>
                            <div className='col-sm-10'>
                                <Radio.Group
                                    options={statusOptions}
                                    onChange={handleChangeStatus}
                                    value={enabled}
                                    optionType="button"
                                    buttonStyle="solid"
                                    defaultValue={true}
                                />
                            </div>
                        </div>

                    </div>
                    <div className='col-4'>
                        <div>
                            <label className='form-label'>Permissions:</label>
                            <div className='mt-3 ms-3'>
                                <Checkbox.Group
                                    options={plainOptions}
                                    defaultValue={['Apple']}
                                    onChange={onChange5}
                                    className='d-flex flex-column gap-3'
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSaveChanges}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUser 
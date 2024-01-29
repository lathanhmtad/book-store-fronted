import { Button, Modal, Input, Form, Divider, Row, Col, Typography } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import FormUser from './FormUser';
import { resetIsCreateUserSuccess } from '../../../redux/slices/users/userSlice';

const ModalUser = (props) => {
    const [modal, contextHolder] = Modal.useModal();
    const [form] = Form.useForm();
    const dispatch = useDispatch()
    const { loading, isCreateUserSuccess } = useSelector(state => state.user)
    const { show, setShow } = props

    useEffect(() => {
        if (isCreateUserSuccess) {
            toast.success('Create user success!')
            setShow(false)
            form.resetFields()
            dispatch(resetIsCreateUserSuccess())
        }
    }, [isCreateUserSuccess])

    const showCloseConfirmation = () => {
        modal.confirm({
            title: 'Confirmation',
            content: 'Are you sure you want to close the modal?',
            onOk() {
                toast.dismiss()
                setShow(false);
                // form.resetFields();
            }
        })
    };

    return (
        <Modal
            width={1000}
            title={<Typography.Title level={4}>Add user</Typography.Title>}
            centered={true}
            closeIcon={false}
            open={show}
            okButtonProps={{ style: { display: 'none' } }}
            onCancel={showCloseConfirmation}
            destroyOnClose={true}
        >
            {contextHolder}
            <Divider />

            <FormUser />
        </Modal>
    );
};
export default ModalUser;
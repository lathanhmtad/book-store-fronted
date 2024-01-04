import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import roleService from '../../../services/roleService';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchRoles } from '../../../redux/slices/roleSlice';
import { ROLES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant';

const ModalDeleteRole = (props) => {
    const { show, setShow, idDelete, currentPage } = props
    const dispatch = useDispatch()

    const handleSave = async () => {
        const res = await roleService.deleteRole(idDelete)
        if (res && !res.errorCode) {
            dispatch(fetchRoles({ page: currentPage, limit: ROLES_MAX_ITEMS_PER_PAGE }))
            setShow(false)
            toast.success('Delete success!')
        }
    }

    return (
        <Modal show={show}>
            <Modal.Header>
                <Modal.Title>Xác nhận xóa</Modal.Title>
            </Modal.Header>
            <Modal.Body>Bạn có muốn xóa vai trò với id là {idDelete}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteRole
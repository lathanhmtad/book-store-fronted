import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchProducts } from '../../redux/slices/productSlice'
import { deleteProduct, fetchAllProducts } from '../../services/productService';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const ModalDeleteProduct = (props) => {
    const dispatch = useDispatch()

    const { show, setShowModalDeleteProduct, dataDelete } = props

    const handleSubmit = async () => {
        const res = await deleteProduct(dataDelete.id)
        toast.success('🦄 Xóa sản phẩm thành công');
        dispatch(fetchProducts())
    }

    return (
        <Modal show={show} onClick={() => setShowModalDeleteProduct(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Xóa sản phẩm</Modal.Title>
            </Modal.Header>
            <Modal.Body>Do you want delete product's name: {dataDelete?.name} ?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModalDeleteProduct(false)}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmit()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteProduct
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalProduct = (props) => {
    const { show, handleClose } = props

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            size='lg'
        >
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleClose()}>
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalProduct 
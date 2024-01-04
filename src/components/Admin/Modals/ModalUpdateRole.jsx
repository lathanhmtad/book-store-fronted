import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import roleService from '../../../services/roleService'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchRoles } from '../../../redux/slices/roleSlice'
import { ROLES_MAX_ITEMS_PER_PAGE } from '../../../utils/appConstant'
import _ from 'lodash'

const ModalUpdateRole = (props) => {
    const { show, setShow, dataUpdate, currentPage, setDataUpdate } = props
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const dispatch = useDispatch()

    const resetForm = () => {
        setName('')
        setDescription('')
    }

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name)
            setDescription(dataUpdate.description)
        }
    }, [dataUpdate])

    const handleSave = async () => {
        const id = toast.loading('Please wait....')
        const res = await roleService.updateRole({ id: dataUpdate.id, name, description })
        if (res && !res.errorCode) {
            dispatch(fetchRoles({ page: currentPage, limit: ROLES_MAX_ITEMS_PER_PAGE }))
            // toast.success(res.message)
            toast.update(id, { render: "Sửa thành công", type: "success", isLoading: false, autoClose: 3000, closeButton: true });
            setShow(false)
            resetForm()
        } else {
            // toast.error(res.message)
            toast.update(id, { render: res.message, type: "error", isLoading: false, autoClose: 3000, closeButton: true });
        }
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            centered
            scrollable={true}
            size='xl'
        >
            <Modal.Header>
                <Modal.Title>Chỉnh sửa vai trò</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-6'>
                        <div className='form-floating mb-3'>
                            <input type="text" value={dataUpdate.id} disabled={true}
                                className='form-control' id="id" placeholder="" autoComplete='off' />
                            <label htmlFor="id">Id</label>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className='form-floating mb-3'>
                            <input type="text" value={name} onChange={e => setName(e.target.value)}
                                className='form-control' id="name" placeholder="" autoComplete='off' />
                            <label htmlFor="name">Name</label>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className="form-floating mb-3">
                            <input type="text" value={description} onChange={e => setDescription(e.target.value)}
                                className='form-control' id="description" placeholder="" autoComplete='off' />
                            <label htmlFor="description">Description</label>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => { setShow(false); resetForm(); setDataUpdate({ id: '', name: '', description: '' }) }}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSave}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdateRole
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import _ from 'lodash'

import { IoMdAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";

const ModalRole = (props) => {
    const { show, setShow } = props

    const [roleFormItems, setRoleFormItems] = useState({
        first: {
            name: '',
            description: ''
        },
    })

    const handleOnChangeInput = (name, value, key) => {
        let _roleFormItems = _.cloneDeep(roleFormItems)
        _roleFormItems[key][name] = value
        setRoleFormItems(_roleFormItems)
    }

    const handleAddNewRoleForm = (position) => {
        let arrRoleFormItems = Object.entries(roleFormItems)
        arrRoleFormItems.splice(position + 1, 0, [`form-${uuidv4()}`, {
            name: '',
            description: ''
        }])
        const _roleFormItems = Object.fromEntries(arrRoleFormItems)
        setRoleFormItems(_roleFormItems)
    }

    const handleDeleteRoleForm = (key) => {
        let _roleFormItems = _.cloneDeep(roleFormItems)
        delete _roleFormItems[key]
        setRoleFormItems(_roleFormItems)
    }

    return (
        <Modal
            show={show}
            backdrop="static"
            centered
            scrollable={true}
            size='lg'
        >
            <Modal.Header>
                <Modal.Title>Add new roles</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    Object.entries(roleFormItems).map(([key, roleForm], index) => (
                        <div className='row' key={`key-${key}`}>
                            <div className='col-4'>
                                <div class="form-floating mb-3">
                                    <input type="text" value={roleForm.name} onChange={e => handleOnChangeInput('name', e.target.value, key)}
                                        class="form-control" id="name" placeholder="" autoComplete='off' />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div class="form-floating mb-3">
                                    <input type="text" value={roleForm.description} onChange={e => handleOnChangeInput('description', e.target.value, key)}
                                        class="form-control" id="description" placeholder="" autoComplete='off' />
                                    <label htmlFor="description">Description</label>
                                </div>
                            </div>
                            <div className='col-1 ps-0'>
                                <div className='d-flex align-items-center justify-content-center gap-2 mt-3'>
                                    <IoMdAddCircleOutline onClick={() => handleAddNewRoleForm(index)} className='text-primary fs-4 cursor-pointer' />
                                    {index >= 1 && <CiTrash onClick={() => handleDeleteRoleForm(key)} className='text-danger fs-4 cursor-pointer' />}
                                </div>
                            </div>
                        </div>
                    ))
                }

            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShow(false)}>
                    Close
                </Button>
                <Button variant="primary">
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalRole 
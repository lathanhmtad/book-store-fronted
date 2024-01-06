import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { Button as ButtonAntd } from 'antd';

import _ from 'lodash'

import { IoMdAddCircleOutline } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { toast } from 'react-toastify';

import roleService from '../../../services/roleService'

const ModalAddRole = (props) => {
    const [loading, setLoading] = useState(false)
    const { show, setShow, setCurrentPage } = props

    const defaultRoleForm = {
        name: '',
        description: '',
        isNameValid: true,
        isDescriptionValid: true
    }
    const [roleFormItems, setRoleFormItems] = useState({
        first: defaultRoleForm,
    })

    const resetForm = () => {
        setRoleFormItems({
            first: defaultRoleForm
        })
    }

    const handleOnChangeInput = (name, value, key) => {
        let _roleFormItems = _.cloneDeep(roleFormItems)
        _roleFormItems[key][name] = value
        if (value && name === 'name') {
            _roleFormItems[key]['isNameValid'] = true
        }
        if (value && name === 'description') {
            _roleFormItems[key]['isDescriptionValid'] = true
        }
        setRoleFormItems(_roleFormItems)
    }

    const handleAddNewRoleForm = (position) => {
        let arrRoleFormItems = Object.entries(roleFormItems)
        arrRoleFormItems.splice(position + 1, 0, [`form-${uuidv4()}`, defaultRoleForm])
        const _roleFormItems = Object.fromEntries(arrRoleFormItems)
        setRoleFormItems(_roleFormItems)
    }

    const handleDeleteRoleForm = (key) => {
        let _roleFormItems = _.cloneDeep(roleFormItems)
        delete _roleFormItems[key]
        setRoleFormItems(_roleFormItems)
    }

    const buildData = () => {
        let _roleFormItems = _.cloneDeep(roleFormItems)
        const result = Object.entries(_roleFormItems).map(([key, item]) => ({
            name: item.name,
            description: item.description
        }))

        return result
    }

    const handleSave = async () => {
        let invalidRoleForms = Object.entries(roleFormItems).filter(([, roleForm]) => roleForm && _.isEmpty(roleForm.name) || _.isEmpty(roleForm.description))

        // call api
        if (_.isEmpty(invalidRoleForms)) {
            setLoading(true)
            const data = buildData()
            const res = await roleService.addRoles(data)
            if (res && !res.errorCode) {
                toast.success("Create role success")
                setCurrentPage(1)
                props.fetchRoles()
                setShow(false)
                resetForm()
            } else {
                toast.error(res.message)
            }
            setLoading(false)
        }

        // handle error
        else {
            let _roleFormItems = _.cloneDeep(roleFormItems)
            invalidRoleForms.forEach(item => {
                const [key,] = item
                if (_.isEmpty(_roleFormItems[key].name)) {
                    _roleFormItems[key]['isNameValid'] = false
                }
                if (_.isEmpty(_roleFormItems[key].description)) {
                    _roleFormItems[key]['isDescriptionValid'] = false
                }
            })
            toast.error('Do not leave blank!')
            setRoleFormItems(_roleFormItems)
        }
    }

    const handleCloseModal = () => {
        setShow(false)
        resetForm()
        toast.dismiss()
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
                <Modal.Title>Tạo mới vai trò</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    Object.entries(roleFormItems).map(([key, roleForm], index) => (
                        <div className='row' key={`key-${key}`}>
                            <div className='col-4'>
                                <div className='form-floating mb-3'>
                                    <input type="text" value={roleForm.name} onChange={e => handleOnChangeInput('name', e.target.value, key)}
                                        className={`form-control ${roleForm.isNameValid ? '' : 'is-invalid'}`} id="name" placeholder="" autoComplete='off' />
                                    <label htmlFor="name">Name</label>
                                </div>
                            </div>
                            <div className='col-7'>
                                <div className="form-floating mb-3">
                                    <input type="text" value={roleForm.description} onChange={e => handleOnChangeInput('description', e.target.value, key)}
                                        className={`form-control ${roleForm.isDescriptionValid ? '' : 'is-invalid'}`} id="description" placeholder="" autoComplete='off' />
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
                <ButtonAntd type="default" size='large' loading={loading ? true : false} onClick={handleCloseModal}>
                    Close
                </ButtonAntd>
                <ButtonAntd type="primary" size='large' loading={loading ? true : false} onClick={handleSave}>
                    Save changes
                </ButtonAntd>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddRole 
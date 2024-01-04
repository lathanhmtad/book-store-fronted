import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

const ModalUser = (props) => {
    const [email, setEmail] = useState('')
    const [fullName, setFullName] = useState('')
    const [password, setPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [photo, setPhoto] = useState('')
    const [enabled, setEnabled] = useState(false)

    const { show, handleClose } = props


    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            centered
            size='xl'
        >
            <Modal.Header>
                <Modal.Title>Add user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className='row'>
                    <div className='col-6'>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="fullName" placeholder="" />
                            <label htmlFor="fullName">Full name</label>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="email" placeholder="" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder="" />
                            <label htmlFor="password">Password</label>
                        </div>
                    </div>
                    <div className='col-6'>
                        <div className="form-floating mb-3">
                            <input type="email" className="form-control" id="phoneNumber" placeholder="" />
                            <label htmlFor="phoneNumber">Phone number</label>
                        </div>
                    </div>
                    <div className='col-12'>
                        <div className='row align-items-center'>
                            <div className='col-6'>
                                <div className="mb-3">
                                    <label htmlFor="photo" className="form-label">Hình ảnh</label>
                                    <input className="form-control" type="file" id="photo" />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div style={{ borderStyle: 'dashed !important', height: '120px' }}
                                    className='border py-2 d-flex align-items-center justify-content-center'>
                                    {/* <img style={{ height: '100%', objectFit: 'contain' }}
                                        src='https://benhvienchamcuu.com/public/image/2021/06/28/1624888967_09217_ths-bao-pkyc-anh-vuongjpg.jpg' alt='user' /> */}
                                    <p className='mb-0'>Preview image</p>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className='col-6'>
                        <div className='d-flex align-items-center mt-3 gap-4'>
                            <label>Status</label>
                            <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked />
                                <label className="btn btn-outline-primary" htmlFor="btnradio1">Enabled</label>

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
                                <label className="btn btn-outline-primary" htmlFor="btnradio2">Disabled</label>
                            </div>
                        </div>
                    </div>

                    <div className='col-6'>
                        <div className='my-3'>
                            <label  className='mb-1'>Role</label>
                            <Form.Select>
                                <option>Select one role</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </Form.Select>
                        </div>
                    </div>
                </div>
            </Modal.Body>
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

export default ModalUser 
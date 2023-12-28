import { FaPlusCircle } from "react-icons/fa";
import TableUser from "../../components/Admin/Tables/TableUser";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ModalUser from "../../components/Admin/Modals/ModalUser"; 
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Users = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fs-1 fw-semibold">Users</h3>
                        <p className="fs-6 fst-normal">User management</p>
                    </div>
                    <Button
                        onClick={handleShow}
                        variant="primary"
                        className="d-flex align-items-center gap-2">
                        <FaPlusCircle />
                        Add user
                    </Button>
                </div>
                <TableUser />
                <ModalUser
                    show={show}
                    handleClose={handleClose}
                />
            </div>
            <Tabs
                defaultActiveKey="profile"
                id="uncontrolled-tab-example"
                className="mb-3"
            >
                <Tab eventKey="home" title="Home">
                    Tab content for Home
                </Tab>
                <Tab eventKey="profile" title="Profile">
                    Tab content for Profile
                </Tab>
                <Tab eventKey="contact" title="Contact" >
                    Tab content for Contact
                </Tab>
            </Tabs>
        </div>
    )
}

export default Users
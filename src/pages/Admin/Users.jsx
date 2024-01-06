import { FaPlusCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useState } from "react";

import TableUser from "../../components/Admin/Users/TableUser";
import ModalUser from "../../components/Admin/Users/ModalUser";

const Users = () => {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <span className="fs-2 fw-semibold">Users</span>
                    <p className="fs-6 fs-normal">Quản lý người dùng</p>
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
        </>

    )
}

export default Users
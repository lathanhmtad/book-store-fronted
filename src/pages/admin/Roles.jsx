import { FaPlusCircle } from "react-icons/fa";
import TableRole from "../../components/Admin/Tables/TableRole";
import ModalRole from '../../components/Admin/Modals/ModalRole'
import { useState } from "react";
const Roles = () => {
    const [openModal, setOpenModal] = useState(false)

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fs-1 fw-semibold">Roles</h3>
                        <p className="fs-6 fst-normal">Role management</p>
                    </div>
                    <button onClick={() => setOpenModal(true)} className="btn btn-primary d-flex align-items-center gap-2 btn">
                        <FaPlusCircle />
                        <span className="fw-semibold">Add roles</span>
                    </button>
                </div>
                <TableRole />
                <ModalRole 
                    show={openModal}
                    setShow={setOpenModal}
                />
            </div>
        </div>
    )
}

export default Roles
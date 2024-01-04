import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import TableRole from "../../components/Admin/Tables/TableRole";
import ModalAddRole from '../../components/Admin/Modals/ModalAddRole'
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import ModalUpdateRole from "../../components/Admin/Modals/ModalUpdateRole";
import ModalDeleteRole from "../../components/Admin/Modals/ModalDeleteRole";

const Roles = () => {
    const [openModalAdd, setOpenModalAdd] = useState(false)
    const [openModalUpdate, setOpenModalUpdate] = useState(false)
    const [openModalDelete, setOpenModalDelete] = useState(false)

    const [dataUpdate, setDataUpdate] = useState({})
    const [idDelete, setIdDelete] = useState(null)

    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = useSelector(state => state.role.totalPages)

    const handleOpenModalUpdate = (dataUpdate) => {
        setOpenModalUpdate(true)
        setDataUpdate(dataUpdate)
    }

    const handleOpenModalDelete = (idDelete) => {
        setOpenModalDelete(true)
        setIdDelete(idDelete)
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    return (
        <div className="container">
            <div className="py-4">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fs-1 fw-semibold">Roles</h3>
                        <p className="fs-6 fst-normal">Quản lý vai trò</p>
                    </div>
                    <button onClick={() => setOpenModalAdd(true)} className="btn btn-primary d-flex align-items-center gap-2 btn">
                        <FaPlusCircle />
                        <span className="fw-semibold">Thêm mới</span>
                    </button>
                </div>
                <TableRole
                    currentPage={currentPage}
                    handleOpenModalUpdate={handleOpenModalUpdate}
                    handleOpenModalDelete={handleOpenModalDelete}
                />

                <div className="d-flex justify-content-end mt-5">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                        forcePage={currentPage - 1}
                    />
                </div>

                <ModalAddRole
                    show={openModalAdd}
                    setShow={setOpenModalAdd}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateRole
                    show={openModalUpdate}
                    setShow={setOpenModalUpdate}
                    currentPage={currentPage}
                    dataUpdate={dataUpdate}
                    setDataUpdate={setDataUpdate}
                />
                <ModalDeleteRole
                    show={openModalDelete}
                    setShow={setOpenModalDelete}
                    idDelete={idDelete}
                    currentPage={currentPage}
                />
            </div>
        </div>
    )
}

export default Roles
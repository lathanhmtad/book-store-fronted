import { useEffect, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import ReactPaginate from "react-paginate";
import TableRole from "../../components/Admin/Roles/TableRole";
import ModalAddRole from '../../components/Admin/Roles/ModalAddRole'
import roleService from "../../services/roleService";
import { ROLES_MAX_ITEMS_PER_PAGE } from "../../utils/appConstant";

const Roles = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [showModalAddRole, setShowModalAddRole] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        handleFetchRoles()
    }, [currentPage])

    const handleFetchRoles = async () => {
        setLoading(true)
        const res = await roleService.getRolesWithPagination(currentPage, ROLES_MAX_ITEMS_PER_PAGE)
        if (res && res.data) {
            setTotalPages(res.totalPages)
            setData(res.data)
        }
        setLoading(false)
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

    return (
        <>
            <div className="d-flex align-items-center justify-content-between">
                <div>
                    <span className="fs-2 fw-semibold">Roles</span>
                    <p className="fs-6 fst-normal">Quản lý vai trò</p>
                </div>
                <button onClick={() => setShowModalAddRole(true)} className="btn btn-primary d-flex align-items-center gap-2 btn">
                    <FaPlusCircle />
                    <span className="fw-semibold">Thêm mới</span>
                </button>
            </div>
            <TableRole
                data={data}
                currentPage={currentPage}
                loading={loading}
                fetchRoles={handleFetchRoles}
                setCurrentPage={setCurrentPage}
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
                show={showModalAddRole}
                setShow={setShowModalAddRole}
                fetchRoles={handleFetchRoles}
                setCurrentPage={setCurrentPage}
            />
        </>
    )
}

export default Roles
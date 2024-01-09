import { FaPlusCircle } from "react-icons/fa";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

import ReactPaginate from "react-paginate"

import TableUser from "../../components/Admin/Users/TableUser";
import ModalUser from "../../components/Admin/Users/ModalUser";

import userService from "../../services/userService";
import { USERS_MAX_ITEMS_PER_PAGE } from "../../utils/appConstant";
import ModalUserDetails from "../../components/Admin/Users/ModalUserDetails";

const Users = () => {
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [showModalUserDetails, setShowModalUserDetails] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [data, setData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [userId, setUserId] = useState('')

    useEffect(() => {
        handleFetchUser()
    }, [currentPage])

    const handleFetchUser = async () => {
        setLoading(true)
        const res = await userService.getUsersWithPagination(currentPage, USERS_MAX_ITEMS_PER_PAGE)
        if (res && res.data) {
            setData(res.data)
            setTotalPages(res.totalPages)
        }

        setLoading(false)
    }

    const handleClose = () => {
        setShow(false)
        setUserDetails({})
    };
    const handleShow = () => setShow(true);

    const handleShowModalUserDetails = (id) => {
        setShowModalUserDetails(true)
        setUserId(id)
    }

    const handlePageClick = (event) => {
        setCurrentPage(+event.selected + 1)
    }

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
            <TableUser
                data={data}
                loading={loading}
                fetchUsers={handleFetchUser}
                handleShowModalUserDetails={handleShowModalUserDetails}
            />
            <div className="d-flex justify-content-end align-items-center mt-5">
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
            <ModalUser
                show={show}
                handleClose={handleClose}
                fetchUsers={handleFetchUser}
                setCurrentPage={setCurrentPage}
                userDetails={userDetails}
            />
            <ModalUserDetails 
                show={showModalUserDetails}
                setShow={setShowModalUserDetails}
                userId={userId}
            />
        </>

    )
}

export default Users
import { FaPlusCircle } from "react-icons/fa";
import TableProduct from "../../components/Admin/TableProduct";
import ModalProduct from '../../components/Admin/ModalProduct'
import { useState } from "react";
import ModalDeleteProduct from "../../components/Admin/ModalDeleteProduct";
const Products = () => {
    const [showModalProduct, setShowModalProduct] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [dataDelete, setDataDelete] = useState(null)
    const [showModalDeleteProduct, setShowModalDeleteProduct] = useState(false)
    const [forcePageZero, setForcePageZero] = useState(null)

    const handleClickBtnUpdate = (book) => {
        setShowModalProduct(true)
        setDataUpdate(book)
    }

    const handleClickBtnDelete = (id, name) => {
        setShowModalDeleteProduct(true)
        setDataDelete({
            id,
            name
        })
    }

    return (
        <div className="container">
            <div className="py-5">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fs-1 fw-semibold">Books</h3>
                        <p className="fs-6 fst-normal">Book management</p>
                    </div>
                    <button onClick={() => setShowModalProduct(true)} className="btn btn-primary d-flex align-items-center gap-2 btn">
                        <FaPlusCircle />
                        <span className="fw-semibold">Add book</span>
                    </button>
                </div>
                <TableProduct
                    handleClickBtnUpdate={handleClickBtnUpdate}
                    handleClickBtnDelete={handleClickBtnDelete}
                    forcePageZero={forcePageZero}
                />
                <ModalProduct
                    show={showModalProduct}
                    setShowModalProduct={setShowModalProduct}
                    dataUpdate={dataUpdate}
                    setForcePageZero={setForcePageZero}
                    setDataUpdate={setDataUpdate}
                />
                <ModalDeleteProduct
                    show={showModalDeleteProduct}
                    setShowModalDeleteProduct={setShowModalDeleteProduct}
                    dataDelete={dataDelete}
                />
            </div>
        </div>
    )
}

export default Products
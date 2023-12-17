import { FaPlusCircle } from "react-icons/fa";
import TableProduct from "../../components/Admin/TableProduct";
import ModalProduct from '../../components/Admin/ModalProduct'
const Products = () => {
    return (
        <div className="container">
            <div className="py-5">
                <div className="d-flex align-items-center justify-content-between">
                    <div>
                        <h3 className="fs-1 fw-semibold">Books</h3>
                        <p className="fs-6 fst-normal">Book management</p>
                    </div>
                    <button className="btn btn-primary d-flex align-items-center gap-2 btn">
                        <FaPlusCircle />
                        <span className="fw-semibold">Add book</span>
                    </button>
                </div>
                <TableProduct />
                <ModalProduct />
            </div>
        </div>
    )
}

export default Products
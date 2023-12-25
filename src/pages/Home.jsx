import Hero from "../components/Hero"
import Categories from "../components/Categories"
import Product from "../components/Product"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchProductsWithPagination } from '../redux/slices/productSlice'
import ReactPaginate from "react-paginate"

const Home = () => {
    const LIMIT = 6
    const dispatch = useDispatch()
    const products = useSelector(state => state.product.products)
    const [currentPage, setCurrentPage] = useState(1)
    const size = useSelector(state => state.product.size)

    useEffect(() => {
        dispatch(fetchProductsWithPagination({ page: 1, limit: LIMIT }))
    }, [])

    const handlePageClick = (page) => {
        setCurrentPage(page.selected + 1)
        dispatch(fetchProductsWithPagination({ page: +page.selected + 1, limit: LIMIT }))
    }
    return (
        <div>
            <Hero />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className="mb-3 fs-3">Danh mục sản phẩm</h2>
                        <Categories
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                    <div className="col-9">
                        <div className="d-flex mb-3 align-items-center justify-content-between">
                            <h2 className="fs-3">Tất cả sản phẩm</h2>
                            <form className="d-flex" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                    <button className="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div>
                        <div className="row row-gap-4">
                            {products.map(product => <Product key={product.id} product={product} />)}
                        </div>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-end my-4">
                    <ReactPaginate
                        nextLabel="next >"
                        onPageChange={handlePageClick}
                        pageRangeDisplayed={3}
                        marginPagesDisplayed={2}
                        pageCount={Math.ceil(size / LIMIT) ? Math.ceil(size / LIMIT) : 1}
                        previousLabel="< previous"
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        previousLinkClassName="page-link"
                        nextClassName="page-item"
                        nextLinkClassName="page-link"
                        breakLabel="..."
                        forcePage={currentPage - 1}
                        breakClassName="page-item"
                        breakLinkClassName="page-link"
                        containerClassName="pagination"
                        activeClassName="active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            </div>
        </div >
    )
}

export default Home
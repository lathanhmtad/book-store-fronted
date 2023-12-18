import Hero from "../components/Hero"
import Categories from "../components/Categories"
import Product from "../components/Product"
import { useEffect, useState } from "react"
import {fetchAllProducts} from '../services/productService'

const Home = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    }, [])

    const getAllProducts = async () => {
        const res = await fetchAllProducts()
        setProducts(res)
    }


    return (
        <div>
            <Hero />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className="mb-3 fs-3">Danh mục sản phẩm</h2>
                        <Categories />
                    </div>
                    <div className="col-9">
                        <h2 className="mb-3 fs-3">Tất cả sản phẩm</h2>
                        <div className="row row-gap-4">
                            {products.map(product => <Product key={product.id} product={product} />)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
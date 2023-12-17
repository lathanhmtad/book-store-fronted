import Hero from "../components/Hero"
import Categories from "../components/Categories"
import Product from "../components/Product"

const Home = () => {
    return (
        <div>
            <Hero />
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        <h2 className="mb-3">Categories</h2>
                        <Categories />
                    </div>
                    <div className="col-9">
                        <h2 className="mb-3">Products</h2>
                        <div className="row row-gap-4">
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                            <Product />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/productService"
import formattedPrice from '../utils/formatPrice'
import { useSelector } from "react-redux"

const ProductDetail = () => {
    const [product, setProduct] = useState({})

    const categories = useSelector(state => state.category.categories)

    const { id } = useParams()

    useEffect(() => {
        window.scrollTo(0, 0);
        findProductById()
    }, [])

    const findProductById = async () => {
        const res = await getProductById(id)
        setProduct(res)
    }

    const { name, description, price, amount, author, categoryId, image } = product

    const category = categories.find(category => category.id === categoryId)

    return (
        <div className="product-details-container d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <img src={image} alt="image" />
                    </div>
                    <div className="col-1"></div>
                    <div className="col-6">
                        {/* text */}
                        <div className='text-left'>
                            <h1 className='fs-1 mb-3 fw-semibold'>{name}</h1>
                            <div className="fs-4"><span className="fw-medium">Author:</span> {author}</div>
                            <div className='fs-5 mt-3'><span className="fw-medium">Thể loại: </span> {category?.name}</div>
                            <div className='fs-5 mt-3'><span className="fw-medium">Description: </span> {description}</div>
                            <div className='fs-5 mt-3'><span className="fw-medium">Price: </span> {formattedPrice(price)} </div>
                            <div className='fs-5 mt-3'><span className="fw-medium">Amount: </span> {amount} </div>
                            <button onClick={() => { console.log('add to cart') }} className='btn btn-primary mt-3'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
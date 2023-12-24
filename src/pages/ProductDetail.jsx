import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { getProductById } from "../services/productService"

const ProductDetail = () => {
    const [product, setProduct] = useState({})

    const { id } = useParams()

    useEffect(() => {
        findProductById()
    }, [])

    const findProductById = async () => {
        const res = await getProductById(id)
        setProduct(res)
    }

    const { id: idP, name, description, price, amount, author, categoryId, image } = product

    console.log(product)

    return (
        <div className="product-details-container d-flex align-items-center">
            <div className="container">
                <div className="row">
                    <div className="col-5">
                        <img src={image} alt="image" />
                    </div>
                    <div className="col-7">
                        {/* text */}
                        <div className='flex-1 text-center lg:text-left'>
                            <h1 className='text-[26px] font-medium mb-2 max-w-[450px] mx-auto'>{name}</h1>
                            <div className='text-xl text-red-500 font-medium mb-6'>$ {price}</div>
                            <p className='mb-8'>{description}</p>
                            <button onClick={() => { console.log('add to cart') }} className='bg-primary py-4 px-8 text-white'>Add to cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
import { Link } from "react-router-dom"
import formattedPrice from "../utils/formatPrice"
import { addToCart } from '../redux/slices/cartSlice'
import { useDispatch, useSelector } from "react-redux"
import _ from 'lodash'
import * as cartService from '../services/cartService'
import { toast } from "react-toastify"

const Product = (props) => {
    const product = props.product

    const user = useSelector(state => state.user.user)

    const dispatch = useDispatch()

    const { id, name, image, price } = product

    const handleAddToCart = async () => {

        const res = await cartService.addToCart(product, user.id)
        console.log(res)

        if (!_.isEmpty(user)) {
            dispatch(addToCart(product))
            toast.success('Đã thêm sản phẩm vào giỏ hàng')
        }
        else {
            toast.warning('Vui lòng đăng nhập để sử dụng tính năng!')
        }
    }

    return (
        <div className="col-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src={image} className="card-img-top" style={{ maxHeight: '160px', objectFit: "contain" }} alt="photo" />
                <div className="card-body">
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">Giá: {formattedPrice(price)}</p>
                    <div className="d-flex align-items-center gap-3">
                        <Link to={`/product/${id}`} className="btn btn-warning">
                            View Details
                        </Link>
                        <button onClick={handleAddToCart} className="btn btn-primary">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Product
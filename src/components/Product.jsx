import { Link } from "react-router-dom"
import formattedPrice from "../utils/formatPrice"

const Product = (props) => {
    const product = props.product

    const {id, name, image, price } = product

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
                        <button className="btn btn-primary">
                            Add to cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product
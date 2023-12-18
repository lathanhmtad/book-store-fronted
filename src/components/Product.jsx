import { Link } from "react-router-dom"

const Product = (props) => {
    const product = props.product

    const {id, name, description, image} = product

    return (
        <div className="col-4">
            <div className="card" style={{ width: "18rem" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <Link to='/' className="btn btn-primary">
                        Go awesome
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Product
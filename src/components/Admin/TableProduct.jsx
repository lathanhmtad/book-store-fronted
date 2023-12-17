import { useState } from 'react'
import {fetchAllProducts} from '../../services/productService'
import { useEffect } from 'react'

const TableProduct = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        getAllProducts()
    })

    const getAllProducts = async () => {
        const res = await fetchAllProducts()
        setProducts(res)
    }

    return (
        <div>
            <table class="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td colspan="2">Larry the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default TableProduct
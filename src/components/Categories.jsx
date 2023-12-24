import { useEffect } from "react"
import { useState } from "react"
import { fetchAllCategories } from '../services/categoryService'
import { useDispatch, useSelector } from "react-redux"
import { fetchBooksByIdCategory, fetchProducts, fetchProductsWithPagination } from "../redux/slices/productSlice"
import { fetchCategories } from "../redux/slices/categorySlice"

const Categories = (props) => {
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);
    const categories = useSelector(state => state.category.categories)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategories())
    }, [])


    const findBooksByCategory = async (id) => {
        if (id) {
            setSelectedCategoryId(id)
            dispatch(fetchBooksByIdCategory(id))
        }
        else {
            setSelectedCategoryId(null)
            dispatch(fetchProductsWithPagination({ page: 1, limit: 6 }))
        }
        props.setCurrentPage(1)
    }

    return (
        <ul className="list-group cursor-pointer">
            <li onClick={() => findBooksByCategory()} className={`list-group-item ${selectedCategoryId === null ? 'active' : ''}`}>Tất cả</li>
            {categories.map(category => (
                <li onClick={() => findBooksByCategory(category.id)} key={category.id}
                    className={`list-group-item ${selectedCategoryId === category.id ? 'active' : ''}`}>{category.name}</li>
            ))}
        </ul>
    )
}

export default Categories
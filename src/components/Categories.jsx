import { useEffect } from "react"
import { useState } from "react"
import { fetchAllCategories } from '../services/categoryService'

const Categories = () => {
    const [categories, setCategories] = useState([])

    useEffect(() => {
        getAllCategories()
    })

    const getAllCategories = async () => {
        const res = await fetchAllCategories()
        setCategories(res)
    }

    return (
        <ul className="list-group">
            <li className="list-group-item active">Tất cả</li>
            {categories.map(category => (
                <li key={category.id} className="list-group-item">{category.name}</li>
            ))}
        </ul>
    )
}

export default Categories
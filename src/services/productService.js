import axios from '../util/customizeAxios'

export const fetchAllProducts = () => {
    return axios.get('/books')
}

export const addProduct = (data) => {
    return axios.post('/add-book', data)
}

export const deleteProduct = (id) => {
    return axios.delete(`deleteBook/${id}`)
}

export const editProduct = (book) => {
    return axios.put(`updateBook/${book.id}`, book)
}
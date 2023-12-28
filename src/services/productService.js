import axios from '../utils/customizeAxios'

export const fetchAllProducts = () => {
    return axios.get('/books')
}

export const productsPagination = (page, limit) => {
    return axios.get(`/pagination?page=${page}&pagesize=${limit}`)
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

export const fetchBooksByCategoryId = (id) => {
    return axios.get(`find-books-by-categoryId/${id}`)
}

export const getProductById = id => {
    return axios.get(`book-detail/${id}`)
}

export const searchBooks = data => {
    return axios.get(`/search?keyword=${data}`)
}
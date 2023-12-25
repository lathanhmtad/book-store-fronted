import axios from "../utils/customizeAxios";

export const addToCart = (data, customerId) => {
    return axios.post('/add-to-cart', {
        bookName: data.name,
        author: data.author,
        price: data.price,
        amount: data.amount,
        bookId: data.id,
        customerId: `${customerId}`,
        totalPrice: data.price,
        totalQuantity: 1
    })
}
import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    isOpenSidebarCart: false,
    itemAmount: 0,
    cartItems: [],
    total: 0
}

export const cartSlice = createSlice({
    name: 'cartSlice',
    initialState,
    reducers: {
        setIsOpenSidebarCart: (state, action) => {
            state.isOpenSidebarCart = action.payload
        },
        setTotal: (state) => {
            state.total = state.cartItems.reduce((accumulator, currentItem) => accumulator + currentItem.price * currentItem.amount, 0)
        },
        addToCart: (state, action) => {
            const newItem = { ...action.payload, amount: 1 }

            // check if the item is already in the cart
            const cartItem = state.cartItems.find(item => {
                return item.id === action.payload.id
            })


            // if cart item is already in the cart
            if (cartItem) {
                const newCart = [...state.cartItems].map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, amount: cartItem.amount + 1 }
                    }
                    else {
                        return item
                    }
                })
                state.cartItems = newCart
            } else {
                state.cartItems = [
                    ...state.cartItems,
                    newItem
                ]
            }
        },
        removeFromCart: (state, action) => {
            const newCart = state.cartItems.filter(item => {
                return item.id !== action.payload
            })
            state.cartItems = newCart
        },
        clearCart: (state) => {
            state.cartItems = []
            state.total = 0
        },
        decreaseAmount: (state, action) => {
            const cartItem = state.cartItems.find(item => item.id === action.payload.id)
            if (cartItem) {
                console.log(cartItem)
                const newCart = state.cartItems.map(item => {
                    if (item.id === action.payload.id) {
                        return { ...item, amount: cartItem.amount - 1 }
                    }
                    else {
                        return item
                    }
                })
                state.cartItems = newCart
            }
            if (cartItem.amount < 2) {
                const newCart = state.cartItems.filter(item => {
                    return item.id !== cartItem.id
                })
                state.cartItems = newCart
            }
        }
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
    },
})

// Action creators are generated for each case reducer function
export const { setIsOpenSidebarCart, addToCart, setTotal, removeFromCart, clearCart, decreaseAmount } = cartSlice.actions

export default cartSlice.reducer
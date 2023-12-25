import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import CartItem from './CartItem'
import { useDispatch, useSelector } from "react-redux";
import { clearCart, setIsOpenSidebarCart, setTotal } from "../redux/slices/cartSlice";
import formattedPrice from "../utils/formatPrice";
import { useEffect } from "react";
import { toast } from "react-toastify";

const SidebarCart = () => {
    const isOpen = useSelector(state => state.cart.isOpenSidebarCart)
    const dispatch = useDispatch()
    const total = useSelector(state => state.cart.total)
    const cartItems = useSelector(state => state.cart.cartItems)

    useEffect(() => {
        dispatch(setTotal())
    }, [cartItems])


    return (
        <div className={`sidebar-cart-container bg-white position-fixed top-0 ${isOpen ? 'end-0' : ''} shadow-lg transition-all transition-300 z-20`}>
            <div className='d-flex align-items-center justify-content-between py-4 border-bottom'>
                <div className='fw-medium'>SHOPPING BAG ({cartItems.length}) </div>
                {/* icon */}
                <div onClick={() => dispatch(setIsOpenSidebarCart(false))} className='cursor-pointer'>
                    <FaArrowRight />
                </div>
            </div>
            <div className="cart-item-container d-flex flex-column border-bottom">
                {cartItems.map(cartItem => (
                    <CartItem key={cartItem.id} data={cartItem} />
                ))}
            </div>

            {/* total */}
            <div className='d-flex w-100 justify-content-between align-items-center mt-3'>
                {/* total */}
                <div className='fs-5'>
                    Total: <span className='mr-2 fw-semibold'>{formattedPrice(total)}</span>
                </div>
                {/* clear cart icon */}
                <button onClick={() => {
                    dispatch(clearCart())
                    toast.success('Đã xóa tất cả sản phẩm khỏi giỏ hàng!')
                }} className='cursor-pointer d-flex justify-content-center align-items-center py-2 btn btn-danger'>
                    <FaRegTrashAlt />
                </button>
            </div>
        </div>
    )
}

export default SidebarCart  
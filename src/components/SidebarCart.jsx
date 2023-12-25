import { FaArrowRight } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import CartItem from './CartItem'
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSidebarCart } from "../redux/slices/cartSlice";

const SidebarCart = () => {
    const isOpen = useSelector(state => state.cart.isOpenSidebarCart)
    const itemAmount = useSelector(state => state.cart.itemAmount)
    const dispatch = useDispatch()

    return (
        <div className={`sidebar-cart-container bg-white position-fixed top-0 ${isOpen ? 'end-0' : ''} shadow-lg transition-all transition-300 z-20`}>
            <div className='d-flex align-items-center justify-content-between py-4 border-bottom'>
                <div className='fw-medium'>SHOPPING BAG ({itemAmount}) </div>
                {/* icon */}
                <div onClick={() => dispatch(setIsOpenSidebarCart(false))} className='cursor-pointer'>
                    <FaArrowRight />
                </div>
            </div>
            <div className="cart-item-container d-flex flex-column border-bottom">
                <CartItem />
                {/* <CartItem />
                <CartItem />
                <CartItem /> */}
            </div>

            {/* total */}
            <div className='d-flex w-100 justify-content-between align-items-center mt-3'>
                {/* total */}
                <div className='fw-semibold'>
                    <span className='mr-2'>Total:</span>$ {parseFloat(4).toFixed(2)}
                </div>
                {/* clear cart icon */}
                <div onClick={() => { console.log('clear cart') }} className='cursor-pointer d-flex justify-content-center align-items-center'>
                    <FaRegTrashAlt />
                </div>
            </div>
        </div>
    )
}

export default SidebarCart  
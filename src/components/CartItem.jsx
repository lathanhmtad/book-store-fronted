import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'
import formattedPrice from '../utils/formatPrice'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, decreaseAmount, removeFromCart } from '../redux/slices/cartSlice'
import { toast } from 'react-toastify'

const CartItem = (props) => {
    const { id, name, amount, price, image } = props.data

    const dispatch = useDispatch()


    const handleRemoveCartItem = () => {
        dispatch(removeFromCart(id))
        toast.success(`Đã xóa sản phẩm ${name} ra khỏi giỏ hàng`)
    }

    return (
        <div className='cart-item border-bottom'>
            <div className='cart-content w-100 d-flex align-items-center'>
                {/* image */}
                <div>
                    <img className='' alt='' src={image} />
                </div>
                <div className='w-100 d-flex flex-column ps-4 pe-3'>
                    <div className='d-flex justify-content-between mb-2 align-items-center'>
                        <span className='fs-6 fw-medium max-w-[240px] text-black'>{name}
                        </span>
                        <div onClick={handleRemoveCartItem} className='cursor-pointer fw-bold fs-4'>
                            <IoMdClose className='' />
                        </div>
                    </div>
                    <div className='d-flex w-full justify-content-between'>
                        <div className='d-flex max-w-[100px] align-items-center text-black fw-medium border p-1'>
                            <div onClick={() => dispatch(decreaseAmount(props.data))} className='d-flex justify-content-center align-items-center cursor-pointer'>
                                <IoMdRemove />
                            </div>
                            <div className='d-flex justify-center align-items-center px-2'>{amount}</div>
                            <div onClick={() => dispatch(addToCart(props.data))} className='d-flex justify-content-center align-items-center cursor-pointer'>
                                <IoMdAdd />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around' style={{ fontSize: '14px' }}>{formattedPrice(price)}</div>
                        <div className='d-flex justify-content-end align-items-center text-black fw-medium fs-6'>{formattedPrice(price * amount)}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
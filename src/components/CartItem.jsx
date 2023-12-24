import { IoMdClose, IoMdRemove, IoMdAdd } from 'react-icons/io'
import { Link } from 'react-router-dom'

const CartItem = (props) => {
    return (
        <div className='cart-item border-bottom'>
            <div className='cart-content w-100 d-flex align-items-center'>
                {/* image */}
                <div>
                    <img className='' alt='' src='https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg' />
                </div>
                <div className='w-100 d-flex flex-column ps-4 pe-3'>
                    <div className='d-flex justify-content-between mb-2'>
                        <span className='fs-6 fw-medium max-w-[240px] text-black'>Áo xịn xò
                        </span>
                        <div onClick={() => { console.log('remove from cart') }} className='cursor-pointer fw-bold fs-4'>
                            <IoMdClose className='' />
                        </div>
                    </div>
                    <div className='d-flex w-full justify-content-between'>
                        <div className='d-flex max-w-[100px] align-items-center text-black fw-medium border p-1'>
                            <div onClick={() => { console.log('decrease') }} className='d-flex justify-content-center align-items-center cursor-pointer'>
                                <IoMdRemove />
                            </div>
                            <div className='d-flex justify-center align-items-center px-2'>41</div>
                            <div onClick={() => { console.log('incle') }} className='d-flex justify-content-center align-items-center cursor-pointer'>
                                <IoMdAdd />
                            </div>
                        </div>
                        <div className='d-flex align-items-center justify-content-around'>$ 412</div>
                        <div className='d-flex justify-content-end align-items-center text-black fw-medium'>{`$ ${parseFloat(12512).toFixed(2)}`}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartItem
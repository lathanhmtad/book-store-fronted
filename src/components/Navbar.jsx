import React, { useState } from "react";
import { Link } from "react-router-dom"
import { FaBook } from "react-icons/fa";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpenSidebarCart } from "../redux/slices/cartSlice";

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)
    const dispatch = useDispatch()

    const itemAmount = useSelector(state => state.cart.itemAmount)

    useEffect(() => {
        window.addEventListener('scroll', () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false)
        })
    })

    return (
        <nav className={`navbar ${isActive ? 'active py-3' : 'bg-transparent py-4'} position-fixed end-0 start-0 transition-all`}>
            <div className="container">
                <Link className="navbar-brand d-flex gap-2 align-items-center" to='/'>
                    <FaBook className="fs-2 text-primary" />
                    <span className="fs-3 fw-medium">BookStore</span>
                </Link>

                <div className="d-flex align-items-center gap-3 d-none">
                    <Link to='register' className="btn btn-outline-primary">Register</Link>
                    <Link to='login' className="btn btn-success">Login</Link>
                </div>

                {/* cart */}
                <div onClick={() => dispatch(setIsOpenSidebarCart(true))} className='cursor-pointer d-flex position-relative'>
                    <IoCartOutline className='fs-3' />
                    <div className='cart-item-amount bg-danger position-absolute fs-6 text-white d-flex justify-content-center align-items-center'>
                        {itemAmount}
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
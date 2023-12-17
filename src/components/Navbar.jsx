import React, { useState } from "react";
import { Link } from "react-router-dom"
import { FaBook } from "react-icons/fa";
import { useEffect } from "react";
// import { BsBag } from 'react-icons/bs'

const Navbar = () => {
    const [isActive, setIsActive] = useState(false)

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

                <div className="d-flex align-items-center gap-3">
                    <button type="button" className="btn btn-outline-primary">Register</button>
                    <button type="button" className="btn btn-success">Login</button>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
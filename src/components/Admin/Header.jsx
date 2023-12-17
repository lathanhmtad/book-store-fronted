import React from "react";
import { Link } from "react-router-dom"
import { FaBook } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

const Header = () => {

    return (
        <nav className='navbar shadow-sm transition-all'>
            <div className="container">
                <Link className="navbar-brand d-flex gap-2 align-items-center" to='/'>
                    <FaBook className="fs-2 text-primary" />
                    <span className="fs-3 fw-medium">BookStore</span>
                </Link>

                <button type="button" className="btn btn-outline-success d-flex align-items-center gap-2">
                    <BiLogOut />
                    <span>Logout</span>
                </button>
            </div>
        </nav>
    )
}

export default Header
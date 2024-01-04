import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { FaBook } from "react-icons/fa";

const Header = () => {

    const navigate = useNavigate()

    return (
        <nav className='navbar shadow-sm transition-all'>
            <div className="container">
                <Link className="navbar-brand d-flex gap-2 align-items-center" to='/'>
                    <FaBook className="fs-2 text-primary" />
                    <span className="fs-3 fw-medium">BookStore</span>
                </Link>

                {/* <button type="button" className="btn btn-outline-success d-flex align-items-center gap-2">
                    <BiLogOut />
                    <span>Logout</span>
                </button> */}
                <div className="d-flex gap-3 align-items-center">
                    <button onClick={() => navigate('/login')} type="button" className="btn btn-primary d-flex align-items-center gap-2">
                        <span>Login</span>
                    </button>
                    <button onClick={() => navigate('/register')} type="button" className="btn btn-outline-success d-flex align-items-center gap-2">
                        <span>Register</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header
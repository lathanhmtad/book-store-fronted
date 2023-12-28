import React from "react";
import { Link, useNavigate } from "react-router-dom"
import { FaBook } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/slices/userSlice";

const Header = () => {

    const user = useSelector(state => state.user.user)
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    }
    return (
        <nav className='navbar shadow-sm transition-all'>
            <div className="container">
                <Link className="navbar-brand d-flex gap-2 align-items-center" to='/'>
                    <FaBook className="fs-2 text-primary" />
                    <span className="fs-3 fw-medium">BookStore</span>
                </Link>

                <div className="d-flex align-items-center gap-3">
                    <span>Xin chào: <span className="fw-medium">{user.username}</span></span>
                    <button onClick={handleLogout} type="button" className="btn btn-outline-success d-flex align-items-center gap-2">
                        <BiLogOut />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    )
}

export default Header
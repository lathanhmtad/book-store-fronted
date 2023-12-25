import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { register } from '../services/authService'

const Register = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (password !== confirmPassword) {
            toast.error('Mật khẩu nhập lại không chính xác!')
            return
        }

        const res = await register(username, password)
        toast.success("Register successfully!")
        navigate('/login')
    }

    return (
        <div className="login-container d-flex flex-column justify-content-center">
            <h1 className="fs-2 mb-4 text-center">Đăng ký</h1>

            <div className="form-floating mb-3">
                <input type="email" className="form-control"
                    onChange={e => setUsername(e.target.value)} value={username} id="email" placeholder="" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" value={password}
                    onChange={e => setPassword(e.target.value)} id="password" placeholder="" />
                <label htmlFor="password">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)} id="confirmPassword" placeholder="" />
                <label htmlFor="confirmPassword">Confirm Password</label>
            </div>

            <div className="mt-3">
                <button onClick={handleSubmit} className="w-100 btn btn-primary">Register</button>
            </div>
            <p className="fs-6 mt-3">Bạn đã có tài khoản ? <Link to='/login'>Đăng nhập</Link></p>
        </div>
    )
}

export default Register 
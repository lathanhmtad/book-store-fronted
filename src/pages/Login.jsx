import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { loginSuccess } from '../redux/slices/userSlice'
import { toast } from "react-toastify"
import { login } from '../services/authService'
import _ from 'lodash'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = async () => {
        if (email.trim() === '' || password.trim() === '') {
            toast.error('Vui lòng nhập dữ liệu')
            return
        }
        const res = await login(email, password)
        if (!_.isEmpty(res)) {
            dispatch(loginSuccess(res))
            toast.success('Đăng nhập thành công!')
            navigate('/')
        }
        else {
            toast.error('Thông tin đăng nhập không chính xác!')
        }
    }

    return (
        <div className="login-container d-flex flex-column justify-content-center">
            <h1 className="fs-2 mb-4 text-center">Đăng nhập</h1>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="" />
                <label htmlFor="email">Email</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="" />
                <label htmlFor="password">Password</label>
            </div>

            <div className="mt-3">
                <button onClick={handleSubmit} className="w-100 btn btn-primary">Login</button>
            </div>
            <p className="fs-6 mt-3">Bạn chưa có tài khoản ? <Link to='/register'>Đăng ký</Link></p>
        </div>
    )
}

export default Login 
import { useState } from 'react';
import '../css/Auth.scss'
import { login } from '../services/userService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash'
import Alert from 'react-bootstrap/Alert';

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async () => {
        const id = toast.loading("Please wait...")
        const res = await login(email, password)
        if (res && res.accessToken) {
            toast.update(id, { render: "Đăng nhập thành công", type: "success", isLoading: false, autoClose: 3000, closeButton: true });
            localStorage.setItem('accessToken', res.accessToken)
            navigate('/')
        }
        else {
            toast.update(id, { render: `${res.message}`, type: "error", isLoading: false, autoClose: 5000, closeButton: true });
        }
    }

    return (
        <div className="container">
            <div className="auth-container d-flex flex-column justify-content-center mx-auto">
                <div className='mb-3'>
                    <h2 className='fs-2 text-center'>Login to BookStore</h2>
                </div>
                <div className="form-floating mb-3">
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="email" placeholder="" />
                    <label htmlFor="email">Email</label>
                </div>
                <div className="form-floating mb-3">
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="password" placeholder="" />
                    <label htmlFor="password">Password</label>
                </div>

                <button onClick={handleLogin} className='btn btn-success rounded-pill'>Login</button>
            </div>
        </div>
    )
}

export default Login;
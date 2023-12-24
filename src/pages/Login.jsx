import { Link } from "react-router-dom"

const Login = () => {
    return (
        <div className="login-container d-flex flex-column justify-content-center">
            <h1 className="fs-2 mb-4 text-center">Đăng nhập</h1>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="" />
                <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label for="floatingPassword">Password</label>
            </div>

            <div className="mt-3">
                <button className="w-100 btn btn-primary">Login</button>
            </div>
            <p className="fs-6 mt-3">Bạn chưa có tài khoản ? <Link to='/register'>Đăng ký</Link></p>
        </div>
    )
}

export default Login 
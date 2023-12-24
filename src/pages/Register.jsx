import { Link } from "react-router-dom"

const Register = () => {
    return (
        <div className="login-container d-flex flex-column justify-content-center">
            <h1 className="fs-2 mb-4 text-center">Đăng ký</h1>

            <div className="form-floating mb-3">
                <input type="email" className="form-control" id="floatingInput" placeholder="" />
                <label for="floatingInput">Email</label>
            </div>
            <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" placeholder="" />
                <label for="floatingInput">Username</label>
            </div>
            <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label for="floatingPassword">Password</label>
            </div>
            <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" placeholder="" />
                <label for="floatingPassword">Confirm Password</label>
            </div>

            <div className="mt-3">
                <button className="w-100 btn btn-primary">Register</button>
            </div>
            <p className="fs-6 mt-3">Bạn đã có tài khoản ? <Link to='/login'>Đăng nhập</Link></p>
        </div>
    )
}

export default Register 
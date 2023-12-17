import { Outlet } from 'react-router-dom'
import Header from '../components/Admin/Header'
import Sidebar from '../components/Admin/Sidebar'
import '../css/Admin.scss'

const Admin = () => {
    return (
        <div className='admin-app'>
            <Sidebar />
            <section className="section-content px-5">
                <Header />
                <Outlet />
            </section>
        </div>
    )
}

export default Admin
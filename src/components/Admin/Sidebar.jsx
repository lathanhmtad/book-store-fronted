import { NavLink } from "react-router-dom";
import { FaAudible, FaBars } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { PiUsersThree } from "react-icons/pi";
import { RiProductHuntLine } from "react-icons/ri";

const Sidebar = () => {

    const menus = [
        { title: 'Dashboard', link: '/admin', icon: <RxDashboard className="icon fs-5 text-white" />, },
        { title: 'Users', link: '/admin/users', icon: <PiUsersThree className="icon fs-5 text-white" />, },
        { title: 'Products', link: '/admin/products', icon: <RiProductHuntLine className="icon fs-5 text-white" />, }
    ]

    return (
        <div className="sidebar position-fixed top-0 start-0 bottom-0 py-2 px-3">
            <div className="logo-details d-flex align-items-center py-3 position-relative">
                <FaAudible className="icon fs-5 text-white" />
                <div className="text-white fs-4 fw-medium">Code Effect</div>
            </div>
            <ul className="nav-list ps-0 mt-3 mb-0 list-style-none">
                {menus.map((item, index) => (
                    <li key={index}>
                        <NavLink end to={item.link} className="d-flex link text-white transition-all align-items-center text-decoration-none position-relative py-3">
                            {item.icon}
                            <span className="link-name">{item.title}</span>
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
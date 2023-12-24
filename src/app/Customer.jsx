import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../css/Customer.scss'
import Footer from '../components/Footer';
import SidebarCart from '../components/SidebarCart'
const App = () => {
  return (
    <div className="customer-app">
      <Navbar />
      <SidebarCart />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../css/Customer.scss'
import Footer from '../components/Footer';
const App = () => {
  return (
    <div className="customer-app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;

import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'
import '../css/Customer.scss'
const App = () => {
  return (
    <div className="customer-app">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;

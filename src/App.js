import './App.css';
import { useEffect } from 'react';
import { useLocation, useNavigate, Route, Routes, Navigate } from 'react-router-dom';
import NewReleases from './components/new-releases/newReleases';
import Men from './components/men/men';
import Woman from './components/women/women';
import Menu from './components/menu/menu';
import Kids from './components/kids/kids';
import ShopAll from './components/shop-all/shopAll';
import BlackMenu from './components/black-menu/blackMenu';
import MainPage from './components/main-page/main-background/mainBackground';
import SignUp from './components/Users/signUp';
import SignIn from './components/Users/signIn';
import PasswordRecover from './components/Users/passwordRecover';
import ControlPanel from './components/admin-panel/controlPanel';
import Payment from './components/payment-processor/payment';
import TechnicalSupport from './components/technical-support/technicalSupport';
import Orders from './components/orders/orders';
import { AuthProvider } from './components/context/authContext';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackButton = () => {
      const isAuthenticated = localStorage.getItem('token') !== null;
      const isAdmin = localStorage.getItem('isAdmin') === 'true';

      if (location.pathname === '/signin' && isAuthenticated) {
        navigate(isAdmin ? '/control-panel' : '/');
        return;
      }

      if (location.pathname === '/' && isAdmin) {
        console.log('Admin trying to navigate back, logging out.');
        localStorage.removeItem('isAdmin');
        localStorage.removeItem('token');
        navigate('/signin');
      }
    };

    window.addEventListener('popstate', handleBackButton);

    return () => {
      window.removeEventListener('popstate', handleBackButton);
    };
  }, [location, navigate]);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('token') !== null;

    if (!isAuthenticated && location.pathname.startsWith('/control-panel')) {
      navigate('/signin');
    }
  }, [location, navigate]);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
      <Routes>
        <Route path="/" element={<><Menu /><MainPage /></>} />
        <Route path="/LastReleases" element={<><BlackMenu /><NewReleases /></>} />
        <Route path="/Men" element={<><BlackMenu /><Men /></>} />
        <Route path="/Women" element={<><BlackMenu /><Woman /></>} />
        <Route path="/Kids" element={<><BlackMenu /><Kids /></>} />
        <Route path="/ShopAll" element={<><BlackMenu /><ShopAll /></>} />
        <Route path="/signup" element={<><BlackMenu /><SignUp /></>} />
        <Route path="/signin" element={<><BlackMenu /><SignIn /></>} />
        <Route path="/password-recover" element={<><BlackMenu /><PasswordRecover /></>} />
        <Route
          path="/control-panel"
          element={
            localStorage.getItem('isAdmin') === 'true' ? (
              <>
                <BlackMenu />
                <ControlPanel />
              </>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/technical-support" element={<><BlackMenu /><TechnicalSupport /></>} />
        <Route path="/orders" element={<><BlackMenu /><Orders /></>} />
      </Routes>
    </div>
  );
}

export default App;